import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WorkInProgressRegistrationComponentsPage from './work-in-progress-registration.page-object';
import WorkInProgressRegistrationUpdatePage from './work-in-progress-registration-update.page-object';
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

describe('WorkInProgressRegistration e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workInProgressRegistrationComponentsPage: WorkInProgressRegistrationComponentsPage;
  let workInProgressRegistrationUpdatePage: WorkInProgressRegistrationUpdatePage;
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
    workInProgressRegistrationComponentsPage = new WorkInProgressRegistrationComponentsPage();
    workInProgressRegistrationComponentsPage = await workInProgressRegistrationComponentsPage.goToPage(navBarPage);
  });

  it('should load WorkInProgressRegistrations', async () => {
    expect(await workInProgressRegistrationComponentsPage.title.getText()).to.match(/Work In Progress Registrations/);
    expect(await workInProgressRegistrationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete WorkInProgressRegistrations', async () => {
        const beforeRecordsCount = await isVisible(workInProgressRegistrationComponentsPage.noRecords) ? 0 : await getRecordsCount(workInProgressRegistrationComponentsPage.table);
        workInProgressRegistrationUpdatePage = await workInProgressRegistrationComponentsPage.goToCreateWorkInProgressRegistration();
        await workInProgressRegistrationUpdatePage.enterData();
        expect(await isVisible(workInProgressRegistrationUpdatePage.saveButton)).to.be.false;

        expect(await workInProgressRegistrationComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(workInProgressRegistrationComponentsPage.table);
        await waitUntilCount(workInProgressRegistrationComponentsPage.records, beforeRecordsCount + 1);
        expect(await workInProgressRegistrationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await workInProgressRegistrationComponentsPage.deleteWorkInProgressRegistration();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(workInProgressRegistrationComponentsPage.records, beforeRecordsCount);
          expect(await workInProgressRegistrationComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(workInProgressRegistrationComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
