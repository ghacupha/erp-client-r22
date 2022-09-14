import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PaymentLabelComponentsPage from './payment-label.page-object';
import PaymentLabelUpdatePage from './payment-label-update.page-object';
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

describe('PaymentLabel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paymentLabelComponentsPage: PaymentLabelComponentsPage;
  let paymentLabelUpdatePage: PaymentLabelUpdatePage;
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
    paymentLabelComponentsPage = new PaymentLabelComponentsPage();
    paymentLabelComponentsPage = await paymentLabelComponentsPage.goToPage(navBarPage);
  });

  it('should load PaymentLabels', async () => {
    expect(await paymentLabelComponentsPage.title.getText()).to.match(/Payment Labels/);
    expect(await paymentLabelComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PaymentLabels', async () => {
    const beforeRecordsCount = (await isVisible(paymentLabelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(paymentLabelComponentsPage.table);
    paymentLabelUpdatePage = await paymentLabelComponentsPage.goToCreatePaymentLabel();
    await paymentLabelUpdatePage.enterData();
    expect(await isVisible(paymentLabelUpdatePage.saveButton)).to.be.false;

    expect(await paymentLabelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(paymentLabelComponentsPage.table);
    await waitUntilCount(paymentLabelComponentsPage.records, beforeRecordsCount + 1);
    expect(await paymentLabelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await paymentLabelComponentsPage.deletePaymentLabel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(paymentLabelComponentsPage.records, beforeRecordsCount);
      expect(await paymentLabelComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(paymentLabelComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
