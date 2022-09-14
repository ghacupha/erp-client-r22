import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WorkInProgressTransferComponentsPage from './work-in-progress-transfer.page-object';
import WorkInProgressTransferUpdatePage from './work-in-progress-transfer-update.page-object';
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

describe('WorkInProgressTransfer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workInProgressTransferComponentsPage: WorkInProgressTransferComponentsPage;
  let workInProgressTransferUpdatePage: WorkInProgressTransferUpdatePage;
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
    workInProgressTransferComponentsPage = new WorkInProgressTransferComponentsPage();
    workInProgressTransferComponentsPage = await workInProgressTransferComponentsPage.goToPage(navBarPage);
  });

  it('should load WorkInProgressTransfers', async () => {
    expect(await workInProgressTransferComponentsPage.title.getText()).to.match(/Work In Progress Transfers/);
    expect(await workInProgressTransferComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete WorkInProgressTransfers', async () => {
    const beforeRecordsCount = (await isVisible(workInProgressTransferComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(workInProgressTransferComponentsPage.table);
    workInProgressTransferUpdatePage = await workInProgressTransferComponentsPage.goToCreateWorkInProgressTransfer();
    await workInProgressTransferUpdatePage.enterData();
    expect(await isVisible(workInProgressTransferUpdatePage.saveButton)).to.be.false;

    expect(await workInProgressTransferComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(workInProgressTransferComponentsPage.table);
    await waitUntilCount(workInProgressTransferComponentsPage.records, beforeRecordsCount + 1);
    expect(await workInProgressTransferComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await workInProgressTransferComponentsPage.deleteWorkInProgressTransfer();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(workInProgressTransferComponentsPage.records, beforeRecordsCount);
      expect(await workInProgressTransferComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(workInProgressTransferComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
