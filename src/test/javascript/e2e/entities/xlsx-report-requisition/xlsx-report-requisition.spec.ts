import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import XlsxReportRequisitionComponentsPage from './xlsx-report-requisition.page-object';
import XlsxReportRequisitionUpdatePage from './xlsx-report-requisition-update.page-object';
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

describe('XlsxReportRequisition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let xlsxReportRequisitionComponentsPage: XlsxReportRequisitionComponentsPage;
  let xlsxReportRequisitionUpdatePage: XlsxReportRequisitionUpdatePage;
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
    xlsxReportRequisitionComponentsPage = new XlsxReportRequisitionComponentsPage();
    xlsxReportRequisitionComponentsPage = await xlsxReportRequisitionComponentsPage.goToPage(navBarPage);
  });

  it('should load XlsxReportRequisitions', async () => {
    expect(await xlsxReportRequisitionComponentsPage.title.getText()).to.match(/Xlsx Report Requisitions/);
    expect(await xlsxReportRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete XlsxReportRequisitions', async () => {
        const beforeRecordsCount = await isVisible(xlsxReportRequisitionComponentsPage.noRecords) ? 0 : await getRecordsCount(xlsxReportRequisitionComponentsPage.table);
        xlsxReportRequisitionUpdatePage = await xlsxReportRequisitionComponentsPage.goToCreateXlsxReportRequisition();
        await xlsxReportRequisitionUpdatePage.enterData();
        expect(await isVisible(xlsxReportRequisitionUpdatePage.saveButton)).to.be.false;

        expect(await xlsxReportRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(xlsxReportRequisitionComponentsPage.table);
        await waitUntilCount(xlsxReportRequisitionComponentsPage.records, beforeRecordsCount + 1);
        expect(await xlsxReportRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await xlsxReportRequisitionComponentsPage.deleteXlsxReportRequisition();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(xlsxReportRequisitionComponentsPage.records, beforeRecordsCount);
          expect(await xlsxReportRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(xlsxReportRequisitionComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
