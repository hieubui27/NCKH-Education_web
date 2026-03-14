import json
import sys
from supabase import create_client
sys.stdout.reconfigure(encoding='utf-8')
url="https://jwkljthwnoxwnlgmcgdb.supabase.co"
key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3a2xqdGh3bm94d25sZ21jZ2RiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTMxMTkzMCwiZXhwIjoyMDg2ODg3OTMwfQ.m0hOXuRwn7hn1uXMb1ozpUuSUqpS3s0CyNCkpzdaM6o"
supabase = create_client(url, key)

response = supabase.table("vocabularies").select("id, example_sentences").eq("lesson_id", 60).execute()

# Duyệt qua từng dòng dữ liệu lấy về
for row in response.data:
    sentences = row.get("example_sentences")
    
    # Kiểm tra xem dữ liệu có đang bị biến thành chuỗi string (gây ra hiện tượng \ và " thừa) hay không
    if isinstance(sentences, str):
        try:
            # json.loads sẽ dịch ngược chuỗi thành mảng Python chuẩn. 
            # Bước này tự động lột bỏ toàn bộ dấu \ và " thừa bao bọc bên ngoài.
            fixed_json = json.loads(sentences)
            
            # (Tùy chọn) Nếu trong text của câu ví dụ vẫn còn dính chữ " lọt vào, ta có thể xóa luôn:
            

            # Update ngược lại lên Supabase. Lúc này truyền thẳng list/dict vào, Supabase tự hiểu là JSONB chuẩn
            supabase.table("vocabularies").update({
                "example_sentences": fixed_json
            }).eq("id", row["id"]).execute()
            print(fixed_json) # In ra để kiểm tra kết quả đã được sửa đúng chưa
            print(f"Đã sửa thành công từ có ID: {row['id']}")
            
        except json.JSONDecodeError as e:
            print(f"Bỏ qua ID {row['id']} vì không thể dịch chuỗi JSON: {e}")

print("Hoàn tất việc dọn dẹp dữ liệu!")