import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SubCountyCodeComponentsPage from './sub-county-code.page-object';
import SubCountyCodeUpdatePage from './sub-county-code-update.page-object';
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

describe('SubCountyCode e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subCountyCodeComponentsPage: SubCountyCodeComponentsPage;
  let subCountyCodeUpdatePage: SubCountyCodeUpdatePage;
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
    subCountyCodeComponentsPage = new SubCountyCodeComponentsPage();
    subCountyCodeComponentsPage = await subCountyCodeComponentsPage.goToPage(navBarPage);
  });

  it('should load SubCountyCodes', async () => {
    expect(await subCountyCodeComponentsPage.title.getText()).to.match(/Sub County Codes/);
    expect(await subCountyCodeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SubCountyCodes', async () => {
    const beforeRecordsCount = (await isVisible(subCountyCodeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(subCountyCodeComponentsPage.table);
    subCountyCodeUpdatePage = await subCountyCodeComponentsPage.goToCreateSubCountyCode();
    await subCountyCodeUpdatePage.enterData();
    expect(await isVisible(subCountyCodeUpdatePage.saveButton)).to.be.false;

    expect(await subCountyCodeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(subCountyCodeComponentsPage.table);
    await waitUntilCount(subCountyCodeComponentsPage.records, beforeRecordsCount + 1);
    expect(await subCountyCodeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await subCountyCodeComponentsPage.deleteSubCountyCode();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(subCountyCodeComponentsPage.records, beforeRecordsCount);
      expect(await subCountyCodeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(subCountyCodeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
