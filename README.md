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

- 469 flashcards gồm core terms, từ trong readings/case studies và vocabulary exercises; có danh từ, động từ, tính từ, phrasal verbs và collocations, kèm định nghĩa tiếng Anh và nghĩa tiếng Việt.
- 44 phần lý thuyết được giảng bằng tiếng Anh; key terms và từ chuyên ngành có bản dịch tiếng Việt trong ngoặc.
- 310 câu gap filling theo exam style cho cả 10 unit: một chỗ trống, một đáp án chính xác và không có word bank. Unit 2, 3, 4 và 9 bám sát tài liệu ôn ESP231.
- 65 câu hỏi ngắn với model answers không quá 40 từ.
- 25 đề essay kèm suggested thesis và outline.
- Bộ mascot ruồi với nhiều biểu cảm xuất hiện ở dashboard, tiêu đề, unit cards, flashcards, đáp án và kết quả kiểm tra.
- Mục Donate riêng với ảnh QR được cung cấp và lời cảm ơn “Cảm ơn Phước Nguyên đã gợi ý”.
- Midterm Practice cho Unit 1, 2, 3, 4 và 9, không bắt buộc làm full test:
  - Chọn ôn riêng Gap filling, Q&A hoặc Essay & outline.
  - Chọn trộn toàn bộ năm unit hoặc chỉ một unit.
  - 201 câu gap filling, 40 câu Q&A và 15 đề essay trong phạm vi midterm.
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
- `data.js` — nội dung 10 unit, flashcards, gap filling, short answers và essays.
- `app.js` — điều hướng, flashcards, gap-filling trainer, bộ đếm từ, tìm kiếm, tiến độ và khu ôn midterm theo dạng bài.
- `mascots.js` — bộ ảnh mascot ruồi được nhúng trực tiếp để không lỗi đường dẫn khi đưa lên GitHub Pages.
- `assets/donate-phuoc-nguyen.png` — ảnh dùng trong mục Donate.
- `.github/workflows/deploy-pages.yml` — triển khai GitHub Pages.

## Lưu ý dữ liệu

Website dùng `localStorage`. Nếu người học xóa dữ liệu trình duyệt hoặc đổi thiết bị, tiến độ cũ sẽ không tự động đồng bộ.
