import { sleep } from "../utils/commons.ts";
import ExpectedData from "../utils/expectedData.ts";
import Page from "./page.ts";
const titleLocator = "title";
const usernameFieldLocator = "#user-name";
const passwordFieldLocator = "#password";
const loginButtonLocator = "#login-button";
const sectionTitles = { "products": ".title", "productdetails": "#back-to-products" };

class SauceLabs extends Page {
  constructor(url: string) {
    super(url);
  }

  async skipCookies() {
    const cookiesLocator = "[id='onetrust-accept-btn-handler']";
    await this.waitUntilDisplayed(cookiesLocator);
    await (await $(cookiesLocator)).click();
  }
  async login(username: string, password: string) {
    await this.insertText(usernameFieldLocator, username);
    await this.insertText(passwordFieldLocator, password);
    await this.click(loginButtonLocator);
  }

  async sectionIsPresent(expectedSectionTitle: string) {
    const section = await $(sectionTitles[expectedSectionTitle.toLowerCase()]);
    return section.getText()
  }
}

export default SauceLabs;