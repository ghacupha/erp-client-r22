import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProcessStatusComponentsPage from './process-status.page-object';
import ProcessStatusUpdatePage from './process-status-update.page-object';
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

describe('ProcessStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let processStatusComponentsPage: ProcessStatusComponentsPage;
  let processStatusUpdatePage: ProcessStatusUpdatePage;
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
    processStatusComponentsPage = new ProcessStatusComponentsPage();
    processStatusComponentsPage = await processStatusComponentsPage.goToPage(navBarPage);
  });

  it('should load ProcessStatuses', async () => {
    expect(await processStatusComponentsPage.title.getText()).to.match(/Process Statuses/);
    expect(await processStatusComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ProcessStatuses', async () => {
    const beforeRecordsCount = (await isVisible(processStatusComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(processStatusComponentsPage.table);
    processStatusUpdatePage = await processStatusComponentsPage.goToCreateProcessStatus();
    await processStatusUpdatePage.enterData();
    expect(await isVisible(processStatusUpdatePage.saveButton)).to.be.false;

    expect(await processStatusComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(processStatusComponentsPage.table);
    await waitUntilCount(processStatusComponentsPage.records, beforeRecordsCount + 1);
    expect(await processStatusComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await processStatusComponentsPage.deleteProcessStatus();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(processStatusComponentsPage.records, beforeRecordsCount);
      expect(await processStatusComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(processStatusComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
