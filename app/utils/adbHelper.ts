import ADB from 'appium-adb';

export async function getEmulator() {
  const adb = await ADB.createADB();
  console.log("PID of device: " + await adb.getPIDsByName('com.android.phone'));
  console.log("is device connected: " + await adb.isDeviceConnected());
  await adb.killEmulator('Pixel_3a');
  // adb.reboot();
}

getEmulator();