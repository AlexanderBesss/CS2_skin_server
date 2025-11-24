import { rename } from 'fs/promises';
import fs from 'node:fs';
import packageJson from '../package.json' with { type: "json" };
import { config } from './config.js';
import { archiveExtractor } from './tools/archive-extractor.js';
import { downloader } from './tools/downloader.js';
import { fileContains, replaceInFile } from './tools/file-helper.js';

export class WeaponPaints {
    async #installPlugin() {
        const pluginFolder = `${config.ADDONS_FOLDER}/counterstrikesharp/plugins`;
        if (fs.existsSync(`${pluginFolder}/WeaponPaints`)) {
            console.log("WeaponPaints already installed!");
            return;
        }
        const weaponPaintsFilePath = await downloader(packageJson.cs2.dependencies.cssharp.weaponPaints);
        await archiveExtractor(weaponPaintsFilePath, pluginFolder);
        await rename(`${pluginFolder}/gamedata/weaponpaints.json`, `${config.ADDONS_FOLDER}/counterstrikesharp/gamedata/weaponpaints.json`);
        console.log("All WeaponPaints files are copied!");
    }

    async #installWebsite() {
        const weaponPaintsWebsiteFilePath = await downloader(packageJson.cs2.dependencies.cssharp.weaponPaintsWebsite);
        await archiveExtractor(weaponPaintsWebsiteFilePath, './');
    }

    async #configurePlugin() {
        // core.json config
        const coreConfigPath = `${config.ADDONS_FOLDER}/counterstrikesharp/configs/core.json`;
        await replaceInFile(coreConfigPath, '"FollowCS2ServerGuidelines": true', `"FollowCS2ServerGuidelines": false`);

        // WeaponPaints.json config
        const configPathWeaponPaints = `${config.ADDONS_FOLDER}/counterstrikesharp/configs/plugins/WeaponPaints/WeaponPaints.json`;
        if (fileContains(configPathWeaponPaints, '"DatabaseHost": ""')) {
            await replaceInFile(configPathWeaponPaints, '"DatabaseHost": ""', `"DatabaseHost": "${config.MYSQL_HOST}"`);
        }
        if (fileContains(configPathWeaponPaints, '"DatabaseUser": ""')) {
            await replaceInFile(configPathWeaponPaints, '"DatabaseUser": ""', `"DatabaseUser": "${config.MYSQL_USER}"`);
        }
        if (fileContains(configPathWeaponPaints, '"DatabasePassword": ""')) {
            await replaceInFile(configPathWeaponPaints, '"DatabasePassword": ""', `"DatabasePassword": "${config.MYSQL_PASSWORD}"`);
        }
        if (fileContains(configPathWeaponPaints, '"DatabaseName": ""')) {
            await replaceInFile(configPathWeaponPaints, '"DatabaseName": ""', `"DatabaseName": "${config.MYSQL_DATABASE}"`);
        }
        if (fileContains(configPathWeaponPaints, '"Website": "example.com/skins"')) {
            await replaceInFile(configPathWeaponPaints, '"Website": "example.com/skins"', `"Website": "${config.WEB_SITE}"`);
        }
        if (fileContains(configPathWeaponPaints, '"DatabasePort": 3306')) {
            await replaceInFile(configPathWeaponPaints, '"DatabasePort": 3306', `"DatabasePort": ${config.MYSQL_PORT}`);
        }
    }

    async configureWebsite() {
        const websiteConfiguration = `./website/class/config.php`;
        if (fileContains(websiteConfiguration, "define('DB_NAME', '');")) {
            await replaceInFile(websiteConfiguration, "define('DB_NAME', '');", `define('DB_NAME', '${config.MYSQL_DATABASE}');`);
        }
        if (fileContains(websiteConfiguration, "define('DB_USER', '');")) {
            await replaceInFile(websiteConfiguration, "define('DB_USER', '');", `define('DB_USER', '${config.MYSQL_USER}');`);
        }
        if (fileContains(websiteConfiguration, "define('DB_PASS', '');")) {
            await replaceInFile(websiteConfiguration, "define('DB_PASS', '');", `define('DB_PASS', '${config.MYSQL_PASSWORD}');`);
        }
        if (fileContains(websiteConfiguration, "define('DB_HOST', 'localhost');")) {
            await replaceInFile(websiteConfiguration, "define('DB_HOST', 'localhost');", `define('DB_HOST', 'db');`);
        }
        if (fileContains(websiteConfiguration, "define('DB_PORT', '3306');")) {
            await replaceInFile(websiteConfiguration, "define('DB_PORT', '3306');", `define('DB_PORT', '${config.MYSQL_PORT}');`);
        }
        if (fileContains(websiteConfiguration, "define('STEAM_API_KEY', '');")) {
            await replaceInFile(websiteConfiguration, "define('STEAM_API_KEY', '');", `define('STEAM_API_KEY', '${config.STEAM_API_KEY}');`);
        }
        if (fileContains(websiteConfiguration, "define('STEAM_DOMAIN_NAME', '');")) {
            await replaceInFile(websiteConfiguration, "define('STEAM_DOMAIN_NAME', '');", `define('STEAM_DOMAIN_NAME', '${config.STEAM_DOMAIN_NAME}');`);
        }
    }

    async install() {
        await this.#installPlugin();
        await this.#installWebsite();
    }

    async configure() {
        await this.#configurePlugin();
        await this.configureWebsite();
    }
}