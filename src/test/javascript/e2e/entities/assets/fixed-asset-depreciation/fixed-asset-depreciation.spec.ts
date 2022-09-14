import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import FixedAssetDepreciationComponentsPage from './fixed-asset-depreciation.page-object';
import FixedAssetDepreciationUpdatePage from './fixed-asset-depreciation-update.page-object';
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

describe('FixedAssetDepreciation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fixedAssetDepreciationComponentsPage: FixedAssetDepreciationComponentsPage;
  let fixedAssetDepreciationUpdatePage: FixedAssetDepreciationUpdatePage;
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
    fixedAssetDepreciationComponentsPage = new FixedAssetDepreciationComponentsPage();
    fixedAssetDepreciationComponentsPage = await fixedAssetDepreciationComponentsPage.goToPage(navBarPage);
  });

  it('should load FixedAssetDepreciations', async () => {
    expect(await fixedAssetDepreciationComponentsPage.title.getText()).to.match(/Fixed Asset Depreciations/);
    expect(await fixedAssetDepreciationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FixedAssetDepreciations', async () => {
    const beforeRecordsCount = (await isVisible(fixedAssetDepreciationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fixedAssetDepreciationComponentsPage.table);
    fixedAssetDepreciationUpdatePage = await fixedAssetDepreciationComponentsPage.goToCreateFixedAssetDepreciation();
    await fixedAssetDepreciationUpdatePage.enterData();
    expect(await isVisible(fixedAssetDepreciationUpdatePage.saveButton)).to.be.false;

    expect(await fixedAssetDepreciationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fixedAssetDepreciationComponentsPage.table);
    await waitUntilCount(fixedAssetDepreciationComponentsPage.records, beforeRecordsCount + 1);
    expect(await fixedAssetDepreciationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fixedAssetDepreciationComponentsPage.deleteFixedAssetDepreciation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fixedAssetDepreciationComponentsPage.records, beforeRecordsCount);
      expect(await fixedAssetDepreciationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fixedAssetDepreciationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
