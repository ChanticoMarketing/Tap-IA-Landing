import { existsSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import toIco from 'to-ico';

const sourcePath = 'public/Logo-Favicon.source.png';

if (!existsSync(sourcePath)) {
  console.error(
    `Error: Falta el archivo de origen "${sourcePath}".\n` +
    `Por favor, asegúrate de que Logo-Favicon.source.png esté en la carpeta public/`
  );
  process.exit(1);
}

// Factor de redondeo (18% es el estándar moderno similar al de iOS/macOS)
const CORNER_RADIUS_FACTOR = 0.18;

async function generateRoundedIcon(size) {
  const radius = Math.round(size * CORNER_RADIUS_FACTOR);
  
  // Creamos la máscara SVG con esquinas redondeadas
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#ffffff" />
    </svg>`
  );

  return sharp(sourcePath)
    .resize(size, size, {
      fit: 'cover',
      kernel: sharp.kernel.lanczos3
    })
    .composite([{
      input: mask,
      blend: 'dest-in'
    }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

try {
  console.log(`Generando favicon con esquinas redondeadas (radio: ${CORNER_RADIUS_FACTOR * 100}%)...`);

  // 1. Generar Logo-Favicon.png (128x128)
  const logoFaviconPng = await generateRoundedIcon(128);
  writeFileSync('public/Logo-Favicon.png', logoFaviconPng);
  console.log(`✓ Generado: public/Logo-Favicon.png (128x128) - ${logoFaviconPng.length} bytes`);

  // 2. Generar favicon.ico con múltiples tamaños (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(icoSizes.map(size => generateRoundedIcon(size)));
  const icoData = await toIco(icoBuffers);
  writeFileSync('public/favicon.ico', icoData);
  console.log(`✓ Generado: public/favicon.ico (tamaños: ${icoSizes.join(', ')}) - ${icoData.length} bytes`);

  console.log('¡Favicons generados con éxito con esquinas redondeadas y transparencia!');
} catch (error) {
  console.error('Error al generar los favicons:', error);
  process.exit(1);
}
