import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BankBranchCodeComponentsPage from './bank-branch-code.page-object';
import BankBranchCodeUpdatePage from './bank-branch-code-update.page-object';
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

describe('BankBranchCode e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bankBranchCodeComponentsPage: BankBranchCodeComponentsPage;
  let bankBranchCodeUpdatePage: BankBranchCodeUpdatePage;
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
    bankBranchCodeComponentsPage = new BankBranchCodeComponentsPage();
    bankBranchCodeComponentsPage = await bankBranchCodeComponentsPage.goToPage(navBarPage);
  });

  it('should load BankBranchCodes', async () => {
    expect(await bankBranchCodeComponentsPage.title.getText()).to.match(/Bank Branch Codes/);
    expect(await bankBranchCodeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BankBranchCodes', async () => {
    const beforeRecordsCount = (await isVisible(bankBranchCodeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bankBranchCodeComponentsPage.table);
    bankBranchCodeUpdatePage = await bankBranchCodeComponentsPage.goToCreateBankBranchCode();
    await bankBranchCodeUpdatePage.enterData();
    expect(await isVisible(bankBranchCodeUpdatePage.saveButton)).to.be.false;

    expect(await bankBranchCodeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bankBranchCodeComponentsPage.table);
    await waitUntilCount(bankBranchCodeComponentsPage.records, beforeRecordsCount + 1);
    expect(await bankBranchCodeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bankBranchCodeComponentsPage.deleteBankBranchCode();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bankBranchCodeComponentsPage.records, beforeRecordsCount);
      expect(await bankBranchCodeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bankBranchCodeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
