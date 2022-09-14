import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DealerComponentsPage from './dealer.page-object';
import DealerUpdatePage from './dealer-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../../util/utils';

const expect = chai.expect;

describe('Dealer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dealerComponentsPage: DealerComponentsPage;
  let dealerUpdatePage: DealerUpdatePage;
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
    dealerComponentsPage = new DealerComponentsPage();
    dealerComponentsPage = await dealerComponentsPage.goToPage(navBarPage);
  });

  it('should load Dealers', async () => {
    expect(await dealerComponentsPage.title.getText()).to.match(/Dealers/);
    expect(await dealerComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Dealers', async () => {
    const beforeRecordsCount = (await isVisible(dealerComponentsPage.noRecords)) ? 0 : await getRecordsCount(dealerComponentsPage.table);
    dealerUpdatePage = await dealerComponentsPage.goToCreateDealer();
    await dealerUpdatePage.enterData();
    expect(await isVisible(dealerUpdatePage.saveButton)).to.be.false;

    expect(await dealerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(dealerComponentsPage.table);
    await waitUntilCount(dealerComponentsPage.records, beforeRecordsCount + 1);
    expect(await dealerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await dealerComponentsPage.deleteDealer();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(dealerComponentsPage.records, beforeRecordsCount);
      expect(await dealerComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(dealerComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
