import { downloader } from './tools/downloader.js';
import { cs2_dependencies } from './cs2-dependencies.js';
import { archiveExtractor } from './tools/archive-extractor.js';
import { fileContains, replaceInFile } from './tools/file-helper.js';

const ADDONS_FOLDER = '../server/game/csgo';

async function installMetamod() {
    const archivePath = await downloader(cs2_dependencies.metamod[process.platform]);
    await archiveExtractor(archivePath, ADDONS_FOLDER);
    const metamod = 'Game csgo/addons/metamod';
    const gameinfoFilePath = `${ADDONS_FOLDER}/gameinfo.gi`
    const isStringExist = await fileContains(gameinfoFilePath, metamod);
    const entry = 'Game_LowViolence	csgo_lv // Perfect World content override'
    if (!isStringExist) {
        await replaceInFile(gameinfoFilePath, entry, `${entry} \n ${metamod}`);
    }
    console.log("Successfully installed metamod!");
}

async function installCSSharpRuntime() {
    const archivePath = await downloader(cs2_dependencies.cssharp.runtime[process.platform]);
    await archiveExtractor(archivePath, ADDONS_FOLDER);
    console.log("Successfully installed CSSharp Runtime!");
}

await installMetamod();
await installCSSharpRuntime();