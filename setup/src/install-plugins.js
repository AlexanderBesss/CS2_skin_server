import { config } from './config.js';
import { cs2_dependencies } from './cs2-dependencies.js';
import { archiveExtractor } from './tools/archive-extractor.js';
import { downloader } from './tools/downloader.js';

export async function installPlugins() {
    for (const dependency in cs2_dependencies.cssharp.plugins) {
        const dependencyFilePath = await downloader(cs2_dependencies.cssharp.plugins[dependency]);
        await archiveExtractor(dependencyFilePath, config.ADDONS_FOLDER);
    }
    console.log("All generic counterstrikesharp plugins are installed!");

    for (const dependency in cs2_dependencies.cssharp.custom) {
        const customDependency = cs2_dependencies.cssharp.custom[dependency];
        const dependencyFilePath = await downloader(customDependency.url);
        await archiveExtractor(dependencyFilePath, customDependency.outputDir);
    }
    console.log("All custom counterstrikesharp plugins are installed!");
}
