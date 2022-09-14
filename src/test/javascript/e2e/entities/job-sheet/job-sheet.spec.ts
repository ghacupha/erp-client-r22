import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JobSheetComponentsPage from './job-sheet.page-object';
import JobSheetUpdatePage from './job-sheet-update.page-object';
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

describe('JobSheet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobSheetComponentsPage: JobSheetComponentsPage;
  let jobSheetUpdatePage: JobSheetUpdatePage;
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
    jobSheetComponentsPage = new JobSheetComponentsPage();
    jobSheetComponentsPage = await jobSheetComponentsPage.goToPage(navBarPage);
  });

  it('should load JobSheets', async () => {
    expect(await jobSheetComponentsPage.title.getText()).to.match(/Job Sheets/);
    expect(await jobSheetComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete JobSheets', async () => {
        const beforeRecordsCount = await isVisible(jobSheetComponentsPage.noRecords) ? 0 : await getRecordsCount(jobSheetComponentsPage.table);
        jobSheetUpdatePage = await jobSheetComponentsPage.goToCreateJobSheet();
        await jobSheetUpdatePage.enterData();
        expect(await isVisible(jobSheetUpdatePage.saveButton)).to.be.false;

        expect(await jobSheetComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(jobSheetComponentsPage.table);
        await waitUntilCount(jobSheetComponentsPage.records, beforeRecordsCount + 1);
        expect(await jobSheetComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await jobSheetComponentsPage.deleteJobSheet();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(jobSheetComponentsPage.records, beforeRecordsCount);
          expect(await jobSheetComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(jobSheetComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
