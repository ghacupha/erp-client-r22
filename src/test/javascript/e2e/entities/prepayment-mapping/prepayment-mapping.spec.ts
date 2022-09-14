import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrepaymentMappingComponentsPage from './prepayment-mapping.page-object';
import PrepaymentMappingUpdatePage from './prepayment-mapping-update.page-object';
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

describe('PrepaymentMapping e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentMappingComponentsPage: PrepaymentMappingComponentsPage;
  let prepaymentMappingUpdatePage: PrepaymentMappingUpdatePage;
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
    prepaymentMappingComponentsPage = new PrepaymentMappingComponentsPage();
    prepaymentMappingComponentsPage = await prepaymentMappingComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepaymentMappings', async () => {
    expect(await prepaymentMappingComponentsPage.title.getText()).to.match(/Prepayment Mappings/);
    expect(await prepaymentMappingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PrepaymentMappings', async () => {
    const beforeRecordsCount = (await isVisible(prepaymentMappingComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prepaymentMappingComponentsPage.table);
    prepaymentMappingUpdatePage = await prepaymentMappingComponentsPage.goToCreatePrepaymentMapping();
    await prepaymentMappingUpdatePage.enterData();
    expect(await isVisible(prepaymentMappingUpdatePage.saveButton)).to.be.false;

    expect(await prepaymentMappingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prepaymentMappingComponentsPage.table);
    await waitUntilCount(prepaymentMappingComponentsPage.records, beforeRecordsCount + 1);
    expect(await prepaymentMappingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prepaymentMappingComponentsPage.deletePrepaymentMapping();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prepaymentMappingComponentsPage.records, beforeRecordsCount);
      expect(await prepaymentMappingComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prepaymentMappingComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
