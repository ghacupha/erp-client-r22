import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SystemModuleComponentsPage from './system-module.page-object';
import SystemModuleUpdatePage from './system-module-update.page-object';
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

describe('SystemModule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let systemModuleComponentsPage: SystemModuleComponentsPage;
  let systemModuleUpdatePage: SystemModuleUpdatePage;
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
    systemModuleComponentsPage = new SystemModuleComponentsPage();
    systemModuleComponentsPage = await systemModuleComponentsPage.goToPage(navBarPage);
  });

  it('should load SystemModules', async () => {
    expect(await systemModuleComponentsPage.title.getText()).to.match(/System Modules/);
    expect(await systemModuleComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SystemModules', async () => {
    const beforeRecordsCount = (await isVisible(systemModuleComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(systemModuleComponentsPage.table);
    systemModuleUpdatePage = await systemModuleComponentsPage.goToCreateSystemModule();
    await systemModuleUpdatePage.enterData();
    expect(await isVisible(systemModuleUpdatePage.saveButton)).to.be.false;

    expect(await systemModuleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(systemModuleComponentsPage.table);
    await waitUntilCount(systemModuleComponentsPage.records, beforeRecordsCount + 1);
    expect(await systemModuleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await systemModuleComponentsPage.deleteSystemModule();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(systemModuleComponentsPage.records, beforeRecordsCount);
      expect(await systemModuleComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(systemModuleComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
