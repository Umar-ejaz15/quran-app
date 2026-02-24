/* eslint-disable @typescript-eslint/no-require-imports */
// Script to generate PWA icons from SVG
// Run: node scripts/generate-icons.js

const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('📱 PWA Icon Generator');
console.log('=====================\n');

console.log('To generate PNG icons from icon.svg, you have several options:\n');

console.log('Option 1: Use an online tool');
console.log('- Visit: https://realfavicongenerator.net/');
console.log('- Upload: public/icon.svg');
console.log('- Download the generated icons\n');

console.log('Option 2: Use sharp (Node.js)');
console.log('- Install: pnpm add -D sharp');
console.log('- Then run this updated script\n');

console.log('Option 3: Use ImageMagick (CLI)');
console.log('Required sizes:', sizes.map((s) => `${s}x${s}`).join(', '));
console.log('\nCommands:');
sizes.forEach((size) => {
  console.log(`convert public/icon.svg -resize ${size}x${size} public/icon-${size}x${size}.png`);
});

console.log('\n✅ For now, using placeholder approach...\n');

// Try to use sharp if available
try {
  const sharp = require('sharp');
  const svgPath = path.join(__dirname, '../public/icon.svg');

  console.log('Sharp is available! Generating icons...\n');

  (async () => {
    for (const size of sizes) {
      const outputPath = path.join(__dirname, `../public/icon-${size}x${size}.png`);
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated icon-${size}x${size}.png`);
    }
    console.log('\n✅ All icons generated successfully!');
  })();
} catch (_err) {
  console.log('ℹ️  Sharp not installed. To auto-generate icons:');
  console.log('   pnpm add -D sharp');
  console.log('   node scripts/generate-icons.js');
  console.log('\nOr use one of the options above.');
  if (process.env.DEBUG) {
    console.error(_err);
  }
}
