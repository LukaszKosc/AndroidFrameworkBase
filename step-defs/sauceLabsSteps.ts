import { DataTable, Given, Then, When } from "@wdio/cucumber-framework";
import SauceLabs from "../page-object-model/sauceLabsDemo.ts"
import assert from "assert";
const acceptAllLocator = "#L2AGLb";
const searchInputLocator = "textarea[name='q']";
import expectedData from "../utils/expectedData.ts";
import { pages } from "../utils/commons.ts";
const theInternet = new SauceLabs(expectedData["url"]);

Given(/^page is open$/, async () => {
  await theInternet.openUrl();
  await theInternet.waitForTitle('Swag Labs');
})

Then(/^login with following credentials$/, async (dataTable: DataTable) => {
  await theInternet.login(dataTable.raw()[0][0], dataTable.raw()[0][1]);
  // const expectedSection = "Products";
  // assert.equal(await theInternet.sectionIsPresent(expectedSection), expectedSection, `'${expectedSection} was not found in the page.`);
})

Then(/^'(.*)' page is shown$/, async (page: string) => {
  console.log("page: " + page)
  await theInternet.waitForTitle(pages[page.toLowerCase()].title);
  assert.equal(await theInternet.sectionIsPresent(page), page, `'${page} was not found in the page.`);
  // await theInternet.click(await driver.$(acceptAllLocator));
  // const searchField = await $(searchInputLocator);
  // await theInternet.waitUntilDisplayed(searchInputLocator);
  // assert(await searchField.isDisplayed(), "page is not open without cookies question")
  // const expected = 'The Internet';
  // assert(await theInternet.getTitle() === expected)
})