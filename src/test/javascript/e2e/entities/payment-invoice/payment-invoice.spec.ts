import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PaymentInvoiceComponentsPage from './payment-invoice.page-object';
import PaymentInvoiceUpdatePage from './payment-invoice-update.page-object';
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

describe('PaymentInvoice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paymentInvoiceComponentsPage: PaymentInvoiceComponentsPage;
  let paymentInvoiceUpdatePage: PaymentInvoiceUpdatePage;
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
    paymentInvoiceComponentsPage = new PaymentInvoiceComponentsPage();
    paymentInvoiceComponentsPage = await paymentInvoiceComponentsPage.goToPage(navBarPage);
  });

  it('should load PaymentInvoices', async () => {
    expect(await paymentInvoiceComponentsPage.title.getText()).to.match(/Payment Invoices/);
    expect(await paymentInvoiceComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete PaymentInvoices', async () => {
        const beforeRecordsCount = await isVisible(paymentInvoiceComponentsPage.noRecords) ? 0 : await getRecordsCount(paymentInvoiceComponentsPage.table);
        paymentInvoiceUpdatePage = await paymentInvoiceComponentsPage.goToCreatePaymentInvoice();
        await paymentInvoiceUpdatePage.enterData();
        expect(await isVisible(paymentInvoiceUpdatePage.saveButton)).to.be.false;

        expect(await paymentInvoiceComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(paymentInvoiceComponentsPage.table);
        await waitUntilCount(paymentInvoiceComponentsPage.records, beforeRecordsCount + 1);
        expect(await paymentInvoiceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await paymentInvoiceComponentsPage.deletePaymentInvoice();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(paymentInvoiceComponentsPage.records, beforeRecordsCount);
          expect(await paymentInvoiceComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(paymentInvoiceComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
