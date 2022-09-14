import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SettlementComponentsPage from './settlement.page-object';
import SettlementUpdatePage from './settlement-update.page-object';
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

describe('Settlement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let settlementComponentsPage: SettlementComponentsPage;
  let settlementUpdatePage: SettlementUpdatePage;
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
    settlementComponentsPage = new SettlementComponentsPage();
    settlementComponentsPage = await settlementComponentsPage.goToPage(navBarPage);
  });

  it('should load Settlements', async () => {
    expect(await settlementComponentsPage.title.getText()).to.match(/Settlements/);
    expect(await settlementComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete Settlements', async () => {
        const beforeRecordsCount = await isVisible(settlementComponentsPage.noRecords) ? 0 : await getRecordsCount(settlementComponentsPage.table);
        settlementUpdatePage = await settlementComponentsPage.goToCreateSettlement();
        await settlementUpdatePage.enterData();
        expect(await isVisible(settlementUpdatePage.saveButton)).to.be.false;

        expect(await settlementComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(settlementComponentsPage.table);
        await waitUntilCount(settlementComponentsPage.records, beforeRecordsCount + 1);
        expect(await settlementComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await settlementComponentsPage.deleteSettlement();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(settlementComponentsPage.records, beforeRecordsCount);
          expect(await settlementComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(settlementComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
