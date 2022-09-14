import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TransactionAccountComponentsPage from './transaction-account.page-object';
import TransactionAccountUpdatePage from './transaction-account-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('TransactionAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transactionAccountComponentsPage: TransactionAccountComponentsPage;
  let transactionAccountUpdatePage: TransactionAccountUpdatePage;
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
    transactionAccountComponentsPage = new TransactionAccountComponentsPage();
    transactionAccountComponentsPage = await transactionAccountComponentsPage.goToPage(navBarPage);
  });

  it('should load TransactionAccounts', async () => {
    expect(await transactionAccountComponentsPage.title.getText()).to.match(/Transaction Accounts/);
    expect(await transactionAccountComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TransactionAccounts', async () => {
    const beforeRecordsCount = (await isVisible(transactionAccountComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transactionAccountComponentsPage.table);
    transactionAccountUpdatePage = await transactionAccountComponentsPage.goToCreateTransactionAccount();
    await transactionAccountUpdatePage.enterData();
    expect(await isVisible(transactionAccountUpdatePage.saveButton)).to.be.false;

    expect(await transactionAccountComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(transactionAccountComponentsPage.table);
    await waitUntilCount(transactionAccountComponentsPage.records, beforeRecordsCount + 1);
    expect(await transactionAccountComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await transactionAccountComponentsPage.deleteTransactionAccount();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(transactionAccountComponentsPage.records, beforeRecordsCount);
      expect(await transactionAccountComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(transactionAccountComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
