import { config } from './config.js';
import packageJson from '../package.json' with { type: "json" };
import { archiveExtractor } from './tools/archive-extractor.js';
import { downloader } from './tools/downloader.js';
import { fileContains, replaceInFile } from './tools/file-helper.js';

async function installMetamod() {
    const archivePath = await downloader(packageJson.cs2.dependencies.metamod[process.platform]);
    await archiveExtractor(archivePath, config.CSGO_FOLDER);
    const metamod = 'Game csgo/addons/metamod';
    const gameinfoFilePath = `${config.CSGO_FOLDER}/gameinfo.gi`;
    const isStringExist = await fileContains(gameinfoFilePath, metamod);
    const entry = 'Game_LowViolence	csgo_lv // Perfect World content override';
    if (!isStringExist) {
        await replaceInFile(gameinfoFilePath, entry, `${entry} \n ${metamod}`);
    }
    console.log("Successfully installed metamod!");
}

async function installCSSharpRuntime() {
    const archivePath = await downloader(packageJson.cs2.dependencies.cssharp.runtime[process.platform]);
    await archiveExtractor(archivePath, config.CSGO_FOLDER);
    console.log("Successfully installed CSSharp Runtime!");
}

export async function installModTools() {
    await installMetamod();
    await installCSSharpRuntime();
}
