var fs = require('fs');
const { exec } = require("node:child_process");
const { spawn } = require('node:child_process');
// export function startEmulator() {
//   console.log("starting emulator");
//   // const result = exec("cmd /c d:\\Tools\\Android\\sdk\\emulator\\emulator.exe -no-cache -no-snapshot -avd Pixel_3a");
//   const result = exec("d:\\Tools\\Android\\sdk\\emulator\\emulator.exe -avd Pixel_3a");
//   // const result = exec("echo 'test'");
//   console.log("result: " + result.stdout);
//   console.log("afte start emulator");
// }
// startEmulator();
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function startEmulator() {
    console.log("starting emulator");
    // const result = exec("cmd /c d:\\Tools\\Android\\sdk\\emulator\\emulator.exe -no-cache -no-snapshot -avd Pixel_3a");
    const cmd = "d:\\Tools\\Android\\sdk\\emulator\\emulator.exe";
    const out = fs.openSync('./out.log', 'a');
    const err = fs.openSync('./err.log', 'a');
    // const result = runMe(cmd, ['-avd', 'Pixel_3a'], {
    const result = spawn(cmd, ['-avd', 'Pixel_3a'], {
        // shell: true,
        stdio: ['ignore', out, err],
        detached: true
    }).unref();
}
async function waitForEmulator() {
    let output = "";
    while (output === "") {
        try {
            // const ls = spawn('cmd', ['/?']);
            // const ls = spawn('tasklist', ['/FI', 'ImageName eq qemu-system-x86_64.exe', '/FI', 'Status eq Running'], {
            // });
            await timeout(30000);
            console.log("waiting for command to runinng");
            const ls = spawn('tasklist /FI "ImageName eq qemu-system-x86_64.exe" /FI "Status eq Running" | findstr "qemu"', {
                shell: true
            });
            console.log("after starting command");
            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                output = data;
                if (output != "") {
                    console.log("process running");
                }
            });
            ls.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            ls.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
            // console.log("ls info: " + JSON.stringify(ls));
        }
        catch (error) {
            console.log("error: " + error);
        }
    }
}
startEmulator();
console.log("waiting now in second func");
await waitForEmulator();
console.log("found and its good :)");
// get pid of running emulator:
// for /f "tokens=2" %a in ('tasklist /FI "ImageName eq qemu-system-x86_64.exe" /FI "Status eq Running"') do echo %a
process.exit(0);
