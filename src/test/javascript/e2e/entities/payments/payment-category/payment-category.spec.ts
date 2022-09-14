import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PaymentCategoryComponentsPage from './payment-category.page-object';
import PaymentCategoryUpdatePage from './payment-category-update.page-object';
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

describe('PaymentCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paymentCategoryComponentsPage: PaymentCategoryComponentsPage;
  let paymentCategoryUpdatePage: PaymentCategoryUpdatePage;
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
    paymentCategoryComponentsPage = new PaymentCategoryComponentsPage();
    paymentCategoryComponentsPage = await paymentCategoryComponentsPage.goToPage(navBarPage);
  });

  it('should load PaymentCategories', async () => {
    expect(await paymentCategoryComponentsPage.title.getText()).to.match(/Payment Categories/);
    expect(await paymentCategoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PaymentCategories', async () => {
    const beforeRecordsCount = (await isVisible(paymentCategoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(paymentCategoryComponentsPage.table);
    paymentCategoryUpdatePage = await paymentCategoryComponentsPage.goToCreatePaymentCategory();
    await paymentCategoryUpdatePage.enterData();
    expect(await isVisible(paymentCategoryUpdatePage.saveButton)).to.be.false;

    expect(await paymentCategoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(paymentCategoryComponentsPage.table);
    await waitUntilCount(paymentCategoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await paymentCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await paymentCategoryComponentsPage.deletePaymentCategory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(paymentCategoryComponentsPage.records, beforeRecordsCount);
      expect(await paymentCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(paymentCategoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
