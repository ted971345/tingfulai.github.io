賴鼎富博士個人學術網站原始碼
此儲存庫包含賴鼎富博士 (Dr. Ting-Fu Lai) 個人學術網站的原始碼，包含繁體中文 (根目錄) 與英文 (/en/) 兩個版本。

➡️ 點此訪問公開網站

專案描述
本網站為一個響應式、雙語系的靜態網頁，旨在展示賴鼎富博士的學術背景、研究方向與發表著作。

技術堆疊
語言: HTML5, CSS3, JavaScript (ES6)

框架/函式庫:

Tailwind CSS - 用於樣式設計

Chart.js - 用於數據可視化圖表

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
編輯完 JSON 檔案後，用 Git 提交並推送到 GitHub（例如透過 GitHub 網頁的 Commit changes，或請 Claude 直接幫忙 commit + push）。網站會在幾分鐘內自動部署並更新。

更新個人照片
個人照片由兩個語言版本的網頁共用，統一存放於 assets/ 資料夾。

準備檔案：將新的個人照片命名為 profile-photo.jpg。

導航路徑：在儲存庫主頁，點擊進入 assets 資料夾。

上傳檔案：點擊 Add file → Upload files，上傳你準備好的 profile-photo.jpg 以覆蓋舊檔。

提交變更：點擊 Commit changes。網站將在部署後自動顯示新照片。

備註: 程式碼已包含備用方案。若 profile-photo.jpg 檔案不存在或路徑錯誤，網站會自動顯示一個預設的頭像圖示，以維持版面專業性。
