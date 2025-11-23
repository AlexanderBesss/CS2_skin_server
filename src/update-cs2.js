import { spawn } from 'node:child_process';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @param {String} process
 * @param {String[]} commands
 */
export async function runCommands(processName, commands, options) {
    const child = spawn(processName, commands, options);

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
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const steamcmdDir = path.join(__dirname, '..', 'steamcmd', 'windows');
            await runCommands('cmd', [
                '/c',
                'update_cs2.bat'
            ], {
                cwd: steamcmdDir,
            });
            break;

        default:
            console.log(OS, ' is unsupported OS!');
            break;
    }
}

await updateCS2();