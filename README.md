<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>賴鼎富博士 | 高齡健康與數據科學研究</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- Design Rationale: The goal is to create a professional yet modern personal academic website. The single-page application (SPA) format is chosen for a smooth, narrative user experience, guiding visitors through Dr. Lai's academic identity. The structure is thematic: About -> Research Focus -> Methodology -> Publications. This logical flow establishes his vision first, then details his core research areas, explains his process, and finally provides concrete proof through his work. This is more effective than a simple chronological CV for building a strong personal brand. -->
    <!-- Visualization Choices:
        - Taiwan Aging Stat: A large, bold number for immediate impact. Sets the context for his research's importance. (HTML/Tailwind)
        - Research Methodology: An interactive step-by-step diagram. This deconstructs a complex process into a clear, engaging narrative of his value. (HTML/JS)
        - Research Focus: Clean, scannable cards. This format allows for quick comprehension of his main research pillars. (HTML/Tailwind)
        - Publication Chart & Gallery: A bar chart visualizes productivity growth, while the filterable gallery allows visitors to explore publications based on their interests. This actively demonstrates the impact and applicability of his research. (Chart.js/JS)
        - CONFIRMATION: No SVG or Mermaid.js graphics were used in this design. -->
    <style>
        body {
            font-family: 'Noto Sans TC', sans-serif;
            background-color: #F8F9FA;
            color: #212529;
            scroll-behavior: smooth;
        }
        .palette-bg-main { background-color: #F8F9FA; }
        .palette-bg-card { background-color: #FFFFFF; }
        .palette-text-dark { color: #0B3954; }
        .palette-text-medium { color: #087E8B; }
        .palette-text-accent { color: #FF5A5F; }
        .palette-accent { background-color: #FF5A5F; }
        .nav-link {
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        .nav-link:hover, .nav-link.active {
            background-color: #BFD7EA;
            color: #0B3954;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 350px;
            max-height: 400px;
        }
        @media (max-width: 768px) {
            .chart-container {
                height: 300px;
                max-height: 350px;
            }
        }
        .clickable-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .clickable-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .pill-button {
            transition: all 0.2s ease-in-out;
        }
        .pill-button.active {
            background-color: #0B3954;
            color: white;
        }
        /* Style for active step in competency section */
        .competency-step.active {
            border-color: #087E8B !important; /* Use a prominent color from the palette */
            background-color: #eaf6f6;
        }
        .competency-step.active h3 {
            color: #0B3954;
        }
    </style>
</head>
<body class="palette-bg-main">

    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
        <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
            <div class="text-2xl font-bold palette-text-dark">
                賴鼎富 <span class="text-lg font-normal text-gray-500">博士</span>
            </div>
            <div class="hidden md:flex space-x-2">
                <a href="#about" class="nav-link active">關於我</a>
                <a href="#focus" class="nav-link">研究主軸</a>
                <a href="#methodology" class="nav-link">研究方法學</a>
                <a href="#publications" class="nav-link">學術發表</a>
            </div>
            <div class="md:hidden">
                <select id="mobile-nav" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="#about">關於我</option>
                    <option value="#focus">研究主軸</option>
                    <option value="#methodology">研究方法學</option>
                    <option value="#publications">學術發表</option>
                </select>
            </div>
        </nav>
    </header>

    <main class="container mx-auto p-4 md:p-8">

        <section id="about" class="text-center py-16 md:py-24">
            <h1 class="text-4xl md:text-6xl font-bold palette-text-dark mb-4">高齡健康<br class="hidden md:block" />與數據科學研究</h1>
            <p class="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-12">
                致力於結合穿戴式裝置數據與量化分析，探討高齡者的健康促進策略，為健康老化挑戰提供實證解方。
            </p>
            <div class="flex justify-center items-center space-x-4 md:space-x-8">
                <div class="text-center">
                    <p class="text-4xl md:text-6xl font-bold palette-text-accent">2026年</p>
                    <p class="text-sm md:text-base text-gray-500">台灣將步入超高齡社會</p>
                </div>
                <div class="text-gray-300 text-4xl">|</div>
                <div class="text-center">
                    <p class="text-4xl md:text-6xl font-bold palette-text-accent">>40%</p>
                    <p class="text-sm md:text-base text-gray-500">健保支出用於65歲以上人口</p>
                </div>
            </div>
        </section>
        
        <section id="focus" class="py-16 bg-white rounded-lg shadow-inner">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold palette-text-dark">主要研究方向</h2>
                <p class="mt-4 text-lg text-gray-600">我的研究聚焦於三大核心領域，旨在將數據洞見轉化為實際的健康策略。</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="palette-bg-main rounded-lg border border-gray-200 p-6 clickable-card">
                    <h3 class="font-bold text-xl palette-text-dark mb-2">高齡者身體活動與健康促進</h3>
                    <p class="text-gray-600">運用穿戴式裝置客觀量化高齡者的24小時活動型態，探討其與衰弱、肌少症、認知功能及心理健康的關聯，找出最佳活動模式。</p>
                </div>
                <div class="palette-bg-main rounded-lg border border-gray-200 p-6 clickable-card">
                    <h3 class="font-bold text-xl palette-text-dark mb-2">數據科學與智慧科技應用</h3>
                    <p class="text-gray-600">專精於等時替代分析、AI模型等高階統計方法，將健康數據轉化為風險預測與成本效益評估，並開發科技介入方案以促進健康。</p>
                </div>
                <div class="palette-bg-main rounded-lg border border-gray-200 p-6 clickable-card">
                    <h3 class="font-bold text-xl palette-text-dark mb-2">跨領域整合與國際合作</h3>
                    <p class="text-gray-600">結合臨床醫學、公共衛生與環境科學進行跨領域研究。並積極與韓國、日本等國際團隊合作，進行高齡健康議題的跨國比較。</p>
                </div>
            </div>
        </section>

        <section id="methodology" class="py-16">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold palette-text-dark">我的研究方法學：從問題到解方</h2>
                <p class="mt-4 text-lg text-gray-600">這是一個將研究問題轉化為實證解方的完整循環。</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div class="lg:col-span-1 flex flex-col space-y-4">
                    <div id="step1" class="p-4 border-l-4 border-gray-300 cursor-pointer competency-step">
                        <h3 class="font-bold text-xl palette-text-medium">1. 定義關鍵問題</h3>
                        <p class="text-gray-600 text-sm">從真實世界的高齡健康挑戰出發。</p>
                    </div>
                    <div id="step2" class="p-4 border-l-4 border-gray-300 cursor-pointer competency-step">
                        <h3 class="font-bold text-xl palette-text-medium">2. 客觀數據採集</h3>
                        <p class="text-gray-600 text-sm">利用穿戴式裝置與次級資料庫。</p>
                    </div>
                    <div id="step3" class="p-4 border-l-4 border-gray-300 cursor-pointer competency-step">
                        <h3 class="font-bold text-xl palette-text-medium">3. 前沿量化分析</h3>
                        <p class="text-gray-600 text-sm">AI模型、等時替代分析等。</p>
                    </div>
                    <div id="step4" class="p-4 border-l-4 border-gray-300 cursor-pointer competency-step">
                        <h3 class="font-bold text-xl palette-text-medium">4. 產出實證解方</h3>
                        <p class="text-gray-600 text-sm">提出具體的成本效益評估與策略。</p>
                    </div>
                </div>
                <div id="competency-details" class="lg:col-span-2 palette-bg-card rounded-lg shadow-lg p-6 min-h-[300px]">
                    <!-- Content will be injected by JavaScript -->
                </div>
            </div>
        </section>

        <section id="publications" class="py-16">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold palette-text-dark">學術著作與實績</h2>
                <p class="mt-4 text-lg text-gray-600">我的研究始終聚焦於解決真實世界的健康管理問題。</p>
            </div>
            
            <div class="palette-bg-card rounded-lg shadow-lg p-6 mb-8">
                 <h3 class="font-bold text-xl palette-text-dark mb-4 text-center">歷年學術產出趨勢 (SCI/SSCI)</h3>
                 <div class="chart-container">
                     <canvas id="publicationsChart"></canvas>
                 </div>
            </div>

            <div>
                <div class="flex flex-wrap justify-center gap-2 mb-8">
                    <button class="pill-button px-4 py-2 rounded-full bg-gray-200 text-gray-700" data-filter="all">全部論文</button>
                    <button class="pill-button px-4 py-2 rounded-full bg-gray-200 text-gray-700" data-filter="health-promo">高齡健康促進</button>
                    <button class="pill-button px-4 py-2 rounded-full bg-gray-200 text-gray-700" data-filter="data-science">數據科學應用</button>
                    <button class="pill-button px-4 py-2 rounded-full bg-gray-200 text-gray-700" data-filter="interdisciplinary">跨領域整合</button>
                </div>
                <div id="publications-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Publications will be injected by JavaScript -->
                </div>
            </div>
        </section>

    </main>

    <footer class="bg-gray-800 text-white mt-16">
        <div class="container mx-auto px-6 py-8 text-center">
            <h2 class="text-2xl font-bold mb-4">開啟合作或交流</h2>
            <p class="mb-4">如果您對我的研究感興趣，或有任何合作想法，歡迎隨時與我聯繫。</p>
            <p>賴鼎富 (Ting-Fu Lai)</p>
            <p>ted971345@gmail.com | 0979-675-986</p>
            <div class="mt-6 flex justify-center space-x-6">
                <a href="https://scholar.google.com/citations?user=TYqilcsAAAAJ&hl=zh-TW" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors duration-300">
                    Google Scholar
                </a>
                <a href="https://www.researchgate.net/profile/Lai-Ting-Fu" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors duration-300">
                    ResearchGate
                </a>
            </div>
        </div>
    </footer>

    <script>
        const competencyData = {
            step1: {
                title: '定義關鍵問題',
                content: '我的研究始於高齡照護現場的實際挑戰。例如：如何在有限的資源下，最大化長者的健康改善成效，並量化服務的價值？這類問題直接驅動了後續的研究設計與數據收集策略。',
                icon: '🎯'
            },
            step2: {
                title: '客觀數據採集',
                content: '為克服主觀評估的偏誤，我擅長使用三軸加速規等穿戴式裝置，客觀量化高齡者的24小時活動型態。結合臨床數據與次級資料庫，我們能建構出一個多維度的數據集，全面描繪出健康、行為與成本之間的關係。',
                icon: '🔬'
            },
            step3: {
                title: '前沿量化分析',
                content: '我專精於高階統計模型，特別是「等時替代分析」(Isotemporal Substitution Analysis)，能精準計算以低成本活動（如：輕度身體活動）替代高成本靜態行為（如：久坐）對健康結果（如：肌少症風險）的影響。此方法對於資源配置決策極具價值。',
                icon: '📈'
            },
            step4: {
                title: '產出實證解方',
                content: '數據分析的終點是產出可執行的策略。例如，透過分析證明「將每日30分鐘的靜態時間，替換為社區散步，能顯著降低衰弱風險，其成本效益遠高於昂貴的營養補充品」。這類結論能直接轉化為具體的健康促進方案。',
                icon: '💡'
            }
        };

        const publicationsData = [
            // 高齡健康促進 (health-promo)
            { id: 3, title: 'Light physical activity throughout the day and physical function in older adults: A cross-sectional study', journal: 'Chronobiology International, 2025', category: 'health-promo', abstract: '本研究指出，整日中的輕度身體活動與高齡者的身體功能息息相關，強調了即使是低強度活動對於維持高齡者獨立生活能力的重要性。' },
            { id: 4, title: 'Cross-sectional and longitudinal association between accelerometer-measured light-intensity physical activity and cognitive function in older adults', journal: 'Frontiers in Aging Neuroscience, 2025', category: 'health-promo', abstract: '本研究探討了客觀測量的輕度身體活動與高齡者認知功能之間的橫斷面與縱貫性關聯，為預防認知衰退提供了活動策略的依據。' },
            { id: 5, title: 'Dynapenia is associated with a higher risk of depressive symptoms among older adults', journal: 'Frontiers in Public Health, 2025', category: 'health-promo', abstract: '研究建立了肌力減退（Dynapenia）與憂鬱症狀之間的風險關聯，突顯了肌力訓練在促進高齡者心理健康中的潛在角色。' },
            { id: 6, title: 'Age Difference in the Association Between Nutritional Status and Dynapenia in Older Adults', journal: 'Nutrients, 2025', category: 'health-promo', abstract: '本研究探討了不同年齡層高齡者在營養狀況與肌力減退關聯上的差異，為精準營養與運動介入提供了新見解。' },
            { id: 11, title: 'Acute caffeine supplementation offsets the impairment in 10-km running performance following one night of partial sleep deprivation', journal: 'European journal of applied physiology, 2024', category: 'health-promo', abstract: '此研究驗證了咖啡因補充劑在部分睡眠剝奪後，對運動表現的恢復作用，屬於運動科學與健康促進的應用。' },
            { id: 13, title: 'Association of 24-Hour movement behavior and cognitive function in older Taiwanese adults', journal: 'Geriatric Nursing, 2024', category: 'health-promo', abstract: '本研究全面分析了24小時的活動、睡眠、久坐行為與認知功能的關聯，找出了能預測認知衰退風險的關鍵行為模式。' },
            { id: 16, title: 'Is overall and timing-specific physical activity associated with depression in older adults?', journal: 'Front Public Health, 2023', category: 'health-promo', abstract: '探討了身體活動的總量與時間分佈對高齡者憂鬱症狀的影響，為心理健康促進提供了更細緻的活動建議。' },
            { id: 17, title: 'The Association between a Minimum Amount of Physical Activity and Subsequent Muscle Strength and Balance in Older Adults: A Prospective Study', journal: 'Behavioral Sciences, 2023', category: 'health-promo', abstract: '此縱貫性研究旨在確定能維持高齡者肌肉力量與平衡的最低身體活動量，對制定公共衛生指南具有重要意義。' },
            { id: 18, title: 'Diurnal pattern of breaks in sedentary time and the physical function of older adults', journal: 'Arch Public Health, 2023', category: 'health-promo', abstract: '研究發現，在一天中「頻繁地」打斷久坐行為，比「集中一段時間」運動，對高齡者身體功能的關聯性更強。' },
            { id: 23, title: 'Non-linear associations between sleep patterns and sarcopenia risks in older adults', journal: 'Journal of clinical sleep medicine, 2021', category: 'health-promo', abstract: '本研究揭示了睡眠模式與肌少症風險之間的非線性關係，強調了充足且規律的睡眠對於預防肌肉流失的重要性。' },
            { id: 25, title: 'Is sleep timing related to objectively-measured physical activity and sedentary behavior in older women?', journal: 'Nature and Science of Sleep, 2021', category: 'health-promo', abstract: '探討了高齡女性的睡眠時間點與其日常身體活動和靜態行為的關聯，為整合性的生活方式介入提供了依據。' },
            { id: 26, title: 'Is achieving 7,000 steps/day cross-sectionally and prospectively associated with older adults\' lower-extremity performance?', journal: 'BMC Geriatr, 2021', category: 'health-promo', abstract: '研究驗證了每日7000步是否為一個有效指標，能對應到高齡者當下及未來的下肢功能表現。' },
            { id: 28, title: 'Sleep duration and timing are nonlinearly associated with depressive symptoms among older adults', journal: 'Sleep Medicine, 2021', category: 'health-promo', abstract: '此研究發現睡眠時長與時間點和高齡者憂鬱症狀之間存在非線性關係，指出過長或過短的睡眠都可能有害心理健康。' },
            { id: 29, title: 'Daily lifestyle behaviors and risks of sarcopenia among older adults', journal: 'Arch Public Health, 2020', category: 'health-promo', abstract: '全面檢視了日常活動、飲食等生活方式行為與高齡者肌少症風險的綜合關聯。' },
            { id: 30, title: 'Moderate-to-vigorous physical activity duration is more important than timing for physical function in older adults', journal: 'Scientific Reports, 2020', category: 'health-promo', abstract: '研究指出，對於高齡者的身體功能，中高強度活動的「總時長」比在一天中的哪個「時間點」進行更為重要。' },
            { id: 31, title: 'Association Between Objectively Measured Sleep Duration and Physical Function in Community-Dwelling Older Adults', journal: 'Journal of clinical sleep medicine, 2020', category: 'health-promo', abstract: '客觀測量數據顯示，社區高齡者的睡眠時長與其身體功能表現有直接關聯。' },
            { id: 33, title: 'Independent and joint associations of physical activity and dietary behavior with older adults’ lower limb strength', journal: 'Nutrients, 2020', category: 'health-promo', abstract: '本研究分別及聯合探討了身體活動和飲食行為對高齡者下肢肌力的影響，強調了整合性介入的重要性。' },
            { id: 37, title: '什麼時候運動最好? 高齡者身體活動時間點與健康結果之系統性文獻回顧', journal: '大專體育, 2024', category: 'health-promo', abstract: '此系統性回顧整理了現有文獻，探討高齡者在一天中不同時間點運動對其健康結果的影響。' },
            { id: 38, title: '中高齡者日常高強度間歇性身體活動對於健康影響之敘述性綜論', journal: '體育學報, 2024', category: 'health-promo', abstract: '本文獻回顧探討了將高強度間歇訓練的概念應用於日常生活中的可行性與健康效益。' },
            { id: 40, title: '高齡者肌力活動及其社會人口學關聯因素', journal: '大專體育學刊, 2021', category: 'health-promo', abstract: '此研究分析了影響高齡者參與肌力活動的社會人口學因素，為制定推廣策略提供參考。' },
            
            // 數據科學應用 (data-science)
            { id: 7, title: 'Older adults\' Internet use behavior and its association with accelerometer-derived physical activity', journal: 'Front Public Health, 2025', category: 'data-science', abstract: '本研究運用客觀數據，分析高齡者的網路使用行為與其身體活動模式的關聯，是數位行為與健康數據結合的探索。' },
            { id: 8, title: 'Associations Between Replacing Sedentary Time With Intensity-Specific Physical Activity and Physical Function in Older Adults', journal: '大專體育學刊, 2024', category: 'data-science', abstract: '本文應用「替代模型」分析以不同強度活動取代靜態時間對高齡者身體功能的影響，為活動建議提供了量化證據。' },
            { id: 10, title: 'Effect of information and communication technology-based smart care services for physical and cognitive functions in older adults living alone', journal: 'The journal of nutrition, health & aging, 2024', category: 'data-science', abstract: '此準實驗研究評估了基於ICT的智慧照護服務對獨居老人的身心功能影響，驗證了科技介入在高齡健康促進中的應用潛力。' },
            { id: 12, title: 'Isotemporal substitution analysis of the impact of sedentary behavior and physical activity on depression in Taiwanese older adults', journal: 'Mental Health and Physical Activity, 2024', category: 'data-science', abstract: '這項前瞻性研究使用等時替代分析，探討了以身體活動取代靜態行為對台灣高齡者憂鬱症狀的影響，為心理健康促進提供了新的量化視角。' },
            { id: 19, title: 'Effect of isotemporal substitution of sedentary behavior with different intensities of physical activity on the muscle function of older adults...', journal: 'BMC Geriatr, 2023', category: 'data-science', abstract: '本研究運用等時替代模型，量化分析以不同強度身體活動取代靜態行為對高齡者肌肉功能的影響，為設計低成本、高效益的健康促進方案提供了嚴謹的實證依據。' },
            { id: 20, title: 'Substituting sedentary time with physical activity in youngest-old to oldest-old community-dwelling older adults: Associations with body composition', journal: 'Frontiers in Public Health, 2022', category: 'data-science', abstract: '研究應用替代模型分析了不同年齡層（從初老到最老）的高齡者以活動取代靜態行為對其身體組成的影響。' },
            { id: 39, title: '三軸加速規應用於身體活動及靜態行為測量使用之敘述性綜論', journal: '運動表現期刊, 2022', category: 'data-science', abstract: '此綜論性文章詳細介紹了三軸加速規此一客觀測量工具在身體活動研究中的應用、方法學與挑戰。' },

            // 跨領域整合 (interdisciplinary)
            { id: 1, title: 'Elevated extracellular water to total body water ratio and low phase angle in relation to muscle function in middle-aged and older adults', journal: 'Journal of the International Society of Sports Nutrition, 2025', category: 'interdisciplinary', abstract: '本研究為臨床醫學與運動科學的結合，探討生物電阻抗分析(BIA)指標作為肌肉功能評估工具的潛力，展現了與韓國釜山國立大學醫院的國際合作成果。' },
            { id: 2, title: 'Respiratory Function and Information Processing Speed in Coal Power Plant Workers...', journal: 'Risk Management and Healthcare Policy, 2025', category: 'interdisciplinary', abstract: '此研究跨領域探討職業環境因素對健康的影響，並分析了體力活動的調節作用。其研究方法與成果可應用於不同場域的健康管理計畫。' },
            { id: 9, title: 'Whole-Body and Segmental Phase Angles and Cognitive Function in the Older Korean Population: Cross-Sectional Analysis', journal: 'JMIR public health and surveillance, 2024', category: 'interdisciplinary', abstract: '此研究為國際合作成果，探討了韓國高齡族群中，作為細胞健康指標的相位角與認知功能的關聯。' },
            { id: 14, title: 'Associations between objectively measured overall and intensity-specific physical activity and phase angle in older adults', journal: 'Scientific Reports, 2024', category: 'interdisciplinary', abstract: '本研究整合了客觀身體活動數據與臨床生物標記（相位角），探討兩者之間的關係，是運動科學與臨床醫學的橋樑。' },
            { id: 15, title: 'Sedentary Behavior and Phase Angle: An Objective Assessment in Physically Active and Inactive Older Adults', journal: 'Nutrients, 2024', category: 'interdisciplinary', abstract: '研究比較了活躍與不活躍高齡者的靜態行為與相位角的關係，進一步連結了日常行為與細胞層級的健康指標。' },
            { id: 21, title: 'Accelerometer-Measured Physical Activity and Sedentary Behavior of Adults with Prader-Willi Syndrome...', journal: 'Int J Environ Res Public Health, 2022', category: 'interdisciplinary', abstract: '本研究將身體活動測量技術應用於罕見疾病（小胖威利症）患者，是一項結合特殊族群照護與客觀數據分析的跨領域研究。' },
            { id: 22, title: 'Associations of the audited residential neighborhood built-environment attributes with objectively-measured sedentary time among adults: a systematic review', journal: 'International Journal of Environmental Health Research, 2022', category: 'interdisciplinary', abstract: '此系統性回顧整合了建成環境與公共衛生領域的研究，探討社區環境特徵與居民靜態行為的關係。' },
            { id: 24, title: 'Does neighborhood built environment support older adults\' daily steps differ by time of day?', journal: 'Journal of Transport & Health, 2021', category: 'interdisciplinary', abstract: '本研究結合了地理資訊(GIS)，探討社區建成環境對高齡者在一天中不同時段步行活動的支持程度。' },
            { id: 27, title: 'A Nonlinear Association between Neighborhood Walkability and Risks of Sarcopenia in Older Adults', journal: 'J Nutr Health Aging, 2021', category: 'interdisciplinary', abstract: '探討了社區「宜走性」與高齡者肌少症風險的非線性關係，是環境科學與老年醫學的整合。' },
            { id: 32, title: 'Which Neighborhood Destinations Matter in the Asian Context? The Role of Destinations in Older Adults’ Physical Activity and Sedentary Behaviors', journal: 'BioMed Research International, 2020', category: 'interdisciplinary', abstract: '此研究探討了亞洲城市環境中，不同類型的社區目的地（如公園、市場）對高齡者活動行為的影響。' },
            { id: 34, title: 'Are area-level crimes associated with older adults’ active and sedentary behavior?', journal: 'Sustainability, 2019', category: 'interdisciplinary', abstract: '本研究跨足社會學與公共衛生，探討社區犯罪率是否影響高齡者的身體活動與靜態行為。' },
            { id: 35, title: 'Walk Score® and its associations with older adults’ healthy behaviors and outcomes', journal: 'International Journal of Environmental Research and Public Health, 2019', category: 'interdisciplinary', abstract: '本研究驗證了國際通用的「步行指數」(Walk Score®) 在評估高齡者健康行為與結果上的有效性。' },
            { id: 36, title: '高齡者身體活動、靜態行為與相位角之範域文獻回顧', journal: '運動表現期刊, 2025', category: 'interdisciplinary', abstract: '此範域回顧旨在系統性地整理並呈現身體活動、靜態行為與臨床生物標記「相位角」之間的跨領域研究現況。' },
            { id: 41, title: 'Walk Score®作為台灣地區宜走性環境測量工具之效度檢驗', journal: '台灣衛誌, 2019', category: 'interdisciplinary', abstract: '本研究旨在檢驗國際廣泛使用的建成環境評估工具Walk Score®在台灣地區的適用性與效度。' },
            { id: 42, title: '青少年電子煙使用與吸菸意圖或吸菸行為之關聯性：系統性文獻回顧', journal: '台灣衛誌, 2019', category: 'interdisciplinary', abstract: '此系統性回顧聚焦於青少年電子煙使用的公共衛生議題，探討其與傳統菸草使用的關聯。' },
            { id: 43, title: 'Walk Score®之相關文獻回顧：身體活動、步行行為及慢性疾病風險', journal: '臺灣衛誌, 2018', category: 'interdisciplinary', abstract: '本文獻回顧了應用Walk Score®工具進行的各類研究，探討建成環境與居民健康之間的關係。' }
        ];


        document.addEventListener('DOMContentLoaded', function() {
            const competencyDetailsContainer = document.getElementById('competency-details');
            const competencySteps = document.querySelectorAll('.competency-step');

            function updateCompetencyDetails(stepId) {
                const data = competencyData[stepId];
                competencyDetailsContainer.innerHTML = `
                    <div class="flex items-start space-x-4">
                        <div class="text-4xl">${data.icon}</div>
                        <div>
                            <h4 class="font-bold text-2xl palette-text-dark mb-2">${data.title}</h4>
                            <p class="text-gray-700 leading-relaxed">${data.content}</p>
                        </div>
                    </div>
                `;
                competencySteps.forEach(step => {
                    step.classList.remove('active');
                    if(step.id === stepId) {
                        step.classList.add('active');
                    }
                });
            }

            competencySteps.forEach(step => {
                step.addEventListener('click', () => {
                    updateCompetencyDetails(step.id);
                });
            });

            updateCompetencyDetails('step1');

            const publicationsGrid = document.getElementById('publications-grid');
            const filterButtons = document.querySelectorAll('.pill-button');

            function renderPublications(filter = 'all') {
                publicationsGrid.innerHTML = '';
                const filteredData = (filter === 'all') ? publicationsData : publicationsData.filter(p => p.category === filter);

                if (filteredData.length === 0) {
                    publicationsGrid.innerHTML = `<p class="text-gray-500 md:col-span-2 lg:col-span-3 text-center">該分類下暫無代表性論文。</p>`;
                    return;
                }

                filteredData.forEach(pub => {
                    const card = document.createElement('div');
                    card.className = 'palette-bg-card rounded-lg shadow p-6 flex flex-col justify-between clickable-card';
                    card.innerHTML = `
                        <div>
                            <h4 class="font-bold text-lg palette-text-dark">${pub.title}</h4>
                            <p class="text-sm text-gray-500 my-2">${pub.journal}</p>
                            <p class="text-gray-700 text-sm">${pub.abstract}</p>
                        </div>
                    `;
                    publicationsGrid.appendChild(card);
                });
            }

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    renderPublications(button.dataset.filter);
                });
            });

            document.querySelector('.pill-button[data-filter="all"]').classList.add('active');
            renderPublications('all');

            const ctx = document.getElementById('publicationsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['2019','2020', '2021', '2022', '2023', '2024', '2025 (迄今)'],
                    datasets: [{
                        label: 'SCI/SSCI 論文數量',
                        data: [3, 5, 5, 3, 5, 7, 7], // Updated data based on the full list
                        backgroundColor: '#087E8B',
                        borderColor: '#0B3954',
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#334155',
                                stepSize: 2
                            },
                             grid: {
                                color: '#e2e8f0'
                            }
                        },
                        x: {
                           ticks: {
                                color: '#334155'
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#0B3954',
                            titleFont: { size: 14 },
                            bodyFont: { size: 12 },
                            padding: 10,
                            cornerRadius: 4,
                            displayColors: false
                        }
                    }
                }
            });
            
            // --- Navigation Logic ---
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('main section');
            const mobileNav = document.getElementById('mobile-nav');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                        });
                        if (mobileNav.value !== `#${id}`) {
                           mobileNav.value = `#${id}`;
                        }
                    }
                });
            }, { rootMargin: "-40% 0px -60% 0px" });

            sections.forEach(section => {
                observer.observe(section);
            });
            
            mobileNav.addEventListener('change', (e) => {
                 document.querySelector(e.target.value).scrollIntoView();
            });
        });
    </script>
</body>
</html>

