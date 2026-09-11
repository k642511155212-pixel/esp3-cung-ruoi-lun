# ESP3 Mastery — International Business

Website học và luyện thi ESP3 bao phủ toàn bộ 10 unit trong giáo trình:

1. Introduction to International Business
2. International Trade
3. International Trade Policy
4. Foreign Direct Investment
5. Foreign Exchange
6. Payment in International Trade
7. Marketing
8. Logistics and Transportation
9. Insurance
10. Taxation

## Nội dung

- 211 flashcards thuật ngữ và định nghĩa tiếng Anh, kèm nghĩa tiếng Việt.
- 44 phần lý thuyết được giảng bằng tiếng Anh; key terms và từ chuyên ngành có bản dịch tiếng Việt trong ngoặc.
- 50 câu hỏi ngắn với model answers không quá 40 từ.
- 20 đề essay kèm suggested thesis và outline.
- Bộ mascot ruồi với nhiều biểu cảm xuất hiện ở dashboard, tiêu đề, unit cards, flashcards, đáp án và kết quả kiểm tra.
- Midterm Simulation 60 phút:
  - Part 1: 10 terminology questions — 3 points.
  - Part 2: 3 open-ended questions, maximum 40 words each — 3 points.
  - Part 3: choose 1 of 2 essays, minimum 300 words — 4 points.
- Midterm mặc định sử dụng Unit 1, 2, 3, 4 và 9; Full-book mode sử dụng cả 10 unit.
- Tiến độ, trạng thái flashcards và bài thi đang làm được lưu trong trình duyệt.

## Chạy trên máy

Mở `index.html` bằng trình duyệt. Website không cần cài đặt package, framework hay backend.

## Đưa lên GitHub Pages

1. Tạo một repository mới trên GitHub.
2. Upload toàn bộ nội dung của thư mục này vào repository root.
3. Mở **Settings → Pages**.
4. Chọn **Build and deployment → GitHub Actions**.
5. Workflow có sẵn sẽ tự động publish sau mỗi lần push vào nhánh `main`.

Bạn cũng có thể chọn **Deploy from a branch → main → /(root)** vì đây là website tĩnh.

## Cấu trúc file

- `index.html` — khung giao diện và metadata.
- `styles.css` — toàn bộ giao diện responsive.
- `data.js` — nội dung 10 unit, flashcards, short answers và essays.
- `app.js` — điều hướng, flashcards, bộ đếm từ, tìm kiếm, tiến độ và test simulation.
- `assets/` — bộ ảnh mascot ruồi đã tối ưu cho web.
- `.github/workflows/deploy-pages.yml` — triển khai GitHub Pages.

## Lưu ý dữ liệu

Website dùng `localStorage`. Nếu người học xóa dữ liệu trình duyệt hoặc đổi thiết bị, tiến độ cũ sẽ không tự động đồng bộ.
