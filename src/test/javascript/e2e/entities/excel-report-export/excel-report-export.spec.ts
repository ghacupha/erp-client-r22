import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExcelReportExportComponentsPage from './excel-report-export.page-object';
import ExcelReportExportUpdatePage from './excel-report-export-update.page-object';
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

describe('ExcelReportExport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let excelReportExportComponentsPage: ExcelReportExportComponentsPage;
  let excelReportExportUpdatePage: ExcelReportExportUpdatePage;
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
    excelReportExportComponentsPage = new ExcelReportExportComponentsPage();
    excelReportExportComponentsPage = await excelReportExportComponentsPage.goToPage(navBarPage);
  });

  it('should load ExcelReportExports', async () => {
    expect(await excelReportExportComponentsPage.title.getText()).to.match(/Excel Report Exports/);
    expect(await excelReportExportComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete ExcelReportExports', async () => {
        const beforeRecordsCount = await isVisible(excelReportExportComponentsPage.noRecords) ? 0 : await getRecordsCount(excelReportExportComponentsPage.table);
        excelReportExportUpdatePage = await excelReportExportComponentsPage.goToCreateExcelReportExport();
        await excelReportExportUpdatePage.enterData();
        expect(await isVisible(excelReportExportUpdatePage.saveButton)).to.be.false;

        expect(await excelReportExportComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(excelReportExportComponentsPage.table);
        await waitUntilCount(excelReportExportComponentsPage.records, beforeRecordsCount + 1);
        expect(await excelReportExportComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await excelReportExportComponentsPage.deleteExcelReportExport();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(excelReportExportComponentsPage.records, beforeRecordsCount);
          expect(await excelReportExportComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(excelReportExportComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
