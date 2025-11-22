import { extract } from 'archive-wasm';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

/**
 * @param {String} archivePath 
 * @param {String} outputFolder 
 */
export async function archiveExtractor(archivePath, outputFolder) {
    const buffer = await readFile(archivePath);
    const uint8 = new Uint8Array(buffer);

    const entries = extract(uint8);

    for (const entry of entries) {
        const fullPath = join(outputFolder, entry.path);
        if (entry.type === 'DIR') {
            await mkdir(fullPath, { recursive: true });
        } else if (entry.type === 'FILE') {
            await mkdir(dirname(fullPath), { recursive: true });
            const dataToWrite = entry.data instanceof ArrayBuffer
                ? new Uint8Array(entry.data)
                : entry.data;

            await writeFile(fullPath, dataToWrite);
        }
    }

    console.log(`Extracted all files into ${outputFolder}`);
};
