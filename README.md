---

**[➡️ 點此訪問公開網站]([https://tingfulai.github.io](https://ted971345.github.io/tingfulai.github.io/)**

---

## 專案描述

本網站為一個單頁式靜態網頁 (`index.html`)，旨在展示賴鼎富博士的學術背景、研究方向與發表著作。

## 技術堆疊

* **語言**: HTML5, CSS3, JavaScript (ES6)
* **框架/函式庫**:
    * [Tailwind CSS](https://tailwindcss.com/) - 用於樣式設計
    * [Chart.js](https://www.chartjs.org/) - 用於數據可視化圖表

## 如何更新網站內容

本網站的所有內容皆包含在 `index.html` 檔案中。若要更新網站，請遵循以下步驟：

1.  在本儲存庫中，點擊 `index.html` 檔案。
2.  點擊右上角的鉛筆圖示 ✏️ 進入編輯模式。
3.  完成修改後，捲動至頁面底部並點擊 `Commit changes`。
4.  變更將在幾分鐘內自動部署並更新至公開網站。

### 上傳與替換個人照片

1. 準備一張裁切為正方形、建議大小為 800×800px 的 JPG 或 PNG 檔案，並命名為 `profile-photo.jpg`。
2. 在 GitHub 倉庫頁面中，點擊 `assets` 資料夾 → `Add file` → `Upload files`，將 `profile-photo.jpg` 上傳至該資料夾後提交變更。
3. 頁面中的個人照片 `<img>` 已預設指向 `assets/profile-photo.jpg`，如果檔案尚未上傳，瀏覽器會自動退回顯示 `profile-photo-placeholder.svg`。上傳正式照片後無需再更改程式碼，中文與英文頁面都會同步更新。
4. 若要更換檔名，請同時更新 `index.html` 與 `en/index.html` 中 `<img>` 的 `src` 屬性，以確保兩個語言版本都載入相同檔案。
