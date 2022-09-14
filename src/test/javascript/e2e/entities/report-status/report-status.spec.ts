import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReportStatusComponentsPage from './report-status.page-object';
import ReportStatusUpdatePage from './report-status-update.page-object';
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

describe('ReportStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reportStatusComponentsPage: ReportStatusComponentsPage;
  let reportStatusUpdatePage: ReportStatusUpdatePage;
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
    reportStatusComponentsPage = new ReportStatusComponentsPage();
    reportStatusComponentsPage = await reportStatusComponentsPage.goToPage(navBarPage);
  });

  it('should load ReportStatuses', async () => {
    expect(await reportStatusComponentsPage.title.getText()).to.match(/Report Statuses/);
    expect(await reportStatusComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ReportStatuses', async () => {
    const beforeRecordsCount = (await isVisible(reportStatusComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(reportStatusComponentsPage.table);
    reportStatusUpdatePage = await reportStatusComponentsPage.goToCreateReportStatus();
    await reportStatusUpdatePage.enterData();
    expect(await isVisible(reportStatusUpdatePage.saveButton)).to.be.false;

    expect(await reportStatusComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(reportStatusComponentsPage.table);
    await waitUntilCount(reportStatusComponentsPage.records, beforeRecordsCount + 1);
    expect(await reportStatusComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await reportStatusComponentsPage.deleteReportStatus();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(reportStatusComponentsPage.records, beforeRecordsCount);
      expect(await reportStatusComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(reportStatusComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
