import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(size, bgHex = '#1A1A1A', circleHex = '#D95D7D') {
  // Parse colors
  const parseHex = (hex) => {
    hex = hex.replace('#', '');
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
      255
    ];
  };

  const bgColor = parseHex(bgHex);
  const circleColor = parseHex(circleHex);
  const innerBgColor = parseHex('#F9F8F6');

  // RGBA buffer: (size * 4 + 1 filter byte) per row
  const rawData = Buffer.alloc(size * (size * 4 + 1));
  const center = size / 2;
  const radius = size * 0.44; // outer rounded rect / circle
  const innerCircleRadius = size * 0.22;
  const dotRadius = size * 0.08;

  let offset = 0;
  for (let y = 0; y < size; y++) {
    rawData[offset++] = 0; // Filter type: None
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Icon with warm background, dark circle, and rose dot in center
      // or sleek dark tile with rose concentric rings
      let r = innerBgColor[0];
      let g = innerBgColor[1];
      let b = innerBgColor[2];
      let a = 255;

      if (dist <= radius) {
        // Dark core circle
        r = bgColor[0];
        g = bgColor[1];
        b = bgColor[2];

        // Rose accent center
        if (dist <= innerCircleRadius) {
          r = circleColor[0];
          g = circleColor[1];
          b = circleColor[2];
        }
      }

      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  // Compress with zlib
  const compressed = zlib.deflateSync(rawData);

  // CRC32 table
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[i] = c >>> 0;
  }

  const crc32 = (buf) => {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  };

  const makeChunk = (type, data) => {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crcVal = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crcVal, 8 + len);
    return buf;
  };

  // PNG Header
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0); // width
  ihdrData.writeUInt32BE(size, 4); // height
  ihdrData.writeUInt8(8, 8); // bit depth
  ihdrData.writeUInt8(6, 9); // color type (6 = RGBA)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT Chunk
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND Chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate Apple Touch Icon (180x180)
const appleIcon = createPNG(180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Generate 192x192 icon for Android/PWA
const icon192 = createPNG(192);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);

// Generate 512x512 icon for Android/PWA splash/home screen
const icon512 = createPNG(512);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

// Generate 32x32 favicon.png
const favicon32 = createPNG(32);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), favicon32);

console.log('Icons generated successfully in /public');
