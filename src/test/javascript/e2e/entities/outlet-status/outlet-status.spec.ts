import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OutletStatusComponentsPage from './outlet-status.page-object';
import OutletStatusUpdatePage from './outlet-status-update.page-object';
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

describe('OutletStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let outletStatusComponentsPage: OutletStatusComponentsPage;
  let outletStatusUpdatePage: OutletStatusUpdatePage;
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
    outletStatusComponentsPage = new OutletStatusComponentsPage();
    outletStatusComponentsPage = await outletStatusComponentsPage.goToPage(navBarPage);
  });

  it('should load OutletStatuses', async () => {
    expect(await outletStatusComponentsPage.title.getText()).to.match(/Outlet Statuses/);
    expect(await outletStatusComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete OutletStatuses', async () => {
    const beforeRecordsCount = (await isVisible(outletStatusComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(outletStatusComponentsPage.table);
    outletStatusUpdatePage = await outletStatusComponentsPage.goToCreateOutletStatus();
    await outletStatusUpdatePage.enterData();
    expect(await isVisible(outletStatusUpdatePage.saveButton)).to.be.false;

    expect(await outletStatusComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(outletStatusComponentsPage.table);
    await waitUntilCount(outletStatusComponentsPage.records, beforeRecordsCount + 1);
    expect(await outletStatusComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await outletStatusComponentsPage.deleteOutletStatus();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(outletStatusComponentsPage.records, beforeRecordsCount);
      expect(await outletStatusComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(outletStatusComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
