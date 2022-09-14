import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MfbBranchCodeComponentsPage from './mfb-branch-code.page-object';
import MfbBranchCodeUpdatePage from './mfb-branch-code-update.page-object';
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

describe('MfbBranchCode e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mfbBranchCodeComponentsPage: MfbBranchCodeComponentsPage;
  let mfbBranchCodeUpdatePage: MfbBranchCodeUpdatePage;
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
    mfbBranchCodeComponentsPage = new MfbBranchCodeComponentsPage();
    mfbBranchCodeComponentsPage = await mfbBranchCodeComponentsPage.goToPage(navBarPage);
  });

  it('should load MfbBranchCodes', async () => {
    expect(await mfbBranchCodeComponentsPage.title.getText()).to.match(/Mfb Branch Codes/);
    expect(await mfbBranchCodeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MfbBranchCodes', async () => {
    const beforeRecordsCount = (await isVisible(mfbBranchCodeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(mfbBranchCodeComponentsPage.table);
    mfbBranchCodeUpdatePage = await mfbBranchCodeComponentsPage.goToCreateMfbBranchCode();
    await mfbBranchCodeUpdatePage.enterData();
    expect(await isVisible(mfbBranchCodeUpdatePage.saveButton)).to.be.false;

    expect(await mfbBranchCodeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(mfbBranchCodeComponentsPage.table);
    await waitUntilCount(mfbBranchCodeComponentsPage.records, beforeRecordsCount + 1);
    expect(await mfbBranchCodeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await mfbBranchCodeComponentsPage.deleteMfbBranchCode();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(mfbBranchCodeComponentsPage.records, beforeRecordsCount);
      expect(await mfbBranchCodeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(mfbBranchCodeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
