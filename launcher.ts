// import { Launcher } from "@wdio/cli";
var Launcher = require('webdriverio').Launcher;
import { config } from "./myconfig";
const opts = config;
const wdio = new Launcher("./wdio.conf.ts", opts);
wdio.run().then(function (code) {
  process.exit(code);
}, function (error) {
  console.error('Launcher failed to start the test', error.stacktrace);
  process.exit(1);
});

// working code - just requires wdio.conf.js
// and file needs to be saved as test.cjs
// const Launcher = require('@wdio/cli').Launcher

// console.log("test print")
// const lancher = new Launcher('wdio.conf.js', {
//   reporters: [
//     'spec',
//     // ['jasmine', {
//     //   outputDir: './Results',
//     //   outputFileFormat: function (opts) { // not worked
//     //     return `results-${opts.cid}.${opts.capabilities}.json`
//     //   }
//     // }]
// ]
// })
// console.log("lancher: " + JSON.stringify(lancher))
// lancher.run()
// console.log("test print")