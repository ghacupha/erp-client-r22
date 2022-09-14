import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SignedPaymentComponentsPage from './signed-payment.page-object';
import SignedPaymentUpdatePage from './signed-payment-update.page-object';
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

describe('SignedPayment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let signedPaymentComponentsPage: SignedPaymentComponentsPage;
  let signedPaymentUpdatePage: SignedPaymentUpdatePage;
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
    signedPaymentComponentsPage = new SignedPaymentComponentsPage();
    signedPaymentComponentsPage = await signedPaymentComponentsPage.goToPage(navBarPage);
  });

  it('should load SignedPayments', async () => {
    expect(await signedPaymentComponentsPage.title.getText()).to.match(/Signed Payments/);
    expect(await signedPaymentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SignedPayments', async () => {
    const beforeRecordsCount = (await isVisible(signedPaymentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(signedPaymentComponentsPage.table);
    signedPaymentUpdatePage = await signedPaymentComponentsPage.goToCreateSignedPayment();
    await signedPaymentUpdatePage.enterData();
    expect(await isVisible(signedPaymentUpdatePage.saveButton)).to.be.false;

    expect(await signedPaymentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(signedPaymentComponentsPage.table);
    await waitUntilCount(signedPaymentComponentsPage.records, beforeRecordsCount + 1);
    expect(await signedPaymentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await signedPaymentComponentsPage.deleteSignedPayment();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(signedPaymentComponentsPage.records, beforeRecordsCount);
      expect(await signedPaymentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(signedPaymentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
