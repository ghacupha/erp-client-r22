import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BusinessStampComponentsPage from './business-stamp.page-object';
import BusinessStampUpdatePage from './business-stamp-update.page-object';
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

describe('BusinessStamp e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let businessStampComponentsPage: BusinessStampComponentsPage;
  let businessStampUpdatePage: BusinessStampUpdatePage;
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
    businessStampComponentsPage = new BusinessStampComponentsPage();
    businessStampComponentsPage = await businessStampComponentsPage.goToPage(navBarPage);
  });

  it('should load BusinessStamps', async () => {
    expect(await businessStampComponentsPage.title.getText()).to.match(/Business Stamps/);
    expect(await businessStampComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete BusinessStamps', async () => {
        const beforeRecordsCount = await isVisible(businessStampComponentsPage.noRecords) ? 0 : await getRecordsCount(businessStampComponentsPage.table);
        businessStampUpdatePage = await businessStampComponentsPage.goToCreateBusinessStamp();
        await businessStampUpdatePage.enterData();
        expect(await isVisible(businessStampUpdatePage.saveButton)).to.be.false;

        expect(await businessStampComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(businessStampComponentsPage.table);
        await waitUntilCount(businessStampComponentsPage.records, beforeRecordsCount + 1);
        expect(await businessStampComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await businessStampComponentsPage.deleteBusinessStamp();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(businessStampComponentsPage.records, beforeRecordsCount);
          expect(await businessStampComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(businessStampComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
