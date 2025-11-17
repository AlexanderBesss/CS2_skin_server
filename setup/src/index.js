import { installModTools } from './install-mod-tools.js';
import { installPlugins } from './install-plugins.js';
import { configureWeaponPaintsPlugin } from './configure-weapon-paints.js';

await installModTools();
await installPlugins();

await configureWeaponPaintsPlugin();
