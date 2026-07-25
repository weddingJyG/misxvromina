const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Directorio de destino
const outputDir = path.join(__dirname, 'assets', 'images', 'flowers');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Función para generar un archivo PNG transparente de 32-bit (RGBA)
 */function createTransparentPng(width, height, drawCallback) {
    const rawData = Buffer.alloc(height * (width * 4 + 1));

    for (let y = 0; y < height; y++) {
        const rowOffset = y * (width * 4 + 1);
        rawData[rowOffset] = 0; // Filter type: None

        for (let x = 0; x < width; x++) {
            const pxOffset = rowOffset + 1 + x * 4;
            const color = drawCallback(x, y, width, height);
            rawData[pxOffset]     = color.r; // Red
            rawData[pxOffset + 1] = color.g; // Green
            rawData[pxOffset + 2] = color.b; // Blue
            rawData[pxOffset + 3] = color.a; // Alpha (Transparencia)
        }
    }

    const compressed = zlib.deflateSync(rawData);

    // PNG Signature
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    // IHDR Chunk
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8;  // Bit depth
    ihdr[9] = 6;  // Color type: RGBA
    ihdr[10] = 0; // Compression method
    ihdr[11] = 0; // Filter method
    ihdr[12] = 0; // Interlace method
    const ihdrChunk = createChunk('IHDR', ihdr);

    // IDAT Chunk
    const idatChunk = createChunk('IDAT', compressed);

    // IEND Chunk
    const iendChunk = createChunk('IEND', Buffer.alloc(0));

    return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
    const length = data.length;
    const buf = Buffer.alloc(8 + length + 4);
    buf.writeUInt32BE(length, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.slice(4, 8 + length));
    buf.writeInt32BE(crc, 8 + length);
    return buf;
}

// CRC32 Helper
function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
        let byte = buf[i];
        crc ^= byte;
        for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ (-(crc & 1) & 0xEDB88320);
        }
    }
    return crc ^ -1;
}

/**
 * GENERACIÓN DE LAS 8 COMPOSICIONES FLORALES DE ACUARELA CON TRANSPARENCIA
 */

// 1. 01-floral-top-left.png (Esquina superior izquierda)
const img1 = createTransparentPng(400, 400, (x, y, w, h) => {
    // Distancia a la esquina superior izquierda
    const dist1 = Math.hypot(x - 80, y - 80);
    const dist2 = Math.hypot(x - 220, y - 100);
    const dist3 = Math.hypot(x - 100, y - 220);
    const leafDist = Math.hypot(x - 280, y - 180);

    if (dist1 < 75) {
        // Peonía Rosa Principal
        const ratio = dist1 / 75;
        return { r: 217 - Math.floor(ratio * 30), g: 121 + Math.floor(ratio * 20), b: 140 + Math.floor(ratio * 20), a: Math.floor((1 - ratio) * 230) };
    } else if (dist2 < 55) {
        // Flor Blanca Pastel
        const ratio = dist2 / 55;
        return { r: 253, g: 240 + Math.floor(ratio * 10), b: 243, a: Math.floor((1 - ratio) * 220) };
    } else if (dist3 < 50) {
        // Flor Rosa Empolvado
        const ratio = dist3 / 50;
        return { r: 232, g: 156, b: 174, a: Math.floor((1 - ratio) * 210) };
    } else if (leafDist < 45) {
        // Hojas Verde Salvia
        const ratio = leafDist / 45;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 200) };
    }
    return { r: 0, g: 0, b: 0, a: 0 }; // Transparente
});
fs.writeFileSync(path.join(outputDir, '01-floral-top-left.png'), img1);

// 2. 02-floral-top-right.png (Esquina superior derecha)
const img2 = createTransparentPng(400, 400, (x, y, w, h) => {
    const dist1 = Math.hypot(x - 320, y - 80);
    const dist2 = Math.hypot(x - 180, y - 100);
    const dist3 = Math.hypot(x - 300, y - 220);
    const leafDist = Math.hypot(x - 120, y - 180);

    if (dist1 < 75) {
        const ratio = dist1 / 75;
        return { r: 217, g: 121, b: 140, a: Math.floor((1 - ratio) * 230) };
    } else if (dist2 < 55) {
        const ratio = dist2 / 55;
        return { r: 253, g: 240, b: 243, a: Math.floor((1 - ratio) * 220) };
    } else if (dist3 < 50) {
        const ratio = dist3 / 50;
        return { r: 232, g: 156, b: 174, a: Math.floor((1 - ratio) * 210) };
    } else if (leafDist < 45) {
        const ratio = leafDist / 45;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 200) };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
});
fs.writeFileSync(path.join(outputDir, '02-floral-top-right.png'), img2);

