

import { runCommands } from './tools/run-script.js';

async function start() {
    const OS = process.platform;
    switch (OS) {
        case 'linux':
            await runCommands([
                './start-linux.sh'
            ]);
            break;
        case 'win32':
            await runCommands([
                '/c',
                './start-windows.bat'
            ]);
            break;
        default:
            console.log(OS, ' is unsupported OS!');
            break;
    }
}

await start();