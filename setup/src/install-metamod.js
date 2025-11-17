import { downloader } from './tools/downloader.js';
import { cs2_dependencies } from './cs2-dependencies.js';
import { archiveExtractor } from './tools/archive-extractor.js';
import { replaceInFile } from './tools/replace-in-file.js';

async function installMetamod() {
    const ADDONS_FOLDER = '../server/game/csgo';

    const archivePath = await downloader(cs2_dependencies.metamod[process.platform]);
    await archiveExtractor(archivePath, ADDONS_FOLDER);
    await replaceInFile(`${ADDONS_FOLDER}/gameinfo.gi`, 'Game	csgo', 'Game csgo/addons/metamod \n Game	csgo')
    console.log("Successfully installed metamod!");
}

await installMetamod();