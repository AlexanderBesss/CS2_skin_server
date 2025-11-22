import { spawn } from 'node:child_process';

/**
 * @param {String} process 
 * @param {String[]} commands 
 */
export async function runCommands(commands, processName) {
    const processes = {
        linux: 'bash',
        win32: 'cmd'
    }
    if (!processName) {
        const OS = process.platform;
        if (!processes[OS]) {
            throw new Error(`Unsupported OS: ${OS}`);
        }
        processName = processes[OS];
    }
    const child = spawn(processName, commands);

    for await (const chunk of child.stdout) {
        console.log('[OUT]', chunk.toString());
    }

    for await (const chunk of child.stderr) {
        console.log('[ERR]', chunk.toString());
    }

    console.log('Command exited with:', child.exitCode);
}
