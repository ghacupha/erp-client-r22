import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OutletTypeComponentsPage from './outlet-type.page-object';
import OutletTypeUpdatePage from './outlet-type-update.page-object';
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

describe('OutletType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let outletTypeComponentsPage: OutletTypeComponentsPage;
  let outletTypeUpdatePage: OutletTypeUpdatePage;
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
    outletTypeComponentsPage = new OutletTypeComponentsPage();
    outletTypeComponentsPage = await outletTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load OutletTypes', async () => {
    expect(await outletTypeComponentsPage.title.getText()).to.match(/Outlet Types/);
    expect(await outletTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete OutletTypes', async () => {
    const beforeRecordsCount = (await isVisible(outletTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(outletTypeComponentsPage.table);
    outletTypeUpdatePage = await outletTypeComponentsPage.goToCreateOutletType();
    await outletTypeUpdatePage.enterData();
    expect(await isVisible(outletTypeUpdatePage.saveButton)).to.be.false;

    expect(await outletTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(outletTypeComponentsPage.table);
    await waitUntilCount(outletTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await outletTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await outletTypeComponentsPage.deleteOutletType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(outletTypeComponentsPage.records, beforeRecordsCount);
      expect(await outletTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(outletTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
