import { spawnSync } from 'node:child_process';

export const pages = {
  'products': {
    'title': 'Swag Labs',
    'section': 'Products'
  },
  'productdetail': {
    'title': 'Swag Labs',
    'section': 'ProductDetails'
  }
}
export enum AppState {
  UNDETERMINED_STATE = 0,
  NOT_RUNNING = 1,
  RUNNING_IN_BACKGROUND_SUSPENDED = 2,
  RUNNING_IN_FOREGROUND_NOT_SUSPENDED = 3,
  RUNNING_IN_FOREGROUND = 4
}
export async function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
let emulator = null;
export async function startAndroid() {
  emulator = spawn('emulator', ['-avd', 'Pixel_3a']);
  emulator.stdout.on('data', (data) => console.log(`stdout: ${data}`));
  emulator.stderr.on('data', (data) => console.log(`stderr: ${data}`));
  emulator.on('close', (code) => console.log(`child process exited with code ${code}`));
  emulator.send("")
}

export function loadExpectedData() {

}

export async function killAppium() {
  const ls = spawnSync('taskkill /F /FI "ImageName eq appium.e"', {
    shell: true
  });
  const stdout = ls.stdout.toString()
  if (stdout.includes("SUCCESS: The process with PID ") && stdout.includes(" has been terminated.")) {
    console.log("killed appium")
  }
}