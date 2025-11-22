import { runCommands } from './tools/run-script.js';
import { spawn } from 'node:child_process';

/**
 * @param {String} process 
 * @param {String[]} commands 
 */
export async function runCommands(processName, commands) {
    const child = spawn(processName, commands);

    for await (const chunk of child.stdout) {
        console.log('[OUT]', chunk.toString());
    }

    for await (const chunk of child.stderr) {
        console.log('[ERR]', chunk.toString());
    }

    console.log('Command exited with:', child.exitCode);
}

async function updateCS2() {
    const OS = process.platform;
    switch (OS) {
        case 'linux':
            await runCommands('docker', [
                'compose',
                '-f',
                './steamcmd/linux/compose.yml',
                'up'
            ]);
            break;
        case 'win32':
            await runCommands('cmd', [
                '/c',
                './steamcmd/windows/update_cs2.bat'
            ]);
            break;

        default:
            console.log(OS, ' is unsupported OS!');
            break;
    }
}

await updateCS2();
