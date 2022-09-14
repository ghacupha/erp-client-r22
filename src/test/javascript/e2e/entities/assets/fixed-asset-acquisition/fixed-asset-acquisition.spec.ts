import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import FixedAssetAcquisitionComponentsPage from './fixed-asset-acquisition.page-object';
import FixedAssetAcquisitionUpdatePage from './fixed-asset-acquisition-update.page-object';
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

describe('FixedAssetAcquisition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fixedAssetAcquisitionComponentsPage: FixedAssetAcquisitionComponentsPage;
  let fixedAssetAcquisitionUpdatePage: FixedAssetAcquisitionUpdatePage;
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
    fixedAssetAcquisitionComponentsPage = new FixedAssetAcquisitionComponentsPage();
    fixedAssetAcquisitionComponentsPage = await fixedAssetAcquisitionComponentsPage.goToPage(navBarPage);
  });

  it('should load FixedAssetAcquisitions', async () => {
    expect(await fixedAssetAcquisitionComponentsPage.title.getText()).to.match(/Fixed Asset Acquisitions/);
    expect(await fixedAssetAcquisitionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FixedAssetAcquisitions', async () => {
    const beforeRecordsCount = (await isVisible(fixedAssetAcquisitionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fixedAssetAcquisitionComponentsPage.table);
    fixedAssetAcquisitionUpdatePage = await fixedAssetAcquisitionComponentsPage.goToCreateFixedAssetAcquisition();
    await fixedAssetAcquisitionUpdatePage.enterData();
    expect(await isVisible(fixedAssetAcquisitionUpdatePage.saveButton)).to.be.false;

    expect(await fixedAssetAcquisitionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fixedAssetAcquisitionComponentsPage.table);
    await waitUntilCount(fixedAssetAcquisitionComponentsPage.records, beforeRecordsCount + 1);
    expect(await fixedAssetAcquisitionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fixedAssetAcquisitionComponentsPage.deleteFixedAssetAcquisition();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fixedAssetAcquisitionComponentsPage.records, beforeRecordsCount);
      expect(await fixedAssetAcquisitionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fixedAssetAcquisitionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
