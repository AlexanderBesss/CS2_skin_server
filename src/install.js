import { installModTools } from './install-mod-tools.js';
import { installPlugins } from './install-plugins.js';
import { WeaponPaints } from './weapon-paints.js';

// Install mod tools
await installModTools();

// Install plugins
await installPlugins();

const weaponPaints = new WeaponPaints();
await weaponPaints.install();
