import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DepreciationMethodComponentsPage from './depreciation-method.page-object';
import DepreciationMethodUpdatePage from './depreciation-method-update.page-object';
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

describe('DepreciationMethod e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let depreciationMethodComponentsPage: DepreciationMethodComponentsPage;
  let depreciationMethodUpdatePage: DepreciationMethodUpdatePage;
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
    depreciationMethodComponentsPage = new DepreciationMethodComponentsPage();
    depreciationMethodComponentsPage = await depreciationMethodComponentsPage.goToPage(navBarPage);
  });

  it('should load DepreciationMethods', async () => {
    expect(await depreciationMethodComponentsPage.title.getText()).to.match(/Depreciation Methods/);
    expect(await depreciationMethodComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete DepreciationMethods', async () => {
    const beforeRecordsCount = (await isVisible(depreciationMethodComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(depreciationMethodComponentsPage.table);
    depreciationMethodUpdatePage = await depreciationMethodComponentsPage.goToCreateDepreciationMethod();
    await depreciationMethodUpdatePage.enterData();
    expect(await isVisible(depreciationMethodUpdatePage.saveButton)).to.be.false;

    expect(await depreciationMethodComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(depreciationMethodComponentsPage.table);
    await waitUntilCount(depreciationMethodComponentsPage.records, beforeRecordsCount + 1);
    expect(await depreciationMethodComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await depreciationMethodComponentsPage.deleteDepreciationMethod();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(depreciationMethodComponentsPage.records, beforeRecordsCount);
      expect(await depreciationMethodComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(depreciationMethodComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
