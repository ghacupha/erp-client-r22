import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReportDesignComponentsPage from './report-design.page-object';
import ReportDesignUpdatePage from './report-design-update.page-object';
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

describe('ReportDesign e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reportDesignComponentsPage: ReportDesignComponentsPage;
  let reportDesignUpdatePage: ReportDesignUpdatePage;
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
    reportDesignComponentsPage = new ReportDesignComponentsPage();
    reportDesignComponentsPage = await reportDesignComponentsPage.goToPage(navBarPage);
  });

  it('should load ReportDesigns', async () => {
    expect(await reportDesignComponentsPage.title.getText()).to.match(/Report Designs/);
    expect(await reportDesignComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete ReportDesigns', async () => {
        const beforeRecordsCount = await isVisible(reportDesignComponentsPage.noRecords) ? 0 : await getRecordsCount(reportDesignComponentsPage.table);
        reportDesignUpdatePage = await reportDesignComponentsPage.goToCreateReportDesign();
        await reportDesignUpdatePage.enterData();
        expect(await isVisible(reportDesignUpdatePage.saveButton)).to.be.false;

        expect(await reportDesignComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(reportDesignComponentsPage.table);
        await waitUntilCount(reportDesignComponentsPage.records, beforeRecordsCount + 1);
        expect(await reportDesignComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await reportDesignComponentsPage.deleteReportDesign();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(reportDesignComponentsPage.records, beforeRecordsCount);
          expect(await reportDesignComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(reportDesignComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
