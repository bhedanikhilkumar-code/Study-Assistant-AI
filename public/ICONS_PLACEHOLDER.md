# PWA Icon Placeholders

This project intentionally does **not** store binary icon assets in this repository flow.

To enable production-ready install icons, add the following files manually:

- `public/icons/icon-192.png` (192x192)
- `public/icons/icon-512.png` (512x512, maskable recommended)

The app references these paths from `public/manifest.json`.
