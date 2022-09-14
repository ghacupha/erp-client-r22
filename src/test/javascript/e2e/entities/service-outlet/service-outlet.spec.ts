import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ServiceOutletComponentsPage from './service-outlet.page-object';
import ServiceOutletUpdatePage from './service-outlet-update.page-object';
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

describe('ServiceOutlet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceOutletComponentsPage: ServiceOutletComponentsPage;
  let serviceOutletUpdatePage: ServiceOutletUpdatePage;
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
    serviceOutletComponentsPage = new ServiceOutletComponentsPage();
    serviceOutletComponentsPage = await serviceOutletComponentsPage.goToPage(navBarPage);
  });

  it('should load ServiceOutlets', async () => {
    expect(await serviceOutletComponentsPage.title.getText()).to.match(/Service Outlets/);
    expect(await serviceOutletComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ServiceOutlets', async () => {
    const beforeRecordsCount = (await isVisible(serviceOutletComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(serviceOutletComponentsPage.table);
    serviceOutletUpdatePage = await serviceOutletComponentsPage.goToCreateServiceOutlet();
    await serviceOutletUpdatePage.enterData();
    expect(await isVisible(serviceOutletUpdatePage.saveButton)).to.be.false;

    expect(await serviceOutletComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(serviceOutletComponentsPage.table);
    await waitUntilCount(serviceOutletComponentsPage.records, beforeRecordsCount + 1);
    expect(await serviceOutletComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await serviceOutletComponentsPage.deleteServiceOutlet();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(serviceOutletComponentsPage.records, beforeRecordsCount);
      expect(await serviceOutletComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(serviceOutletComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
