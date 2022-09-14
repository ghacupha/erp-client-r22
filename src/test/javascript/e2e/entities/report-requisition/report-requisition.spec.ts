import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReportRequisitionComponentsPage from './report-requisition.page-object';
import ReportRequisitionUpdatePage from './report-requisition-update.page-object';
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

describe('ReportRequisition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reportRequisitionComponentsPage: ReportRequisitionComponentsPage;
  let reportRequisitionUpdatePage: ReportRequisitionUpdatePage;
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
    reportRequisitionComponentsPage = new ReportRequisitionComponentsPage();
    reportRequisitionComponentsPage = await reportRequisitionComponentsPage.goToPage(navBarPage);
  });

  it('should load ReportRequisitions', async () => {
    expect(await reportRequisitionComponentsPage.title.getText()).to.match(/Report Requisitions/);
    expect(await reportRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete ReportRequisitions', async () => {
        const beforeRecordsCount = await isVisible(reportRequisitionComponentsPage.noRecords) ? 0 : await getRecordsCount(reportRequisitionComponentsPage.table);
        reportRequisitionUpdatePage = await reportRequisitionComponentsPage.goToCreateReportRequisition();
        await reportRequisitionUpdatePage.enterData();
        expect(await isVisible(reportRequisitionUpdatePage.saveButton)).to.be.false;

        expect(await reportRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(reportRequisitionComponentsPage.table);
        await waitUntilCount(reportRequisitionComponentsPage.records, beforeRecordsCount + 1);
        expect(await reportRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await reportRequisitionComponentsPage.deleteReportRequisition();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(reportRequisitionComponentsPage.records, beforeRecordsCount);
          expect(await reportRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(reportRequisitionComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
