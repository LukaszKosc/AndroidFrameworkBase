export default class CustomLauncherService {

  async funonPrepare: function (config, capabilities) { }
  async onWorkerStart: function (cid, caps, specs, args, execArgv) { }
  async onWorkerEnd: function (cid, exitCode, specs, retries) { }
  async beforeSession: function (config, capabilities, specs) { }
  async before: function (capabilities, specs, browser) { }
  async beforeSuite: function (suite) { }
  async beforeHook: function (test, context, hookName) { }
async afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) { }
async beforeTest: function (test, context) { }
async beforeCommand: function (commandName, args) { }
async afterCommand: function (commandName, args, result, error) { }
async afterTest: function (test, context, { error, result, duration, passed, retries }) { }
async afterSuite: function (suite) { }
async after: function (result, capabilities, specs) { }
async afterSession: function (config, capabilities, specs) { }
async onComplete: function (exitCode, config, capabilities, results) { }
async onReload: function(oldSessionId, newSessionId) { }
async beforeFeature: function (uri, feature) { }
async beforeScenario: function (world, context) { }
async beforeStep: function (step, scenario, context) { }
async afterStep: function (step, scenario, result, context) { }
async afterScenario: function (world, result, context) { }
async afterFeature: function (uri, feature) { }
async beforeAssertion: function (params) { }
async afterAssertion: function (params) {
}
}