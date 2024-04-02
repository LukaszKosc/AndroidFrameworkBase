import { AppState, sleep } from "../utils/commons.ts";
import assert from "assert";

const titleLocator = ""

abstract class Page {
  url: string;
  // async openApp() {
  //   const app = await driver.$("~Chrome");
  //   if (app) {
  //     // console.log("got app: " + JSON.stringify(app))
  //     await app.click();
  //   }
  //   console.log(await driver.getContext())
  //   const appId = await driver.getCurrentPackage();
  //   console.log("appId: " + appId)
  //   const appStatus = await driver.queryAppState('com.android.chrome');
  //   console.log("AppStatus: " + appStatus)
  //   assert.equal(appStatus, AppState.RUNNING_IN_FOREGROUND, "Application not running in foreground.")

  //   // driver.waitUntil(async () => {
  //   //   let found = false;
  //   //   let tryCount = 30;
  //   //   while (!found && tryCount) {
  //   //     found = await this.findWebView();
  //   //     await sleep(500);
  //   //     tryCount--;
  //   //   }
  //   // },
  //   //   {
  //   //     timeout: 30000,
  //   //     timeoutMsg: "not get in time for WebView context",
  //   //     interval: 500
  //   //   }
  //   // )
  // }

  constructor(url: string) {
    this.url = url;
  }
  async closeApp() {
    const appId = await driver.getCurrentPackage();
    await driver.terminateApp(appId)
    const appStatus = await driver.queryAppState('com.android.chrome');
    assert.equal(appStatus, AppState.NOT_RUNNING, "App still running!")
  }

  async findWebView() {
    return (await driver.getContexts()).find(x => {
      let xxx = x.toString().includes("WEBVIEW_chrome");
      console.log("option: " + x.toString())
      return xxx;
    }) ? true : false;
  }

  async openUrl() {
    await driver.navigateTo(this.url)
    await this.waitForUrlLoaded(this.url);
  }

  async waitForUrlLoaded(expectedUrl: string) {
    await driver.waitUntil(async () => {
      return (await driver.getUrl()) !== "";
    },
      {
        timeout: parseInt(process.env.TIMEOUT),
        timeoutMsg: "did not get title in time",
        interval: parseInt(process.env.INTERVAL)
      });
    assert.equal(await browser.getUrl(), expectedUrl, "Requested url was not loaded!");
  }

  async waitForTitle(expectedTitle: string) {
    await driver.waitUntil(async () => {
      return (await driver.getTitle()) !== "";
    },
      {
        timeout: parseInt(process.env.TIMEOUT),
        timeoutMsg: "did not get title in time",
        interval: parseInt(process.env.INTERVAL)
      });
    assert.equal(await browser.getTitle(), expectedTitle, "Requested title was not loaded!");
  }

  async waitUntilDisplayed(locator: string) {
    await driver.waitUntil(async () => {
      return (await $(locator)).isDisplayed();
    },
      {
        timeout: parseInt(process.env.TIMEOUT),
        timeoutMsg: "item was not displayed in time",
        interval: parseInt(process.env.INTERVAL)
      });
  }

  async waitUntilClicable(locator: string) {
    await driver.waitUntil(async () => {
      return (await $(locator)).isClickable();
    },
      {
        timeout: parseInt(process.env.TIMEOUT),
        timeoutMsg: "item was not clickable in time",
        interval: parseInt(process.env.INTERVAL)
      });
  }

  async click(locator: string) {
    const element = await $(locator);
    await driver.scroll((await element.getLocation()).x)
    await this.waitUntilClicable(locator);
    await element.click();
  }

  async getTitle() {
    return driver.getTitle();
  }

  async insertText(inputElementLocator: string, inputValue: string) {
    await this.waitUntilDisplayed(inputElementLocator);
    const inputElement = await $(inputElementLocator);
    await inputElement.clearValue();
    await inputElement.setValue(inputValue);
    // assert(await inputElement.getText(), inputValue);
  }
}

export default Page;