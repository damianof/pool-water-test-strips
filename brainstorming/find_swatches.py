from PIL import Image
import numpy as np

img = Image.open('images/strips3.png')
arr = np.array(img).astype(float)
h, w = arr.shape[:2]

# Row y-centers from saturation profile analysis
row_ys = {'tc': 100, 'fc': 225, 'fb': 360, 'hard': 490, 'cya': 615, 'alk': 745, 'ph': 875}

r, g, b = arr[:,:,0]/255.0, arr[:,:,1]/255.0, arr[:,:,2]/255.0
cmax = np.maximum(np.maximum(r,g), b)
cmin = np.minimum(np.minimum(r,g), b)
sat = np.where(cmax > 0, (cmax - cmin) / cmax, 0)

for name, cy in row_ys.items():
    row_slice = sat[cy-10:cy+10, :].mean(axis=0)
    cols = np.where(row_slice > 0.05)[0]
    if len(cols) > 0:
        print(f'{name}: x range {cols[0]}-{cols[-1]}')
        groups = []
        g_start = cols[0]
        g_prev = cols[0]
        for x in cols[1:]:
            if x - g_prev > 5:
                groups.append((g_start, g_prev))
                g_start = x
            g_prev = x
        groups.append((g_start, g_prev))
        for gx0, gx1 in groups:
            cx = (gx0 + gx1) // 2
            print(f'  [{gx0}-{gx1}] center={cx}')
    else:
        print(f'{name}: no saturated pixels found at y={cy}')
