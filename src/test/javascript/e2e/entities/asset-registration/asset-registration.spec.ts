import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AssetRegistrationComponentsPage from './asset-registration.page-object';
import AssetRegistrationUpdatePage from './asset-registration-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('AssetRegistration e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assetRegistrationComponentsPage: AssetRegistrationComponentsPage;
  let assetRegistrationUpdatePage: AssetRegistrationUpdatePage;
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
    assetRegistrationComponentsPage = new AssetRegistrationComponentsPage();
    assetRegistrationComponentsPage = await assetRegistrationComponentsPage.goToPage(navBarPage);
  });

  it('should load AssetRegistrations', async () => {
    expect(await assetRegistrationComponentsPage.title.getText()).to.match(/Asset Registrations/);
    expect(await assetRegistrationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete AssetRegistrations', async () => {
        const beforeRecordsCount = await isVisible(assetRegistrationComponentsPage.noRecords) ? 0 : await getRecordsCount(assetRegistrationComponentsPage.table);
        assetRegistrationUpdatePage = await assetRegistrationComponentsPage.goToCreateAssetRegistration();
        await assetRegistrationUpdatePage.enterData();
        expect(await isVisible(assetRegistrationUpdatePage.saveButton)).to.be.false;

        expect(await assetRegistrationComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(assetRegistrationComponentsPage.table);
        await waitUntilCount(assetRegistrationComponentsPage.records, beforeRecordsCount + 1);
        expect(await assetRegistrationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await assetRegistrationComponentsPage.deleteAssetRegistration();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(assetRegistrationComponentsPage.records, beforeRecordsCount);
          expect(await assetRegistrationComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(assetRegistrationComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
