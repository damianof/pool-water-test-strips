from PIL import Image, ImageDraw
import numpy as np

img = Image.open('images/strips3.png')
arr = np.array(img)
w, h = img.size
print(f"Image size: {w}x{h}")

# x-centers identified via saturation scan of strips3.png (562x922)
x_centers = [48, 125, 202, 280, 359, 435, 512]

# y-centers identified via saturation profile
rows = [
    ('Total Chlorine',   100, ['0', '0.5', '1', '3', '5', '10', '20']),
    ('Free Chlorine',    225, ['0', '0.5', '1', '3', '5', '10', '20']),
    ('Free Bromine',     360, ['0', '1', '2', '5', '10', '20', '40']),
    ('Hardness',         490, ['0', '50', '100', '250', '500', '1000', None]),
    ('Cyanuric Acid',    615, ['0', '30-50', '100', '150', '240', None, None]),
    ('Total Alkalinity', 745, ['0', '40', '80', '120', '180', '240', None]),
    ('pH',               875, ['6.2', '6.8', '7.2', '7.6', '7.8', '8.4', None]),
]

HALF = 12  # half-size of sampling box (24x24 px average)

debug = img.copy()
draw = ImageDraw.Draw(debug)

for name, cy, labels in rows:
    print(f"\n{name}:")
    for cx, label in zip(x_centers, labels):
        if label is None:
            continue
        y0, y1 = max(0, cy - HALF), min(h, cy + HALF)
        x0, x1 = max(0, cx - HALF), min(w, cx + HALF)
        region = arr[y0:y1, x0:x1]
        avg = region.mean(axis=(0, 1)).astype(int)
        hex_color = '#{:02x}{:02x}{:02x}'.format(avg[0], avg[1], avg[2])
        print(f"  {label:>6}: {hex_color}  rgb({avg[0]}, {avg[1]}, {avg[2]})")
        draw.rectangle([x0, y0, x1, y1], outline='red', width=2)

debug.save('images/debug_sampling.png')
print("\nDebug image saved to images/debug_sampling.png")
