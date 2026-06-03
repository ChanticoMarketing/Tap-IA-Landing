import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import toIco from 'to-ico';

const sourcePath = 'public/Logo-Favicon.source.png';

if (!existsSync(sourcePath)) {
  console.error(
    'Falta public/Logo-Favicon.source.png. Restáuralo con:\n' +
      '  git show HEAD:public/Logo-Favicon.png > public/Logo-Favicon.source.png',
  );
  process.exit(1);
}

const source = readFileSync(sourcePath);
const black = { r: 0, g: 0, b: 0 };

function resizeIcon(size) {
  return sharp(source)
    .resize(size, size, {
      fit: 'contain',
      background: { ...black, alpha: 1 },
      kernel: sharp.kernel.lanczos3,
    })
    .flatten({ background: black })
    .png()
    .toBuffer();
}

const logoFaviconPng = await sharp(source)
  .resize(128, 128, {
    fit: 'contain',
    background: { ...black, alpha: 1 },
    kernel: sharp.kernel.lanczos3,
  })
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync('public/Logo-Favicon.png', logoFaviconPng);

const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(icoSizes.map((size) => resizeIcon(size)));
writeFileSync('public/favicon.ico', await toIco(icoBuffers));

console.log(
  `OK: Logo-Favicon.png ${logoFaviconPng.length} bytes (128×128) | favicon.ico ${icoSizes.join('/')}px`,
);
