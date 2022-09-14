import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SystemContentTypeComponentsPage from './system-content-type.page-object';
import SystemContentTypeUpdatePage from './system-content-type-update.page-object';
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

describe('SystemContentType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let systemContentTypeComponentsPage: SystemContentTypeComponentsPage;
  let systemContentTypeUpdatePage: SystemContentTypeUpdatePage;
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
    systemContentTypeComponentsPage = new SystemContentTypeComponentsPage();
    systemContentTypeComponentsPage = await systemContentTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load SystemContentTypes', async () => {
    expect(await systemContentTypeComponentsPage.title.getText()).to.match(/System Content Types/);
    expect(await systemContentTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SystemContentTypes', async () => {
    const beforeRecordsCount = (await isVisible(systemContentTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(systemContentTypeComponentsPage.table);
    systemContentTypeUpdatePage = await systemContentTypeComponentsPage.goToCreateSystemContentType();
    await systemContentTypeUpdatePage.enterData();
    expect(await isVisible(systemContentTypeUpdatePage.saveButton)).to.be.false;

    expect(await systemContentTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(systemContentTypeComponentsPage.table);
    await waitUntilCount(systemContentTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await systemContentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await systemContentTypeComponentsPage.deleteSystemContentType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(systemContentTypeComponentsPage.records, beforeRecordsCount);
      expect(await systemContentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(systemContentTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
