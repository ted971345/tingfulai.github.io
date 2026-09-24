'use strict';
const english = document.documentElement.lang === 'en';
const text = (zh, en) => english ? en : zh;
// One reading preference is shared by the Chinese and English pages.
const readingSize = document.querySelector('#reading-size');
const readingSizes = ['standard', 'large', 'extra-large'];
const readingStorageKey = 'tingfulai-reading-size';
function applyReadingSize(value) {
 const size = readingSizes.includes(value) ? value : 'standard';
 document.documentElement.dataset.readingSize = size;
 readingSize.value = size;
}
try { applyReadingSize(localStorage.getItem(readingStorageKey)); }
catch { applyReadingSize('standard'); }
readingSize.closest('.reading-controls').hidden = false;
readingSize.addEventListener('change', () => {
 applyReadingSize(readingSize.value);
 try { localStorage.setItem(readingStorageKey, readingSize.value); }
 catch { /* Reading controls still work when browser storage is unavailable. */ }
});
window.addEventListener('storage', event => {
 if (event.key === readingStorageKey || event.key === null) applyReadingSize(event.newValue);
});
const assetRoot = new URL('.', document.currentScript.src);
const assetVersion = new URL(document.currentScript.src).search;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const safeLink = value => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : '#'; } catch { return '#'; } };
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; mobileMenu.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); });

// Stay in this document when navigating sections, including on mobile Safari.
// Keep real fragment links as the fallback when JavaScript is unavailable.
function fragmentTarget(hash) {
 try { return hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null; }
 catch { return null; }
}
function scrollToSection(target, focus = false) {
 closeMenu();
 target.scrollIntoView({behavior: 'instant', block: 'start'});
 if (focus) {
  if (!target.hasAttribute('tabindex')) {
   target.setAttribute('tabindex', '-1');
   target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once: true});
  }
  target.focus({preventScroll: true});
 }
}
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
 if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
 const target = fragmentTarget(link.hash);
 if (!target) return;
 event.preventDefault();
 // Updating history does not navigate or reload the document.
 if (location.hash !== link.hash) history.pushState(null, '', link.hash);
 scrollToSection(target, true);
}));

