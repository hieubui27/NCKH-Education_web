import pandas as pd
import re

def export_lessons_only(excel_path):
    # Đọc file, bỏ qua các dòng tiêu đề không liên quan
    df = pd.read_excel(excel_path, skiprows=2)
    
    # Chỉ đặt tên cho cột A để xử lý
    df.columns = ['trash', 'van_ban'] + [f'col_{i}' for i in range(2, len(df.columns))]

    lessons = []
    themes = []
    weeks = []

    # Khởi tạo ID để tránh lỗi UnboundLocalError
    curr_theme_id = 0
    curr_week_id = 0
    l_id = 1

    print("--- Đang trích xuất dữ liệu bài học ---")

    for index, row in df.iterrows():
        text = str(row['van_ban']).strip()
        
        if not text or text == 'nan':
            continue

        # 1. Nhận diện CHỦ ĐỀ
        if "CHỦ ĐỀ" in text.upper():
            curr_theme_id += 1
            title = text.split(':')[-1].strip() if ':' in text else text
            themes.append({'id': curr_theme_id, 'title': title})
            
        # 2. Nhận diện TUẦN
        elif "TUẦN" in text.upper():
            curr_week_id += 1
            num_match = re.search(r'\d+', text)
            week_num = int(num_match.group()) if num_match else curr_week_id
            weeks.append({
                'id': curr_week_id, 
                'theme_id': curr_theme_id if curr_theme_id > 0 else 1, 
                'week_number': week_num, 
                'title': text
            })

        # 3. Nhận diện BÀI (Trọng tâm)
        elif text.startswith("Bài"):
            # Tách dòng đầu tiên để lấy Tiêu đề, các dòng còn lại là Nội dung
            lines = text.split('\n')
            first_line = lines[0]
            
            # Regex lấy chữ ngay sau "Bài X:" hoặc "Bài X."
            # Ví dụ: "Bài 1: Chuyện bốn mùa" -> "Chuyện bốn mùa"
            title_match = re.search(r'Bài\s*\d+[\s:.-]+(.*)', first_line, re.IGNORECASE)
            
            if title_match:
                lesson_title = title_match.group(1).strip()
            else:
                lesson_title = first_line # Phòng trường hợp không viết số bài
            
            # Nội dung bài học là toàn bộ văn bản trong ô đó
            content = text 

            lessons.append({
                'id': l_id,
                'week_id': curr_week_id if curr_week_id > 0 else 1,
                'title': lesson_title,
                'content': content,
                'order_number': l_id
            })
            l_id += 1

    # Xuất file
    pd.DataFrame(themes).to_csv('themes.csv', index=False, encoding='utf-8-sig')
    pd.DataFrame(weeks).to_csv('weeks.csv', index=False, encoding='utf-8-sig')
    pd.DataFrame(lessons).to_csv('lessons.csv', index=False, encoding='utf-8-sig')

    print(f"✅ Hoàn tất! Đã trích xuất {len(lessons)} bài học.")
    print("Các file đã tạo: themes.csv, weeks.csv, lessons.csv")

# Chạy tool
export_lessons_only("TẬP ĐỌC KNTT 2.2.xlsx")