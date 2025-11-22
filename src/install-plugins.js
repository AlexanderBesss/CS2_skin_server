import packageJson from '../package.json' with { type: "json" };
import { config } from './config.js';
import { archiveExtractor } from './tools/archive-extractor.js';
import { downloader } from './tools/downloader.js';

export async function installPlugins() {
    for (const dependency in packageJson.cs2.dependencies.cssharp.plugins) {
        const dependencyFilePath = await downloader(packageJson.cs2.dependencies.cssharp.plugins[dependency]);
        await archiveExtractor(dependencyFilePath, config.CSGO_FOLDER);
    }
    console.log("All generic counterstrikesharp plugins are installed!");
}
