import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
  /**
   * `serviceOptions` contains all options specific to the service
   * e.g. if defined as follows:
   *
   * ```
   * services: [['custom', { foo: 'bar' }]]
   * ```
   *
   * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
   */
  constructor(
    private _options: Options,
    private _capabilities: Capabilities.RemoteCapability,
    private _config: Omit<Options.Testrunner, 'capabilities'>
  ) {
    this.options = serviceOptions
  }

  /**
   * this browser object is passed in here for the first time
   */
  async before(config, capabilities, browser) {
    this.browser = browser

    // TODO: something before all tests are run, e.g.:
    await this.browser.setWindowSize(1024, 768)
  }

  after(exitCode, config, capabilities) {
    // TODO: something after all tests are run
  }

  beforeTest(test, context) {
    // TODO: something before each Mocha/Jasmine test run
  }

  beforeScenario(test, context) {
    // TODO: something before each Cucumber scenario run
  }

  // other hooks or custom service methods ...
}