// 3. 03-floral-side-left.png (Lateral izquierdo vertical)
const img3 = createTransparentPng(200, 600, (x, y, w, h) => {
    const d1 = Math.hypot(x - 30, y - 150);
    const d2 = Math.hypot(x - 40, y - 300);
    const d3 = Math.hypot(x - 25, y - 450);
    const leaf = Math.hypot(x - 90, y - 280);

    if (d1 < 45 || d2 < 55 || d3 < 40) {
        const minD = Math.min(d1, d2, d3);
        const ratio = minD / 55;
        return { r: 226, g: 136, b: 157, a: Math.floor((1 - ratio) * 210) };
    } else if (leaf < 35) {
        const ratio = leaf / 35;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 190) };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
});
fs.writeFileSync(path.join(outputDir, '03-floral-side-left.png'), img3);

// 4. 04-floral-side-right.png (Lateral derecho vertical)
const img4 = createTransparentPng(200, 600, (x, y, w, h) => {
    const d1 = Math.hypot(x - 170, y - 150);
    const d2 = Math.hypot(x - 160, y - 300);
    const d3 = Math.hypot(x - 175, y - 450);
    const leaf = Math.hypot(x - 110, y - 280);

    if (d1 < 45 || d2 < 55 || d3 < 40) {
        const minD = Math.min(d1, d2, d3);
        const ratio = minD / 55;
        return { r: 226, g: 136, b: 157, a: Math.floor((1 - ratio) * 210) };
    } else if (leaf < 35) {
        const ratio = leaf / 35;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 190) };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
});
fs.writeFileSync(path.join(outputDir, '04-floral-side-right.png'), img4);

// 5. 05-floral-bottom-left.png (Esquina inferior izquierda)
const img5 = createTransparentPng(450, 450, (x, y, w, h) => {
    const d1 = Math.hypot(x - 100, y - 350);
    const d2 = Math.hypot(x - 240, y - 330);
    const d3 = Math.hypot(x - 120, y - 210);
    const leaf = Math.hypot(x - 320, y - 260);

    if (d1 < 85) {
        const ratio = d1 / 85;
        return { r: 217, g: 121, b: 140, a: Math.floor((1 - ratio) * 230) };
    } else if (d2 < 65 || d3 < 60) {
        const minD = Math.min(d2, d3);
        const ratio = minD / 65;
        return { r: 253, g: 240, b: 243, a: Math.floor((1 - ratio) * 220) };
    } else if (leaf < 50) {
        const ratio = leaf / 50;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 200) };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
});
fs.writeFileSync(path.join(outputDir, '05-floral-bottom-left.png'), img5);

// 6. 06-floral-bottom-right.png (Esquina inferior derecha)
const img6 = createTransparentPng(450, 450, (x, y, w, h) => {
    const d1 = Math.hypot(x - 350, y - 350);
    const d2 = Math.hypot(x - 210, y - 330);
    const d3 = Math.hypot(x - 330, y - 210);
    const leaf = Math.hypot(x - 130, y - 260);

    if (d1 < 85) {
        const ratio = d1 / 85;
        return { r: 217, g: 121, b: 140, a: Math.floor((1 - ratio) * 230) };
    } else if (d2 < 65 || d3 < 60) {
        const minD = Math.min(d2, d3);
        const ratio = minD / 65;
        return { r: 253, g: 240, b: 243, a: Math.floor((1 - ratio) * 220) };
    } else if (leaf < 50) {
        const ratio = leaf / 50;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 200) };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
});
fs.writeFileSync(path.join(outputDir, '06-floral-bottom-right.png'), img6);

// 7. 07-floral-corner-small.png (Decoración pequeña)
const img7 = createTransparentPng(180, 180, (x, y, w, h) => {
    const d1 = Math.hypot(x - 70, y - 70);
    const leaf = Math.hypot(x - 120, y - 110);

    if (d1 < 40) {
        const ratio = d1 / 40;
        return { r: 232, g: 156, b: 174, a: Math.floor((1 - ratio) * 220) };
    } else if (leaf < 30) {
        const ratio = leaf / 30;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 190) };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
});
fs.writeFileSync(path.join(outputDir, '07-floral-corner-small.png'), img7);

// 8. 08-floral-divider.png (Separador horizontal)
const img8 = createTransparentPng(600, 100, (x, y, w, h) => {
    const centerDist = Math.hypot(x - 300, y - 50);
    const leftDist = Math.hypot(x - 220, y - 50);
    const rightDist = Math.hypot(x - 380, y - 50);

    if (centerDist < 30) {
        const ratio = centerDist / 30;
        return { r: 217, g: 121, b: 140, a: Math.floor((1 - ratio) * 230) };
    } else if (leftDist < 20 || rightDist < 20) {
        const minD = Math.min(leftDist, rightDist);
        const ratio = minD / 20;
        return { r: 180, g: 192, b: 175, a: Math.floor((1 - ratio) * 200) };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
});
fs.writeFileSync(path.join(outputDir, '08-floral-divider.png'), img8);

console.log("¡Los 8 recursos florales PNG con transparencia se generaron exitosamente en assets/images/flowers/!");
