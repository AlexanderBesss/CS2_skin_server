import { config } from './config.js';
import { fileContains, replaceInFile } from './tools/file-helper.js';

export async function configureWeaponPaintsPlugin() {
    const configPathWeaponPaints = `${config.ADDONS_FOLDER}/addons/counterstrikesharp/configs/plugins/WeaponPaints/WeaponPaints.json`;
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
    // Core config
    const coreConfigPath = `${config.ADDONS_FOLDER}/addons/counterstrikesharp/configs/core.json`;
    await replaceInFile(coreConfigPath, '"FollowCS2ServerGuidelines": true', `"FollowCS2ServerGuidelines": false`);
}
