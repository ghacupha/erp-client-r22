import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SettlementCurrencyComponentsPage from './settlement-currency.page-object';
import SettlementCurrencyUpdatePage from './settlement-currency-update.page-object';
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

describe('SettlementCurrency e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let settlementCurrencyComponentsPage: SettlementCurrencyComponentsPage;
  let settlementCurrencyUpdatePage: SettlementCurrencyUpdatePage;
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
    settlementCurrencyComponentsPage = new SettlementCurrencyComponentsPage();
    settlementCurrencyComponentsPage = await settlementCurrencyComponentsPage.goToPage(navBarPage);
  });

  it('should load SettlementCurrencies', async () => {
    expect(await settlementCurrencyComponentsPage.title.getText()).to.match(/Settlement Currencies/);
    expect(await settlementCurrencyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SettlementCurrencies', async () => {
    const beforeRecordsCount = (await isVisible(settlementCurrencyComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(settlementCurrencyComponentsPage.table);
    settlementCurrencyUpdatePage = await settlementCurrencyComponentsPage.goToCreateSettlementCurrency();
    await settlementCurrencyUpdatePage.enterData();
    expect(await isVisible(settlementCurrencyUpdatePage.saveButton)).to.be.false;

    expect(await settlementCurrencyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(settlementCurrencyComponentsPage.table);
    await waitUntilCount(settlementCurrencyComponentsPage.records, beforeRecordsCount + 1);
    expect(await settlementCurrencyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await settlementCurrencyComponentsPage.deleteSettlementCurrency();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(settlementCurrencyComponentsPage.records, beforeRecordsCount);
      expect(await settlementCurrencyComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(settlementCurrencyComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
