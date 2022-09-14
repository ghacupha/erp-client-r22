import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AgencyNoticeComponentsPage from './agency-notice.page-object';
import AgencyNoticeUpdatePage from './agency-notice-update.page-object';
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

describe('AgencyNotice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agencyNoticeComponentsPage: AgencyNoticeComponentsPage;
  let agencyNoticeUpdatePage: AgencyNoticeUpdatePage;
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
    agencyNoticeComponentsPage = new AgencyNoticeComponentsPage();
    agencyNoticeComponentsPage = await agencyNoticeComponentsPage.goToPage(navBarPage);
  });

  it('should load AgencyNotices', async () => {
    expect(await agencyNoticeComponentsPage.title.getText()).to.match(/Agency Notices/);
    expect(await agencyNoticeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete AgencyNotices', async () => {
    const beforeRecordsCount = (await isVisible(agencyNoticeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(agencyNoticeComponentsPage.table);
    agencyNoticeUpdatePage = await agencyNoticeComponentsPage.goToCreateAgencyNotice();
    await agencyNoticeUpdatePage.enterData();
    expect(await isVisible(agencyNoticeUpdatePage.saveButton)).to.be.false;

    expect(await agencyNoticeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(agencyNoticeComponentsPage.table);
    await waitUntilCount(agencyNoticeComponentsPage.records, beforeRecordsCount + 1);
    expect(await agencyNoticeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await agencyNoticeComponentsPage.deleteAgencyNotice();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(agencyNoticeComponentsPage.records, beforeRecordsCount);
      expect(await agencyNoticeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(agencyNoticeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