// A shared section link must settle after publications, images, and fonts load.
// Never move the reader back if they have already interacted with the page.
const initialHash = location.hash;
let initialNavigationCancelled = false;
['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach(type =>
 window.addEventListener(type, () => { initialNavigationCancelled = true; }, {once: true, passive: true})
);
const pageLoaded = document.readyState === 'complete' ? Promise.resolve() : new Promise(resolve => window.addEventListener('load', resolve, {once: true}));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuButton.focus(); } });
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function selectMethod(index, focus = false) {
 const tab = tabs[index], data = competencyData[tab.id], panel = document.querySelector('#competency-details');
 tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
 panel.setAttribute('aria-labelledby', tab.id);
 panel.innerHTML = `<span class="method-number" aria-hidden="true">0${index + 1}</span><h3>${escapeHTML(data.title)}</h3><p>${escapeHTML(data.content)}</p>`;
 if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
 tab.addEventListener('click', () => selectMethod(index));
 tab.addEventListener('keydown', event => { let next; if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length; else if (['ArrowUp','ArrowLeft'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = tabs.length - 1; else return; event.preventDefault(); selectMethod(next, true); });
});
selectMethod(0);
const portrait = document.querySelector('.portrait img');
portrait.addEventListener('error', () => { portrait.hidden = true; });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) document.querySelectorAll('.desktop-nav a').forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); }), {rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('main section').forEach(section => observer.observe(section));
async function readData(name) { const response = await fetch(new URL('../data/' + name + '.json' + assetVersion, assetRoot)); if (!response.ok) throw new Error(`Unable to load ${name}: ${response.status}`); return response.json(); }
async function loadPublications() {
 const grid = document.querySelector('#publications-grid'), count = document.querySelector('#result-count');
 try {
 const data = (await readData('publications')).sort((a,b) => b.year - a.year || b.id - a.id);
 const language = english ? 'en' : 'zh'; let filter = 'all', query = '', limit = 6;
 const more = document.querySelector('#show-more');
 function render() {
  const filtered = data.filter(p => (filter === 'all' || p.category === filter) && [p['title_' + language],p['authors_' + language],p['journal_' + language],p.year].join(' ').toLocaleLowerCase().includes(query));
  count.textContent = text(`共 ${filtered.length} 篇 · 顯示 ${Math.min(limit, filtered.length)} 篇`, `${filtered.length} publications · Showing ${Math.min(limit, filtered.length)}`);
  grid.innerHTML = filtered.slice(0,limit).map(p => {
   const title = p['title_' + language];
   const url = safeLink(p.url?.trim() || (p.doi?.trim() ? 'https://doi.org/' + p.doi.trim() : 'https://scholar.google.com/scholar?q=' + encodeURIComponent(title)));
   return `<article class="publication"><span class="publication-year">${escapeHTML(p.year)}</span><div><h3><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(title)}</a></h3><p class="journal">${escapeHTML(p['journal_' + language])}</p><p class="authors">${escapeHTML(p['authors_' + language])}</p>${p['abstract_' + language] ? `<details><summary>${text('閱讀摘要','Read abstract')}</summary><p>${escapeHTML(p['abstract_' + language])}</p></details>` : ''}</div><a class="publication-arrow" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(text('開啟論文：','Open publication: ') + title)}">↗</a></article>`;
  }).join('') || `<p class="error-message">${text('找不到符合的論文，請調整關鍵字或分類。','No publications found. Try another keyword or research area.')}</p>`;
  more.hidden = filtered.length <= limit;
 }
 document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; limit = 6; document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); render(); }));
 document.querySelector('#publication-search').addEventListener('input', event => { query = event.target.value.trim().toLocaleLowerCase(); limit = 6; render(); });
 more.addEventListener('click', () => { const oldCount = grid.children.length; limit += 6; render(); const next = grid.children[oldCount]?.querySelector('h3 a'); next?.focus({preventScroll:true}); });
 const years = {}; data.filter(p => p.isMetric).forEach(p => years[p.year] = (years[p.year] || 0) + 1);
 const max = Math.max(1,...Object.values(years));
 document.querySelector('#publication-chart').innerHTML = '<div class="chart-bars">' + Object.entries(years).sort((a,b) => Number(a[0])-Number(b[0])).map(([year,value]) => `<div class="chart-bar" aria-label="${year}: ${value}">${value}<i aria-hidden="true" style="--height:${100*value/max}px"></i>${year}</div>`).join('') + '</div>';
 render();
 } catch (error) { count.textContent = ''; grid.innerHTML = `<p class="error-message">${text('暫時無法載入論文，請重新整理，或至','Publications could not be loaded. Please reload, or visit')} <a class="text-link" href="https://scholar.google.com/citations?user=TYqilcsAAAAJ">Google Scholar ↗</a></p>`; console.error(error); }
}
async function loadNews() {
 const grid = document.querySelector('#news-grid'); if (!grid) return;
 try { const news = (await readData('news')).sort((a, b) => Number(b.date) - Number(a.date) || b.id - a.id); grid.innerHTML = news.map(item => `<article class="news-card"><div class="news-meta"><span>${escapeHTML(item.tag)}</span><span>${escapeHTML(item.date)}</span></div><h3><a href="${escapeHTML(safeLink(item.url))}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title)} ↗</a></h3><p>${escapeHTML(item.source)}</p></article>`).join(''); }
 catch (error) { grid.textContent = '暫時無法載入媒體報導，請稍後重新整理。'; console.error(error); }
}
Promise.all([loadPublications(), loadNews(), pageLoaded, document.fonts.ready]).then(() => {
 if (!initialHash || initialNavigationCancelled || location.hash !== initialHash) return;
 const target = fragmentTarget(initialHash);
 if (target) scrollToSection(target);
});
