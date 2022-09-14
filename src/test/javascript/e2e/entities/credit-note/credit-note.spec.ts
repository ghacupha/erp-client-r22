import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CreditNoteComponentsPage from './credit-note.page-object';
import CreditNoteUpdatePage from './credit-note-update.page-object';
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

describe('CreditNote e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let creditNoteComponentsPage: CreditNoteComponentsPage;
  let creditNoteUpdatePage: CreditNoteUpdatePage;
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
    creditNoteComponentsPage = new CreditNoteComponentsPage();
    creditNoteComponentsPage = await creditNoteComponentsPage.goToPage(navBarPage);
  });

  it('should load CreditNotes', async () => {
    expect(await creditNoteComponentsPage.title.getText()).to.match(/Credit Notes/);
    expect(await creditNoteComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete CreditNotes', async () => {
    const beforeRecordsCount = (await isVisible(creditNoteComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(creditNoteComponentsPage.table);
    creditNoteUpdatePage = await creditNoteComponentsPage.goToCreateCreditNote();
    await creditNoteUpdatePage.enterData();
    expect(await isVisible(creditNoteUpdatePage.saveButton)).to.be.false;

    expect(await creditNoteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(creditNoteComponentsPage.table);
    await waitUntilCount(creditNoteComponentsPage.records, beforeRecordsCount + 1);
    expect(await creditNoteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await creditNoteComponentsPage.deleteCreditNote();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(creditNoteComponentsPage.records, beforeRecordsCount);
      expect(await creditNoteComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(creditNoteComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
