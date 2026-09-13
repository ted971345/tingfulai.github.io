賴鼎富博士個人學術網站原始碼
此儲存庫包含賴鼎富博士 (Dr. Ting-Fu Lai) 個人學術網站的原始碼，包含繁體中文 (根目錄) 與英文 (/en/) 兩個版本。

➡️ [公開網站](https://ted971345.github.io/tingfulai.github.io/)

專案描述
本網站為一個響應式、雙語系的靜態網頁，旨在展示賴鼎富博士的學術背景、研究方向與發表著作。

技術堆疊
語言: HTML5, CSS3, JavaScript (ES6)

框架/函式庫:

assets/site.css - 共用響應式設計、色彩與排版（無需建置）

assets/site.js - 共用搜尋、分類、分批載入、年度統計與導覽互動（無外部 JavaScript 依賴）

專案管理

資料結構
論文與媒體報導資料已從 HTML 中抽離，統一存放於 data/ 資料夾，中英文版網頁會在載入時各自從同一份檔案讀取資料並顯示對應語言欄位：

data/publications.json - 學術著作列表

data/news.json - 媒體報導 / 研究亮點列表（目前僅英文版網頁未顯示此區塊）

CV、頁面文字與版面配置仍直接寫在 index.html (中文) 與 en/index.html (英文) 中，這類內容才需要個別修改兩個檔案。

新增一筆論文
編輯 data/publications.json，在陣列最前面（或任意位置）新增一個物件，欄位如下：

id：唯一數字編號，建議遞增（可參考現有最大值 +1）

year：發表年份（數字）

isMetric：true 表示 SCI/SSCI（會計入頁面上的長條圖統計），false 表示 TSSCI 或其他期刊（只會顯示在列表中，不計入圖表）

category：health-promo（高齡健康促進）、data-science（資料科學應用）或 interdisciplinary（跨域整合）三選一，對應頁面上的篩選按鈕

doi、url：至少擇一填寫，頁面會優先使用 url，其次用 doi 組成連結，兩者皆空則 fallback 到 Google Scholar 搜尋

title_zh / title_en、journal_zh / journal_en、authors_zh / authors_en：中英文標題、期刊名稱、作者。若論文本身以英文發表，中英文欄位可以填一樣的英文內容

abstract_zh / abstract_en：中英文摘要（一兩句話即可）

存檔後，中英文網頁會自動同步顯示這筆新論文，不需要再手動修改兩份 HTML。

新增一筆媒體報導
編輯 data/news.json，新增物件並填入 id、title（標題）、source（媒體來源）、date（年份）、tag（標籤，如「媒體專訪」）、url（報導連結）即可。

送出更新
編輯完 JSON 檔案後，用 Git 提交並推送到 GitHub（例如透過 GitHub 網頁的 Commit changes，或請 Claude 直接幫忙 commit + push）。GitHub Pages 會從 main 分支自動部署；請至儲存庫 Actions 確認部署成功。

更新個人照片
個人照片由兩個語言版本的網頁共用，統一存放於 assets/ 資料夾。

準備檔案：將新的個人照片命名為 profile-photo.jpg。

導航路徑：在儲存庫主頁，點擊進入 assets 資料夾。

上傳檔案：點擊 Add file → Upload files，上傳你準備好的 profile-photo.jpg 以覆蓋舊檔。

提交變更：點擊 Commit changes。網站將在部署後自動顯示新照片。

備註: 若個人照片載入失敗，頁面會隱藏破圖並保留人物圖說。


## 2026-09-13 UI 改版與版本控制

採用暖白、墨綠、陶土色與刊物式編排；中英文共用 CSS 與 JavaScript。
論文預設顯示 6 篇，可搜尋標題、作者、期刊或年份，與主題分類交叉篩選。
資料來源維持 `data/publications.json`，修改 JSON 後無需建置即可更新。
Google Fonts 僅供字型使用，載入失敗時會使用系統字型。

### 本機預覽與檢查

```sh
python3 scripts/check_site.py
python3 -m http.server 8000 --bind 127.0.0.1
```

開啟 http://127.0.0.1:8000/ 與 http://127.0.0.1:8000/en/。
請檢查手機選單、研究方法方向鍵、論文搜尋／篩選／載入更多。

### 日後更新

```sh
git switch -c codex/describe-your-change
# 修改頁面、共用 CSS/JS 或 data/*.json
python3 scripts/check_site.py
git add <修改的檔案>
git commit -m "Describe the change"
git push -u origin codex/describe-your-change
```

透過 Pull Request 合併到 `main` 後自動發布。簡單更新也可直接提交到 `main`。

### 比較與回復

- 改版前標籤：`ui-before-2026-09-13`
- 新版標籤：`ui-2026-09-13`
- 版本紀錄：`git log --oneline --decorate`
- 比較本次改版：`git diff ui-before-2026-09-13 ui-2026-09-13`

如需撤回本次 UI 改版，使用 `git revert ui-2026-09-13` 建立反向提交，再執行 `git push origin main`。
這樣會保留歷史，而不會刪除版本紀錄。未來若有修改相同檔案，回復時可能需要處理衝突。
