import pandas as pd

# 1. Đọc dữ liệu từ file CSV ban đầu (không dùng header mặc định vì cấu trúc file khá phức tạp)
file_path = "TẬP ĐỌC KNTT 2.2 (1).xlsx"
df = pd.read_excel(file_path, engine='openpyxl')

# 2. Đặt lại tên các cột cho chuẩn chỉnh theo cấu trúc bạn đang có
columns = [
    "Bài/Tuần",        # Cột 0
    "VĂN BẢN",         # Cột 1
    "TỪ",              # Cột 2
    "GIẢI NGHĨA",      # Cột 3
    "NGHĨA TINH GỌN",  # Cột 4
    "HÌNH ẢNH",        # Cột 5
    "ÂM THANH",        # Cột 6
    "VIDEO MINH HỌA",  # Cột 7
    "MINH HỌA KHÁC",   # Cột 8
    "CÁC TỪ LIÊN QUAN",# Cột 9
    "ĐẶT CÂU MINH HỌA",# Cột 10
    "GHI CHÚ"          # Cột 11
]
df.columns = columns

# 3. Tìm vị trí bắt đầu của "Bài 4" và vị trí kết thúc (bắt đầu của Bài tiếp theo hoặc Tuần tiếp theo)
start_idx = -1
end_idx = len(df)

for idx, row in df.iterrows():
    val = str(row["Bài/Tuần"]).strip()
    if pd.notna(row["Bài/Tuần"]) and "Bài 4" in val:
        start_idx = idx
        break

if start_idx != -1:
    for idx in range(start_idx + 1, len(df)):
        val = str(df.iloc[idx, 0]).strip()
        if pd.notna(df.iloc[idx, 0]) and ("Bài " in val or "TUẦN" in val):
            end_idx = idx
            break

# 4. Trích xuất khoảng dữ liệu thuộc Bài 4
df_bai4 = df.iloc[start_idx:end_idx].copy()

# 5. Lọc bỏ các dòng trống (không có từ)
df_bai4 = df_bai4[pd.notna(df_bai4["TỪ"])]

# 6. Chọn các cột cần thiết để đưa lên Database và lưu thành file CSV
cols_to_keep = ["TỪ", "GIẢI NGHĨA", "NGHĨA TINH GỌN", "HÌNH ẢNH", "ÂM THANH", 
                "VIDEO MINH HỌA", "MINH HỌA KHÁC", "CÁC TỪ LIÊN QUAN", "ĐẶT CÂU MINH HỌA", "GHI CHÚ"]
df_export = df_bai4[cols_to_keep]

# Lưu thành CSV với encoding utf-8-sig để không bị lỗi font tiếng Việt
export_path = "Tu_Bai_4.csv"
df_export.to_csv(export_path, index=False, encoding='utf-8-sig')

print(f"Đã xuất dữ liệu thành công ra file: {export_path}")