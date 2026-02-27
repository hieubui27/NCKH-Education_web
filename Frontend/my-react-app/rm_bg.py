from PIL import Image

path_in = r"C:\Users\kienn\.gemini\antigravity\brain\c39ed31f-3be2-4b44-8eb7-c47b6555971e\media__1772212272257.png"
path_out = r"d:\VS\education_web\NCKH-Education_web\Frontend\my-react-app\src\assets\logo_vienkey.png"

try:
    img = Image.open(path_in)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # white background threshold
        if item[0] >= 240 and item[1] >= 240 and item[2] >= 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(path_out, "PNG")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
