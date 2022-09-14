import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CustomerIDDocumentTypeComponentsPage from './customer-id-document-type.page-object';
import CustomerIDDocumentTypeUpdatePage from './customer-id-document-type-update.page-object';
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

describe('CustomerIDDocumentType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerIDDocumentTypeComponentsPage: CustomerIDDocumentTypeComponentsPage;
  let customerIDDocumentTypeUpdatePage: CustomerIDDocumentTypeUpdatePage;
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
    customerIDDocumentTypeComponentsPage = new CustomerIDDocumentTypeComponentsPage();
    customerIDDocumentTypeComponentsPage = await customerIDDocumentTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load CustomerIDDocumentTypes', async () => {
    expect(await customerIDDocumentTypeComponentsPage.title.getText()).to.match(/Customer ID Document Types/);
    expect(await customerIDDocumentTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete CustomerIDDocumentTypes', async () => {
    const beforeRecordsCount = (await isVisible(customerIDDocumentTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(customerIDDocumentTypeComponentsPage.table);
    customerIDDocumentTypeUpdatePage = await customerIDDocumentTypeComponentsPage.goToCreateCustomerIDDocumentType();
    await customerIDDocumentTypeUpdatePage.enterData();
    expect(await isVisible(customerIDDocumentTypeUpdatePage.saveButton)).to.be.false;

    expect(await customerIDDocumentTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(customerIDDocumentTypeComponentsPage.table);
    await waitUntilCount(customerIDDocumentTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await customerIDDocumentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await customerIDDocumentTypeComponentsPage.deleteCustomerIDDocumentType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(customerIDDocumentTypeComponentsPage.records, beforeRecordsCount);
      expect(await customerIDDocumentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(customerIDDocumentTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
