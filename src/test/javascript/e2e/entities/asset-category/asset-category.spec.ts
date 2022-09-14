import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AssetCategoryComponentsPage from './asset-category.page-object';
import AssetCategoryUpdatePage from './asset-category-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('AssetCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assetCategoryComponentsPage: AssetCategoryComponentsPage;
  let assetCategoryUpdatePage: AssetCategoryUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    assetCategoryComponentsPage = new AssetCategoryComponentsPage();
    assetCategoryComponentsPage = await assetCategoryComponentsPage.goToPage(navBarPage);
  });

  it('should load AssetCategories', async () => {
    expect(await assetCategoryComponentsPage.title.getText()).to.match(/Asset Categories/);
    expect(await assetCategoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete AssetCategories', async () => {
        const beforeRecordsCount = await isVisible(assetCategoryComponentsPage.noRecords) ? 0 : await getRecordsCount(assetCategoryComponentsPage.table);
        assetCategoryUpdatePage = await assetCategoryComponentsPage.goToCreateAssetCategory();
        await assetCategoryUpdatePage.enterData();
        expect(await isVisible(assetCategoryUpdatePage.saveButton)).to.be.false;

        expect(await assetCategoryComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(assetCategoryComponentsPage.table);
        await waitUntilCount(assetCategoryComponentsPage.records, beforeRecordsCount + 1);
        expect(await assetCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await assetCategoryComponentsPage.deleteAssetCategory();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(assetCategoryComponentsPage.records, beforeRecordsCount);
          expect(await assetCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(assetCategoryComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
