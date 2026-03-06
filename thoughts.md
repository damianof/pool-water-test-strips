# Image Analysis — Effort Breakdown

## What's essentially free (already done)
- Color distance matching — oklch + Euclidean distance is ~10 lines of code. All reference colors already have both `hex` and `oklch` stored in `src/data/chemicals.ts`.

## Easy (few hours)
- **Manual sampling**: user takes a photo, taps each pad on screen → app samples that pixel cluster and finds the nearest swatch. No CV needed, works today.

## Medium (a few days)
- **Semi-auto crop**: render the photo on a `<canvas>`, let the user drag a rectangle over the strip, then auto-sample N evenly-spaced regions along it. Still no ML, just geometry math.

## Hard (weeks) — the real challenge is lighting
- Phone cameras auto-white-balance aggressively. The same strip under sunlight vs indoor fluorescent will sample completely different oklch values vs the reference.
- **Mitigation**: most strips have a white/blank pad — sample it first and apply a white-balance correction factor to all other readings. That alone gets you most of the way there.

## Very hard (ML, probably not worth it)
- Fully automatic strip detection in an arbitrary photo needs a trained model (YOLO/etc). Overkill for this use case.

## Recommended path
1. Manual tap-to-sample first — validate the color matching works at all
2. Add white-balance correction using the blank pad
3. Add the crop-and-auto-sample UX
