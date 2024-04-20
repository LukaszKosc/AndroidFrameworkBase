// // import { Launcher } from "@wdio/cli";
// var Launcher = require('webdriverio').Launcher;
// import { config } from "./myconfig";
// const opts = config;
// const wdio = new Launcher("./wdio.conf.ts", opts);
// wdio.run().then(function (code) {
//   process.exit(code);
// }, function (error) {
//   console.error('Launcher failed to start the test', error.stacktrace);
//   process.exit(1);
// });

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


// const Launcher = require("./node_modules/@wdio/cli/build/launcher.js");

// perfectly working code! Keep it!
//command
// node --loader ts-node/esm launcher.cjs
// const Launcher = require('@wdio/cli').Launcher

// console.log("test print")
// const lancher = new Launcher('wdio.conf.ts', {})
// console.log("lancher: " + JSON.stringify(lancher))
// lancher.run()
// console.log("test print")
// perfectly working code! Keep it!

async function runTests() {
  const Launcher = require('@wdio/cli').Launcher
  let exitCode = null;
  console.log("test print")
  const ccOpts = {
    cucumberOpts: {
      dryRun: true,
    }
  }
  const lancher = new Launcher('wdio.conf.ts', ccOpts)
  console.log("lancher: " + JSON.stringify(lancher))
  await lancher.run().then(function (code) {
    console.log("running code of tests!");
    exitCode = code;
    process.exit(code);
  }, function (error) {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
    exitCode = 1;
  });
  // console.log("test print")
  // process.exit(code);
}

runTests();