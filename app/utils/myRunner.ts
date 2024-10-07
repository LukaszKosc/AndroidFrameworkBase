import Runner from "@wdio/runner";

export default class MyRunner extends Runner {

  async run({ cid, args, specs, caps, configFile, retries }): Promise<number> {
    console.log("some addon");
    return super.run({ cid, args, specs, caps, configFile, retries });
  }
  // async #initFramework(cid, config, capabilities, reporter, specs) {
  //     const runner = Array.isArray(config.runner) ? config.runner[0] : config.runner;
  //     /**
  //      * initialize framework adapter when running remote browser tests
  //      */
  //     if (runner === 'local') {
  //         const framework = (await initializePlugin(config.framework, 'framework')).default;
  //         return framework.init(cid, config, specs, capabilities, reporter);
  //     }
  //     /**
  //      * for embedded browser tests the `@wdio/browser-runner` already has the environment
  //      * setup so we can just run through the tests
  //      */
  //     if (runner === 'browser') {
  //         return BrowserFramework.init(cid, config, specs, capabilities, reporter);
  //     }
  //     throw new Error(`Unknown runner "${runner}"`);
  // }
  /**
   * init protocol session
   * @param  {object}  config        configuration of sessions
   * @param  {Object}  caps          desired capabilities of session
   * @param  {Object}  browserStub   stubbed `browser` object with only capabilities, config and env flags
   * @return {Promise}               resolves with browser object or null if session couldn't get established
   */
  // async _initSession(config, caps) {
  //     const browser = await this._startSession(config, caps);
  //     // return null if session couldn't get established
  //     if (!browser) {
  //         return;
  //     }
  //     /**
  //      * register global helper method to fetch elements
  //      */
  //     _setGlobal('$', (selector) => browser.$(selector), config.injectGlobals);
  //     _setGlobal('$$', (selector) => browser.$$(selector), config.injectGlobals);
  //     /**
  //      * register command event
  //      */
  //     browser.on('command', (command) => this._reporter?.emit('client:beforeCommand', Object.assign(command, { sessionId: browser.sessionId })));
  //     /**
  //      * register result event
  //      */
  //     browser.on('result', (result) => this._reporter?.emit('client:afterCommand', Object.assign(result, { sessionId: browser.sessionId })));
  //     return browser;
  // }
  /**
   * start protocol session
   * @param  {object}  config        configuration of sessions
   * @param  {Object}  caps          desired capabilities of session
   * @return {Promise}               resolves with browser object or null if session couldn't get established
   */
  // async _startSession(config, caps) {
  //     try {
  //         /**
  //          * get all custom or overwritten commands users tried to register before the
  //          * test started, e.g. after all imports
  //          */
  //         const customStubCommands = this._browser?.customCommands || [];
  //         const overwrittenCommands = this._browser?.overwrittenCommands || [];
  //         this._browser = await initializeInstance(config, caps, this._isMultiremote);
  //         _setGlobal('browser', this._browser, config.injectGlobals);
  //         _setGlobal('driver', this._browser, config.injectGlobals);
  //         /**
  //          * for Jasmine we extend the Jasmine matchers instead of injecting the assertion
  //          * library ourselves
  //          */
  //         if (config.framework !== 'jasmine') {
  //             _setGlobal('expect', expect, config.injectGlobals);
  //         }
  //         /**
  //          * re-assign previously registered custom commands to the actual instance
  //          */
  //         for (const params of customStubCommands) {
  //             this._browser.addCommand(...params);
  //         }
  //         for (const params of overwrittenCommands) {
  //             this._browser.overwriteCommand(...params);
  //         }
  //         /**
  //          * import and set options for `expect-webdriverio` assertion lib once
  //          * the browser was initiated
  //          */
  //         setOptions({
  //             wait: config.waitforTimeout, // ms to wait for expectation to succeed
  //             interval: config.waitforInterval, // interval between attempts
  //             beforeAssertion: async (params) => {
  //                 await Promise.all([
  //                     this._reporter?.emit('client:beforeAssertion', { ...params, sessionId: this._browser?.sessionId }),
  //                     executeHooksWithArgs('beforeAssertion', config.beforeAssertion, [params])
  //                 ]);
  //             },
  //             afterAssertion: async (params) => {
  //                 await Promise.all([
  //                     this._reporter?.emit('client:afterAssertion', { ...params, sessionId: this._browser?.sessionId }),
  //                     executeHooksWithArgs('afterAssertion', config.afterAssertion, [params])
  //                 ]);
  //             }
  //         });
  //         /**
  //          * attach browser to `multiremotebrowser` so user have better typing support
  //          */
  //         if (this._isMultiremote) {
  //             _setGlobal('multiremotebrowser', this._browser, config.injectGlobals);
  //         }
  //     }
  //     catch (err) {
  //         log.error(err);
  //         return;
  //     }
  //     return this._browser;
  // }
  /**
   * fetch logs provided by browser driver
   */
  // async _fetchDriverLogs(config, excludeDriverLogs) {
  //     /**
  //      * only fetch logs if
  //      */
  //     if (
  //     /**
  //      * a log directory is given in config
  //      */
  //     !config.outputDir ||
  //         /**
  //          * the session wasn't killed during start up phase
  //          */
  //         !this._browser?.sessionId ||
  //         /**
  //          * driver supports it
  //          */
  //         typeof this._browser?.getLogs === 'undefined') {
  //         return;
  //     }
  //     let logTypes;
  //     try {
  //         logTypes = await this._browser.getLogTypes();
  //     }
  //     catch (errIgnored) {
  //         /**
  //          * getLogTypes is not supported by browser
  //          */
  //         return;
  //     }
  //     logTypes = filterLogTypes(excludeDriverLogs, logTypes);
  //     log.debug(`Fetching logs for ${logTypes.join(', ')}`);
  //     return Promise.all(logTypes.map(async (logType) => {
  //         let logs;
  //         try {
  //             logs = await this._browser?.getLogs(logType);
  //         }
  //         catch (e) {
  //             return log.warn(`Couldn't fetch logs for ${logType}: ${e.message}`);
  //         }
  //         /**
  //          * don't write to file if no logs were captured
  //          */
  //         if (!Array.isArray(logs) || logs.length === 0) {
  //             return;
  //         }
  //         const stringLogs = logs.map((log) => JSON.stringify(log)).join('\n');
  //         return fs.writeFile(path.join(config.outputDir, `wdio-${this._cid}-${logType}.log`), stringLogs, 'utf-8');
  //     }));
  // }
  /**
   * kill worker session
   */
  // async _shutdown(failures, retries, initiationFailed = false) {
  //     super._shutdown(failures, retries, initiationFailed = false);
  // }
  /**
   * end WebDriver session, a config object can be applied if object has changed
   * within a hook by the user
   */
  async endSession(payload) {
    super.endSession(payload);
  }

}