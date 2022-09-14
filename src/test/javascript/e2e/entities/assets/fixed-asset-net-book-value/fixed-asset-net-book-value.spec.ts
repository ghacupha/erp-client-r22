import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import FixedAssetNetBookValueComponentsPage from './fixed-asset-net-book-value.page-object';
import FixedAssetNetBookValueUpdatePage from './fixed-asset-net-book-value-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../../util/utils';

const expect = chai.expect;

describe('FixedAssetNetBookValue e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fixedAssetNetBookValueComponentsPage: FixedAssetNetBookValueComponentsPage;
  let fixedAssetNetBookValueUpdatePage: FixedAssetNetBookValueUpdatePage;
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
    fixedAssetNetBookValueComponentsPage = new FixedAssetNetBookValueComponentsPage();
    fixedAssetNetBookValueComponentsPage = await fixedAssetNetBookValueComponentsPage.goToPage(navBarPage);
  });

  it('should load FixedAssetNetBookValues', async () => {
    expect(await fixedAssetNetBookValueComponentsPage.title.getText()).to.match(/Fixed Asset Net Book Values/);
    expect(await fixedAssetNetBookValueComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FixedAssetNetBookValues', async () => {
    const beforeRecordsCount = (await isVisible(fixedAssetNetBookValueComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fixedAssetNetBookValueComponentsPage.table);
    fixedAssetNetBookValueUpdatePage = await fixedAssetNetBookValueComponentsPage.goToCreateFixedAssetNetBookValue();
    await fixedAssetNetBookValueUpdatePage.enterData();
    expect(await isVisible(fixedAssetNetBookValueUpdatePage.saveButton)).to.be.false;

    expect(await fixedAssetNetBookValueComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fixedAssetNetBookValueComponentsPage.table);
    await waitUntilCount(fixedAssetNetBookValueComponentsPage.records, beforeRecordsCount + 1);
    expect(await fixedAssetNetBookValueComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fixedAssetNetBookValueComponentsPage.deleteFixedAssetNetBookValue();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fixedAssetNetBookValueComponentsPage.records, beforeRecordsCount);
      expect(await fixedAssetNetBookValueComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fixedAssetNetBookValueComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
