import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PaymentCalculationComponentsPage from './payment-calculation.page-object';
import PaymentCalculationUpdatePage from './payment-calculation-update.page-object';
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

describe('PaymentCalculation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paymentCalculationComponentsPage: PaymentCalculationComponentsPage;
  let paymentCalculationUpdatePage: PaymentCalculationUpdatePage;
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
    paymentCalculationComponentsPage = new PaymentCalculationComponentsPage();
    paymentCalculationComponentsPage = await paymentCalculationComponentsPage.goToPage(navBarPage);
  });

  it('should load PaymentCalculations', async () => {
    expect(await paymentCalculationComponentsPage.title.getText()).to.match(/Payment Calculations/);
    expect(await paymentCalculationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PaymentCalculations', async () => {
    const beforeRecordsCount = (await isVisible(paymentCalculationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(paymentCalculationComponentsPage.table);
    paymentCalculationUpdatePage = await paymentCalculationComponentsPage.goToCreatePaymentCalculation();
    await paymentCalculationUpdatePage.enterData();
    expect(await isVisible(paymentCalculationUpdatePage.saveButton)).to.be.false;

    expect(await paymentCalculationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(paymentCalculationComponentsPage.table);
    await waitUntilCount(paymentCalculationComponentsPage.records, beforeRecordsCount + 1);
    expect(await paymentCalculationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await paymentCalculationComponentsPage.deletePaymentCalculation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(paymentCalculationComponentsPage.records, beforeRecordsCount);
      expect(await paymentCalculationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(paymentCalculationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
