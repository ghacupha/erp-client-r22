import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WorkProjectRegisterComponentsPage from './work-project-register.page-object';
import WorkProjectRegisterUpdatePage from './work-project-register-update.page-object';
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

describe('WorkProjectRegister e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workProjectRegisterComponentsPage: WorkProjectRegisterComponentsPage;
  let workProjectRegisterUpdatePage: WorkProjectRegisterUpdatePage;
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
    workProjectRegisterComponentsPage = new WorkProjectRegisterComponentsPage();
    workProjectRegisterComponentsPage = await workProjectRegisterComponentsPage.goToPage(navBarPage);
  });

  it('should load WorkProjectRegisters', async () => {
    expect(await workProjectRegisterComponentsPage.title.getText()).to.match(/Work Project Registers/);
    expect(await workProjectRegisterComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete WorkProjectRegisters', async () => {
        const beforeRecordsCount = await isVisible(workProjectRegisterComponentsPage.noRecords) ? 0 : await getRecordsCount(workProjectRegisterComponentsPage.table);
        workProjectRegisterUpdatePage = await workProjectRegisterComponentsPage.goToCreateWorkProjectRegister();
        await workProjectRegisterUpdatePage.enterData();
        expect(await isVisible(workProjectRegisterUpdatePage.saveButton)).to.be.false;

        expect(await workProjectRegisterComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(workProjectRegisterComponentsPage.table);
        await waitUntilCount(workProjectRegisterComponentsPage.records, beforeRecordsCount + 1);
        expect(await workProjectRegisterComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await workProjectRegisterComponentsPage.deleteWorkProjectRegister();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(workProjectRegisterComponentsPage.records, beforeRecordsCount);
          expect(await workProjectRegisterComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(workProjectRegisterComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
