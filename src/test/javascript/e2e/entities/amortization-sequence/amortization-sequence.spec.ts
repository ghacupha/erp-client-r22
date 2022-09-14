import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AmortizationSequenceComponentsPage from './amortization-sequence.page-object';
import AmortizationSequenceUpdatePage from './amortization-sequence-update.page-object';
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

describe('AmortizationSequence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amortizationSequenceComponentsPage: AmortizationSequenceComponentsPage;
  let amortizationSequenceUpdatePage: AmortizationSequenceUpdatePage;
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
    amortizationSequenceComponentsPage = new AmortizationSequenceComponentsPage();
    amortizationSequenceComponentsPage = await amortizationSequenceComponentsPage.goToPage(navBarPage);
  });

  it('should load AmortizationSequences', async () => {
    expect(await amortizationSequenceComponentsPage.title.getText()).to.match(/Amortization Sequences/);
    expect(await amortizationSequenceComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete AmortizationSequences', async () => {
        const beforeRecordsCount = await isVisible(amortizationSequenceComponentsPage.noRecords) ? 0 : await getRecordsCount(amortizationSequenceComponentsPage.table);
        amortizationSequenceUpdatePage = await amortizationSequenceComponentsPage.goToCreateAmortizationSequence();
        await amortizationSequenceUpdatePage.enterData();
        expect(await isVisible(amortizationSequenceUpdatePage.saveButton)).to.be.false;

        expect(await amortizationSequenceComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(amortizationSequenceComponentsPage.table);
        await waitUntilCount(amortizationSequenceComponentsPage.records, beforeRecordsCount + 1);
        expect(await amortizationSequenceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await amortizationSequenceComponentsPage.deleteAmortizationSequence();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(amortizationSequenceComponentsPage.records, beforeRecordsCount);
          expect(await amortizationSequenceComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(amortizationSequenceComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
