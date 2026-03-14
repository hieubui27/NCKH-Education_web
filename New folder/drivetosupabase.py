
import os
import requests
import mimetypes
from supabase import create_client, Client

# --- CẤU HÌNH ---
# Bạn điền URL và Service Role Key vào đây
url="https://jwkljthwnoxwnlgmcgdb.supabase.co"
key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3a2xqdGh3bm94d25sZ21jZ2RiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTMxMTkzMCwiZXhwIjoyMDg2ODg3OTMwfQ.m0hOXuRwn7hn1uXMb1ozpUuSUqpS3s0CyNCkpzdaM6o"
BUCKET_NAME = "media" # Bạn phải tạo bucket này trong Supabase Storage trước và để Public

# Khởi tạo Supabase
supabase: Client = create_client(url, key)

def get_drive_id(url):
    """Lấy ID từ link Google Drive (xử lý nhiều dạng link)"""
    if not url or "drive.google.com" not in url:
        return None
    try:
        # Dạng: .../d/ID_FILE/...
        if "/d/" in url:
            return url.split("/d/")[1].split("/")[0]
        # Dạng: ...id=ID_FILE...
        if "id=" in url:
            return url.split("id=")[1].split("&")[0]
    except:
        return None
    return None

def get_extension(content_type):
    """
    Chuyển đổi Content-Type (MIME) sang đuôi file.
    Hỗ trợ WebP, PNG, JPG, GIF...
    """
    # Xử lý các trường hợp phổ biến của ảnh web
    if content_type == 'image/jpeg': return 'jpg'
    if content_type == 'image/png': return 'png'
    if content_type == 'image/webp': return 'webp'
    if content_type == 'image/gif': return 'gif'
    if content_type == 'image/svg+xml': return 'svg'
    
    # Nếu lạ quá thì nhờ thư viện python đoán
    ext = mimetypes.guess_extension(content_type)
    return ext.replace('.', '') if ext else 'jpg' # Mặc định jpg nếu không đoán được

def migrate_drive_images():
    print("🚀 BẮT ĐẦU QUÉT VÀ CHUYỂN ĐỔI ẢNH (Chế độ: Auto-Detect Format)...")

    # 1. Lọc dữ liệu: Chỉ lấy những dòng có link chứa 'drive.google.com'
    # .ilike() giúp tìm kiếm không phân biệt hoa thường
    response = supabase.table('vocabularies') \
        .select("id, word, image_url") \
        .ilike("image_url", "%drive.google.com%") \
        .execute()
        
    records = response.data

    if not records:
        print("✅ Không tìm thấy link Google Drive nào cần xử lý.")
        return

    print(f"📦 Tìm thấy {len(records)} link Drive cần chuyển đổi.\n")

    success_count = 0
    fail_count = 0

    for item in records:
        url = item['image_url']
        vocab_id = item['id']
        word = item['word']
        
        file_id = get_drive_id(url)

        if not file_id:
            print(f"⏩ Bỏ qua '{word}': Link không hợp lệ.")
            continue

        print(f"🔹 Đang xử lý: '{word}' (ID: {file_id})...")

        try:
            # 2. Tải file từ Google Drive
            # Link export=download giúp tải file gốc bất kể định dạng
            download_url = f'https://drive.google.com/uc?export=download&id={file_id}'
            
            # Giả lập trình duyệt để tránh bị chặn
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }

            # stream=True: Tải luồng (tốt cho file lớn, dù ảnh thì nhẹ)
            res = requests.get(download_url, headers=headers, stream=True, timeout=15)
            
            if res.status_code == 200:
                # 3. QUAN TRỌNG: Phát hiện định dạng file (WebP, PNG, JPG...)
                content_type = res.headers.get('Content-Type')
                
                # Nếu Google trả về trang web thay vì ảnh (do chưa mở quyền truy cập)
                if 'text/html' in content_type:
                    print(f"   ⚠️ Lỗi: File này đang để Private (Riêng tư). Hãy mở quyền 'Anyone with link'.")
                    fail_count += 1
                    continue

                # Lấy đuôi file chuẩn
                ext = get_extension(content_type)
                print(f"   ↳ Loại file gốc: {content_type} -> Lưu thành đuôi: .{ext}")

                # Đặt tên file mới theo ID từ vựng + đuôi file đúng
                file_name = f"{vocab_id}.{ext}"
                storage_path = f"vocab/{file_name}"
                
                # Đọc nội dung file
                file_content = res.content

                # 4. Upload lên Supabase Storage
                # upsert=True: Ghi đè nếu đã có
                upload_res = supabase.storage.from_(BUCKET_NAME).upload(
                    path=storage_path,
                    file=file_content,
                    file_options={"content-type": content_type, "upsert": "true"}
                )

                # 5. Lấy link public mới
                public_url_data = supabase.storage.from_(BUCKET_NAME).get_public_url(storage_path)
                new_public_url = public_url_data.publicUrl if hasattr(public_url_data, 'publicUrl') else public_url_data # Fix tùy version SDK

                # 6. Cập nhật lại Database
                supabase.table('vocabularies') \
                    .update({"image_url": new_public_url}) \
                    .eq("id", vocab_id) \
                    .execute()
                
                print(f"   ✅ Xong! Link mới: {new_public_url}")
                success_count += 1
            else:
                print(f"   ❌ Lỗi tải từ Drive (Status {res.status_code})")
                fail_count += 1

        except Exception as e:
            print(f"   ⚠️ Lỗi ngoại lệ: {e}")
            fail_count += 1

    print("\n------------------------------------------------")
    print(f"🎉 HOÀN TẤT!")
    print(f"✅ Thành công: {success_count}")
    print(f"❌ Thất bại: {fail_count}")

if __name__ == "__main__":
    migrate_drive_images()