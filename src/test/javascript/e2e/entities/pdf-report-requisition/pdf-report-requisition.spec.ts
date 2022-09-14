import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PdfReportRequisitionComponentsPage from './pdf-report-requisition.page-object';
import PdfReportRequisitionUpdatePage from './pdf-report-requisition-update.page-object';
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

describe('PdfReportRequisition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pdfReportRequisitionComponentsPage: PdfReportRequisitionComponentsPage;
  let pdfReportRequisitionUpdatePage: PdfReportRequisitionUpdatePage;
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
    pdfReportRequisitionComponentsPage = new PdfReportRequisitionComponentsPage();
    pdfReportRequisitionComponentsPage = await pdfReportRequisitionComponentsPage.goToPage(navBarPage);
  });

  it('should load PdfReportRequisitions', async () => {
    expect(await pdfReportRequisitionComponentsPage.title.getText()).to.match(/Pdf Report Requisitions/);
    expect(await pdfReportRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete PdfReportRequisitions', async () => {
        const beforeRecordsCount = await isVisible(pdfReportRequisitionComponentsPage.noRecords) ? 0 : await getRecordsCount(pdfReportRequisitionComponentsPage.table);
        pdfReportRequisitionUpdatePage = await pdfReportRequisitionComponentsPage.goToCreatePdfReportRequisition();
        await pdfReportRequisitionUpdatePage.enterData();
        expect(await isVisible(pdfReportRequisitionUpdatePage.saveButton)).to.be.false;

        expect(await pdfReportRequisitionComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(pdfReportRequisitionComponentsPage.table);
        await waitUntilCount(pdfReportRequisitionComponentsPage.records, beforeRecordsCount + 1);
        expect(await pdfReportRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await pdfReportRequisitionComponentsPage.deletePdfReportRequisition();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(pdfReportRequisitionComponentsPage.records, beforeRecordsCount);
          expect(await pdfReportRequisitionComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(pdfReportRequisitionComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
