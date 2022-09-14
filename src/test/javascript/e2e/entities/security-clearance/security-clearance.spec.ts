import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SecurityClearanceComponentsPage from './security-clearance.page-object';
import SecurityClearanceUpdatePage from './security-clearance-update.page-object';
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

describe('SecurityClearance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let securityClearanceComponentsPage: SecurityClearanceComponentsPage;
  let securityClearanceUpdatePage: SecurityClearanceUpdatePage;
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
    securityClearanceComponentsPage = new SecurityClearanceComponentsPage();
    securityClearanceComponentsPage = await securityClearanceComponentsPage.goToPage(navBarPage);
  });

  it('should load SecurityClearances', async () => {
    expect(await securityClearanceComponentsPage.title.getText()).to.match(/Security Clearances/);
    expect(await securityClearanceComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SecurityClearances', async () => {
    const beforeRecordsCount = (await isVisible(securityClearanceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(securityClearanceComponentsPage.table);
    securityClearanceUpdatePage = await securityClearanceComponentsPage.goToCreateSecurityClearance();
    await securityClearanceUpdatePage.enterData();
    expect(await isVisible(securityClearanceUpdatePage.saveButton)).to.be.false;

    expect(await securityClearanceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(securityClearanceComponentsPage.table);
    await waitUntilCount(securityClearanceComponentsPage.records, beforeRecordsCount + 1);
    expect(await securityClearanceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await securityClearanceComponentsPage.deleteSecurityClearance();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(securityClearanceComponentsPage.records, beforeRecordsCount);
      expect(await securityClearanceComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(securityClearanceComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
