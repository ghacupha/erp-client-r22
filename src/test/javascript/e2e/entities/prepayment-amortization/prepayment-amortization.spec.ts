import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrepaymentAmortizationComponentsPage from './prepayment-amortization.page-object';
import PrepaymentAmortizationUpdatePage from './prepayment-amortization-update.page-object';
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

describe('PrepaymentAmortization e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentAmortizationComponentsPage: PrepaymentAmortizationComponentsPage;
  let prepaymentAmortizationUpdatePage: PrepaymentAmortizationUpdatePage;
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
    prepaymentAmortizationComponentsPage = new PrepaymentAmortizationComponentsPage();
    prepaymentAmortizationComponentsPage = await prepaymentAmortizationComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepaymentAmortizations', async () => {
    expect(await prepaymentAmortizationComponentsPage.title.getText()).to.match(/Prepayment Amortizations/);
    expect(await prepaymentAmortizationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepaymentAmortizations', async () => {
    const beforeRecordsCount = (await isVisible(prepaymentAmortizationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepaymentAmortizationComponentsPage.table);
    prepaymentAmortizationUpdatePage = await prepaymentAmortizationComponentsPage.goToCreatePrepaymentAmortization();
    await prepaymentAmortizationUpdatePage.enterData();
    expect(await isVisible(prepaymentAmortizationUpdatePage.saveButton)).to.be.false;

    expect(await prepaymentAmortizationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepaymentAmortizationComponentsPage.table);
    await waitUntilCount(prepaymentAmortizationComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepaymentAmortizationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepaymentAmortizationComponentsPage.deletePrepaymentAmortization();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepaymentAmortizationComponentsPage.records, beforeRecordsCount);
      expect(await prepaymentAmortizationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepaymentAmortizationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
