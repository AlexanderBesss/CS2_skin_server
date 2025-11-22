import * as fs from 'node:fs';
import * as path from 'node:path';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

const defaultDestinationPath = './temp';

/**
 * @param {String} url 
 * @returns Downloaded file path
 */
export async function downloader(url) {
  try {
    if (!fs.existsSync(defaultDestinationPath)) {
      fs.mkdirSync(defaultDestinationPath, { recursive: true });
    }

    const parsed = new URL(url);
    let filename = path.basename(parsed.pathname);

    if (!filename) {
      filename = 'download_' + Date.now();
    }

    const fullPath = path.join(defaultDestinationPath, filename);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText} (${response.status})`);
    }

    const sourceStream = Readable.fromWeb(response.body);
    const destinationStream = fs.createWriteStream(fullPath);

    await finished(sourceStream.pipe(destinationStream));

    console.log(`Successfully downloaded file to ${fullPath}`);
    return fullPath;

  } catch (error) {
    console.error('Error during file download:', error.message);
    throw error;
  }
}
