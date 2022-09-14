import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReportContentTypeComponentsPage from './report-content-type.page-object';
import ReportContentTypeUpdatePage from './report-content-type-update.page-object';
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

describe('ReportContentType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reportContentTypeComponentsPage: ReportContentTypeComponentsPage;
  let reportContentTypeUpdatePage: ReportContentTypeUpdatePage;
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
    reportContentTypeComponentsPage = new ReportContentTypeComponentsPage();
    reportContentTypeComponentsPage = await reportContentTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load ReportContentTypes', async () => {
    expect(await reportContentTypeComponentsPage.title.getText()).to.match(/Report Content Types/);
    expect(await reportContentTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete ReportContentTypes', async () => {
        const beforeRecordsCount = await isVisible(reportContentTypeComponentsPage.noRecords) ? 0 : await getRecordsCount(reportContentTypeComponentsPage.table);
        reportContentTypeUpdatePage = await reportContentTypeComponentsPage.goToCreateReportContentType();
        await reportContentTypeUpdatePage.enterData();
        expect(await isVisible(reportContentTypeUpdatePage.saveButton)).to.be.false;

        expect(await reportContentTypeComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(reportContentTypeComponentsPage.table);
        await waitUntilCount(reportContentTypeComponentsPage.records, beforeRecordsCount + 1);
        expect(await reportContentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await reportContentTypeComponentsPage.deleteReportContentType();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(reportContentTypeComponentsPage.records, beforeRecordsCount);
          expect(await reportContentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(reportContentTypeComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
