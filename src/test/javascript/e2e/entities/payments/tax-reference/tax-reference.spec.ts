import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import TaxReferenceComponentsPage from './tax-reference.page-object';
import TaxReferenceUpdatePage from './tax-reference-update.page-object';
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

describe('TaxReference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taxReferenceComponentsPage: TaxReferenceComponentsPage;
  let taxReferenceUpdatePage: TaxReferenceUpdatePage;
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
    taxReferenceComponentsPage = new TaxReferenceComponentsPage();
    taxReferenceComponentsPage = await taxReferenceComponentsPage.goToPage(navBarPage);
  });

  it('should load TaxReferences', async () => {
    expect(await taxReferenceComponentsPage.title.getText()).to.match(/Tax References/);
    expect(await taxReferenceComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TaxReferences', async () => {
    const beforeRecordsCount = (await isVisible(taxReferenceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(taxReferenceComponentsPage.table);
    taxReferenceUpdatePage = await taxReferenceComponentsPage.goToCreateTaxReference();
    await taxReferenceUpdatePage.enterData();
    expect(await isVisible(taxReferenceUpdatePage.saveButton)).to.be.false;

    expect(await taxReferenceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(taxReferenceComponentsPage.table);
    await waitUntilCount(taxReferenceComponentsPage.records, beforeRecordsCount + 1);
    expect(await taxReferenceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await taxReferenceComponentsPage.deleteTaxReference();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(taxReferenceComponentsPage.records, beforeRecordsCount);
      expect(await taxReferenceComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(taxReferenceComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
