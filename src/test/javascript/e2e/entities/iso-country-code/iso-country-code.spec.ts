import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IsoCountryCodeComponentsPage from './iso-country-code.page-object';
import IsoCountryCodeUpdatePage from './iso-country-code-update.page-object';
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

describe('IsoCountryCode e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let isoCountryCodeComponentsPage: IsoCountryCodeComponentsPage;
  let isoCountryCodeUpdatePage: IsoCountryCodeUpdatePage;
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
    isoCountryCodeComponentsPage = new IsoCountryCodeComponentsPage();
    isoCountryCodeComponentsPage = await isoCountryCodeComponentsPage.goToPage(navBarPage);
  });

  it('should load IsoCountryCodes', async () => {
    expect(await isoCountryCodeComponentsPage.title.getText()).to.match(/Iso Country Codes/);
    expect(await isoCountryCodeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete IsoCountryCodes', async () => {
    const beforeRecordsCount = (await isVisible(isoCountryCodeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(isoCountryCodeComponentsPage.table);
    isoCountryCodeUpdatePage = await isoCountryCodeComponentsPage.goToCreateIsoCountryCode();
    await isoCountryCodeUpdatePage.enterData();
    expect(await isVisible(isoCountryCodeUpdatePage.saveButton)).to.be.false;

    expect(await isoCountryCodeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(isoCountryCodeComponentsPage.table);
    await waitUntilCount(isoCountryCodeComponentsPage.records, beforeRecordsCount + 1);
    expect(await isoCountryCodeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await isoCountryCodeComponentsPage.deleteIsoCountryCode();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(isoCountryCodeComponentsPage.records, beforeRecordsCount);
      expect(await isoCountryCodeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(isoCountryCodeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
