import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReportTemplateComponentsPage from './report-template.page-object';
import ReportTemplateUpdatePage from './report-template-update.page-object';
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

describe('ReportTemplate e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reportTemplateComponentsPage: ReportTemplateComponentsPage;
  let reportTemplateUpdatePage: ReportTemplateUpdatePage;
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
    reportTemplateComponentsPage = new ReportTemplateComponentsPage();
    reportTemplateComponentsPage = await reportTemplateComponentsPage.goToPage(navBarPage);
  });

  it('should load ReportTemplates', async () => {
    expect(await reportTemplateComponentsPage.title.getText()).to.match(/Report Templates/);
    expect(await reportTemplateComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ReportTemplates', async () => {
    const beforeRecordsCount = (await isVisible(reportTemplateComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(reportTemplateComponentsPage.table);
    reportTemplateUpdatePage = await reportTemplateComponentsPage.goToCreateReportTemplate();
    await reportTemplateUpdatePage.enterData();
    expect(await isVisible(reportTemplateUpdatePage.saveButton)).to.be.false;

    expect(await reportTemplateComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(reportTemplateComponentsPage.table);
    await waitUntilCount(reportTemplateComponentsPage.records, beforeRecordsCount + 1);
    expect(await reportTemplateComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await reportTemplateComponentsPage.deleteReportTemplate();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(reportTemplateComponentsPage.records, beforeRecordsCount);
      expect(await reportTemplateComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(reportTemplateComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
