// Generates optimized, correctly-sized brand assets + favicon set from the
// large source PNGs in public/assets. Run automatically before `vite build`
// (see package.json) and committed so the repo always ships small images.
//
// Source images (kept out of public/ so the heavy originals never ship):
//   assets-src/fp-icon.png   1536x1024  cloud + document mark (transparent)
//   assets-src/fp-logo.png   1536x1024  mark + "FISCALPOINT" wordmark
//   assets-src/fp-dashboard.png 1348x595 app screenshot
//
// Nothing here changes the design — it only produces smaller renditions that
// look identical at their real display sizes.

import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const pub = join(root, 'public')
const assets = join(pub, 'assets')
const src = join(root, 'assets-src')

const ICON = join(src, 'fp-icon.png')
const LOGO = join(src, 'fp-logo.png')
const DASH = join(src, 'fp-dashboard.png')

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

async function run() {
  // ---- Favicon set (from the cloud+document mark) -----------------------
  for (const size of [16, 32, 48]) {
    await sharp(ICON)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(join(pub, `favicon-${size}.png`))
  }

  // PWA icons (transparent)
  for (const size of [192, 512]) {
    await sharp(ICON)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(join(pub, `icon-${size}.png`))
  }

  // Maskable icon: white background + safe-zone padding (~12%)
  const maskSize = 512
  const inner = Math.round(maskSize * 0.76)
  await sharp(ICON)
    .resize(inner, inner, { fit: 'contain', background: WHITE })
    .extend({
      top: (maskSize - inner) >> 1,
      bottom: maskSize - inner - ((maskSize - inner) >> 1),
      left: (maskSize - inner) >> 1,
      right: maskSize - inner - ((maskSize - inner) >> 1),
      background: WHITE,
    })
    .flatten({ background: WHITE })
    .png({ compressionLevel: 9 })
    .toFile(join(pub, 'icon-maskable-512.png'))

  // Apple touch icon (no transparency on iOS): white bg, slight inset
  const appleSize = 180
  const appleInner = Math.round(appleSize * 0.82)
  await sharp(ICON)
    .resize(appleInner, appleInner, { fit: 'contain', background: WHITE })
    .extend({
      top: (appleSize - appleInner) >> 1,
      bottom: appleSize - appleInner - ((appleSize - appleInner) >> 1),
      left: (appleSize - appleInner) >> 1,
      right: appleSize - appleInner - ((appleSize - appleInner) >> 1),
      background: WHITE,
    })
    .flatten({ background: WHITE })
    .png({ compressionLevel: 9 })
    .toFile(join(pub, 'apple-touch-icon.png'))

  // ---- Nav / footer logo --------------------------------------------------
  // .trim() strips the transparent padding baked into the source so the mark
  // fills its box → looks bigger at the same display size (slim navbar stays slim).
  await sharp(ICON)
    .trim()
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(join(assets, 'fp-icon-160.png'))
  await sharp(ICON)
    .trim()
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toFile(join(assets, 'fp-icon-160.webp'))

  // ---- Open Graph / social share image (1200x630) -----------------------
  const ogW = 1200
  const ogH = 630
  const logoOnOg = await sharp(LOGO)
    .resize(760, null, { fit: 'inside' })
    .toBuffer()
  await sharp({
    create: { width: ogW, height: ogH, channels: 4, background: WHITE },
  })
    .composite([{ input: logoOnOg, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(join(pub, 'og-image.png'))

  // ---- Dashboard screenshot (optimized png + webp) ----------------------
  await sharp(DASH)
    .resize(1280, null, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 82 })
    .toFile(join(assets, 'fp-dashboard-opt.png'))
  await sharp(DASH)
    .resize(1280, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(assets, 'fp-dashboard.webp'))

  console.log('✓ optimized images generated in public/')
}

run().catch((err) => {
  console.error('image optimization failed:', err)
  process.exit(1)
})
