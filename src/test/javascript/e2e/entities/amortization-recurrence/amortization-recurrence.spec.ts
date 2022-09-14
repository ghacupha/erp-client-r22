import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AmortizationRecurrenceComponentsPage from './amortization-recurrence.page-object';
import AmortizationRecurrenceUpdatePage from './amortization-recurrence-update.page-object';
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

describe('AmortizationRecurrence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amortizationRecurrenceComponentsPage: AmortizationRecurrenceComponentsPage;
  let amortizationRecurrenceUpdatePage: AmortizationRecurrenceUpdatePage;
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
    amortizationRecurrenceComponentsPage = new AmortizationRecurrenceComponentsPage();
    amortizationRecurrenceComponentsPage = await amortizationRecurrenceComponentsPage.goToPage(navBarPage);
  });

  it('should load AmortizationRecurrences', async () => {
    expect(await amortizationRecurrenceComponentsPage.title.getText()).to.match(/Amortization Recurrences/);
    expect(await amortizationRecurrenceComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete AmortizationRecurrences', async () => {
        const beforeRecordsCount = await isVisible(amortizationRecurrenceComponentsPage.noRecords) ? 0 : await getRecordsCount(amortizationRecurrenceComponentsPage.table);
        amortizationRecurrenceUpdatePage = await amortizationRecurrenceComponentsPage.goToCreateAmortizationRecurrence();
        await amortizationRecurrenceUpdatePage.enterData();
        expect(await isVisible(amortizationRecurrenceUpdatePage.saveButton)).to.be.false;

        expect(await amortizationRecurrenceComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(amortizationRecurrenceComponentsPage.table);
        await waitUntilCount(amortizationRecurrenceComponentsPage.records, beforeRecordsCount + 1);
        expect(await amortizationRecurrenceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await amortizationRecurrenceComponentsPage.deleteAmortizationRecurrence();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(amortizationRecurrenceComponentsPage.records, beforeRecordsCount);
          expect(await amortizationRecurrenceComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(amortizationRecurrenceComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
