import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import TaxRuleComponentsPage from './tax-rule.page-object';
import TaxRuleUpdatePage from './tax-rule-update.page-object';
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

describe('TaxRule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taxRuleComponentsPage: TaxRuleComponentsPage;
  let taxRuleUpdatePage: TaxRuleUpdatePage;
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
    taxRuleComponentsPage = new TaxRuleComponentsPage();
    taxRuleComponentsPage = await taxRuleComponentsPage.goToPage(navBarPage);
  });

  it('should load TaxRules', async () => {
    expect(await taxRuleComponentsPage.title.getText()).to.match(/Tax Rules/);
    expect(await taxRuleComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TaxRules', async () => {
    const beforeRecordsCount = (await isVisible(taxRuleComponentsPage.noRecords)) ? 0 : await getRecordsCount(taxRuleComponentsPage.table);
    taxRuleUpdatePage = await taxRuleComponentsPage.goToCreateTaxRule();
    await taxRuleUpdatePage.enterData();
    expect(await isVisible(taxRuleUpdatePage.saveButton)).to.be.false;

    expect(await taxRuleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(taxRuleComponentsPage.table);
    await waitUntilCount(taxRuleComponentsPage.records, beforeRecordsCount + 1);
    expect(await taxRuleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await taxRuleComponentsPage.deleteTaxRule();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(taxRuleComponentsPage.records, beforeRecordsCount);
      expect(await taxRuleComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(taxRuleComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
