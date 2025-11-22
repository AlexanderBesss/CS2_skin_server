import { exec, } from 'node:child_process';
import { spawn } from 'node:child_process';

/**
 * @param {String} process 
 * @param {String[]} commands 
 */
async function runCommand(processName, commands) {
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
            await runCommand('docker', [
                'compose',
                'up',
                '-f',
                '../steamcmd/linux/compose.yml'
            ]);
            break;
        case 'win32':
            await runCommand('cmd', [
                '/c',
                '../steamcmd/windows/update_cs2.bat'
            ]);
            break;

        default:
            console.log(OS, ' is unsupported OS!');
            break;
    }
}

await updateCS2();