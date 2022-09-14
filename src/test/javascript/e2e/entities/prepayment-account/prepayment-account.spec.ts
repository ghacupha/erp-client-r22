import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrepaymentAccountComponentsPage from './prepayment-account.page-object';
import PrepaymentAccountUpdatePage from './prepayment-account-update.page-object';
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

describe('PrepaymentAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentAccountComponentsPage: PrepaymentAccountComponentsPage;
  let prepaymentAccountUpdatePage: PrepaymentAccountUpdatePage;
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
    prepaymentAccountComponentsPage = new PrepaymentAccountComponentsPage();
    prepaymentAccountComponentsPage = await prepaymentAccountComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepaymentAccounts', async () => {
    expect(await prepaymentAccountComponentsPage.title.getText()).to.match(/Prepayment Accounts/);
    expect(await prepaymentAccountComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepaymentAccounts', async () => {
    const beforeRecordsCount = (await isVisible(prepaymentAccountComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepaymentAccountComponentsPage.table);
    prepaymentAccountUpdatePage = await prepaymentAccountComponentsPage.goToCreatePrepaymentAccount();
    await prepaymentAccountUpdatePage.enterData();
    expect(await isVisible(prepaymentAccountUpdatePage.saveButton)).to.be.false;

    expect(await prepaymentAccountComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepaymentAccountComponentsPage.table);
    await waitUntilCount(prepaymentAccountComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepaymentAccountComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepaymentAccountComponentsPage.deletePrepaymentAccount();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepaymentAccountComponentsPage.records, beforeRecordsCount);
      expect(await prepaymentAccountComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepaymentAccountComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
