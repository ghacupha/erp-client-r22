import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PaymentRequisitionComponentsPage from './payment-requisition.page-object';
import PaymentRequisitionUpdatePage from './payment-requisition-update.page-object';
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

describe('PaymentRequisition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paymentRequisitionComponentsPage: PaymentRequisitionComponentsPage;
  let paymentRequisitionUpdatePage: PaymentRequisitionUpdatePage;
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
    paymentRequisitionComponentsPage = new PaymentRequisitionComponentsPage();
    paymentRequisitionComponentsPage = await paymentRequisitionComponentsPage.goToPage(navBarPage);
  });

  it('should load PaymentRequisitions', async () => {
    expect(await paymentRequisitionComponentsPage.title.getText()).to.match(/Payment Requisitions/);
    expect(await paymentRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PaymentRequisitions', async () => {
    const beforeRecordsCount = (await isVisible(paymentRequisitionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(paymentRequisitionComponentsPage.table);
    paymentRequisitionUpdatePage = await paymentRequisitionComponentsPage.goToCreatePaymentRequisition();
    await paymentRequisitionUpdatePage.enterData();
    expect(await isVisible(paymentRequisitionUpdatePage.saveButton)).to.be.false;

    expect(await paymentRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(paymentRequisitionComponentsPage.table);
    await waitUntilCount(paymentRequisitionComponentsPage.records, beforeRecordsCount + 1);
    expect(await paymentRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await paymentRequisitionComponentsPage.deletePaymentRequisition();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(paymentRequisitionComponentsPage.records, beforeRecordsCount);
      expect(await paymentRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(paymentRequisitionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
