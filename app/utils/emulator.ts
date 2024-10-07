import fs from 'fs';
import { spawn, spawnSync } from "node:child_process";
// import { spawn } from "node:child_process";
// var spawnSync = require("node:child_process").spawnSync;


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let emulatorPid: number = -1;
const controller = new AbortController();
const { signal } = controller;

export async function startEmulator() {
  console.log("starting emulator");
  // const result = exec("cmd /c d:\\Tools\\Android\\sdk\\emulator\\emulator.exe -no-cache -no-snapshot -avd Pixel_3a");
  const cmd = "d:\\Tools\\Android\\sdk\\emulator\\emulator.exe";
  const out = fs.openSync('./out.log', 'a');
  const err = fs.openSync('./err.log', 'a');
  // const result = spawn(cmd, ['-delay-adb', '-avd', 'Pixel_3a'], {
  const result = spawn(cmd, ['-no-boot-anim', '-no-snapshot', '-nocache', '-avd', 'Pixel_3a'], {
    // shell: true,
    signal,
    stdio: ['ignore', out, err],
    detached: true
  }); //.unref();
  emulatorPid = result.pid;
  result.on('exit', (code) => {
    console.log(`Child process with pid ${result.pid} exited with code ${code}`);
  });
  await waitForEmulator();
}

async function waitForEmulator() {
  let emulatorReady = false
  const startTime = new Date();
  const timeout = 60;
  let diff = 0;
  while (!emulatorReady && diff < timeout) {
    try {
      await delay(500);
      const ls = spawnSync('d:\\Tools\\Android\\sdk\\platform-tools\\adb.exe shell dumpsys activity activities | findstr "mCurrentFocus=Window" | findstr "com.google.android.apps.nexuslauncher/com.google.android.apps.nexuslauncher.NexusLauncherActivity"', {
        shell: true,
        timeout: 2000
      })

      const stdout = ls.stdout.toString()
      if (stdout.includes("mCurrentFocus=Window{") && stdout.includes(" u0 com.google.android.apps.nexuslauncher/com.google.android.apps.nexuslauncher.NexusLauncherActivity}")) {
        emulatorReady = true;
        console.log("emulator started")
      }
    }
    catch (error) {
      console.log("error: " + error)
    }
    var endTime = new Date();
    diff = (endTime.getTime() - startTime.getTime()) / 1000;
  }
}

export async function stopEmulator() {
  let emulatorStopped = false
  console.log("stopping emulator");
  while (!emulatorStopped) {
    try {
      if (emulatorPid < 0) throw new Error("Emulator was not started. Cannot stop it.");
      const ls = spawnSync(`taskkill /PID ${emulatorPid} /F`, {
        shell: true
      });
      const stdout = ls.stdout.toString()
      if (stdout.includes("SUCCESS: The process with PID ") && stdout.includes(" has been terminated.")) {
        console.log("killed emulator.exe")
        await delay(1000)
        const ls2 = spawnSync('taskkill /F /FI "ImageName eq qemu-system-x86_64.exe"', {
          shell: true
        });
        const stdout2 = ls2.stdout.toString()
        if (stdout.includes("SUCCESS: The process with PID ") && stdout.includes(" has been terminated.")) {
          emulatorStopped = true;
          console.log("killed qemu")
        }
      }

    }
    catch (error) {
      console.log("error: " + error)
    }
  }

  // while (!emulatorStopped) {
  //   try {
  //     // console.log("controller: " + JSON.stringify(controller))
  //     // controller.abort();
  //     // emulatorStopped = true;

  //     const ls = spawnSync('taskkill /F /FI "ImageName eq qemu-system-x86_64.exe"', {
  //       shell: true
  //     });
  //     const stdout = ls.stdout.toString()
  //     if (stdout.includes("SUCCESS: The process with PID ") && stdout.includes(" has been terminated.")) {
  //       emulatorStopped = true;
  //     }
  //   }
  //   catch (error) {
  //     console.log("error: " + error)
  //   }
  // }
  return emulatorStopped;
}
export async function stopAdb() {
  console.log("stopping adb1");
  try {
    if (emulatorPid < 0) throw new Error("Emulator was not started. Cannot stop it.");
    const ls = spawnSync(`taskkill /F /IM adb.exe`, {
      shell: true,
      timeout: 2000
    });
    const stdout = ls.stdout.toString()
    if (stdout.includes("SUCCESS: The process \"adb.exe\" with PID ") && stdout.includes(" has been terminated.")) {
      console.log("killed adb.exe")
      await delay(1000)
    }

  }
  catch (error) {
    console.log("error: " + error)
  }
}

export async function stopEmu() {
  console.log("stopping adb here");
  try {
    const ls = spawnSync(`D:\\Tools\\nodejs\\node.exe D:\\Projects\\TypeScript\\FrameworkBase\\utils\\adbHelper.cjs`, {
      shell: true,
      timeout: 15000
    });
    const stdout = ls.stdout.toString()
    if (stdout.includes("Successfully killed the 'Pixel_3a' emulator")) {
      console.log("killed adb.exe")
      await delay(100)
    }

  }
  catch (error) {
    console.log("error: " + error)
  }
}

// startEmulator();

// const stoppedEmulator = stopEmulator();
// if (stoppedEmulator) {
//   console.log("Successfully stopped android emulator.")
// }
// process.exit(0)

