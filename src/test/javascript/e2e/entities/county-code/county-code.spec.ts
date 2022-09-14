import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CountyCodeComponentsPage from './county-code.page-object';
import CountyCodeUpdatePage from './county-code-update.page-object';
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

describe('CountyCode e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let countyCodeComponentsPage: CountyCodeComponentsPage;
  let countyCodeUpdatePage: CountyCodeUpdatePage;
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
    countyCodeComponentsPage = new CountyCodeComponentsPage();
    countyCodeComponentsPage = await countyCodeComponentsPage.goToPage(navBarPage);
  });

  it('should load CountyCodes', async () => {
    expect(await countyCodeComponentsPage.title.getText()).to.match(/County Codes/);
    expect(await countyCodeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete CountyCodes', async () => {
    const beforeRecordsCount = (await isVisible(countyCodeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(countyCodeComponentsPage.table);
    countyCodeUpdatePage = await countyCodeComponentsPage.goToCreateCountyCode();
    await countyCodeUpdatePage.enterData();
    expect(await isVisible(countyCodeUpdatePage.saveButton)).to.be.false;

    expect(await countyCodeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(countyCodeComponentsPage.table);
    await waitUntilCount(countyCodeComponentsPage.records, beforeRecordsCount + 1);
    expect(await countyCodeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await countyCodeComponentsPage.deleteCountyCode();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(countyCodeComponentsPage.records, beforeRecordsCount);
      expect(await countyCodeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(countyCodeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
