import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import InstitutionCodeComponentsPage from './institution-code.page-object';
import InstitutionCodeUpdatePage from './institution-code-update.page-object';
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

describe('InstitutionCode e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let institutionCodeComponentsPage: InstitutionCodeComponentsPage;
  let institutionCodeUpdatePage: InstitutionCodeUpdatePage;
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
    institutionCodeComponentsPage = new InstitutionCodeComponentsPage();
    institutionCodeComponentsPage = await institutionCodeComponentsPage.goToPage(navBarPage);
  });

  it('should load InstitutionCodes', async () => {
    expect(await institutionCodeComponentsPage.title.getText()).to.match(/Institution Codes/);
    expect(await institutionCodeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete InstitutionCodes', async () => {
    const beforeRecordsCount = (await isVisible(institutionCodeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(institutionCodeComponentsPage.table);
    institutionCodeUpdatePage = await institutionCodeComponentsPage.goToCreateInstitutionCode();
    await institutionCodeUpdatePage.enterData();
    expect(await isVisible(institutionCodeUpdatePage.saveButton)).to.be.false;

    expect(await institutionCodeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(institutionCodeComponentsPage.table);
    await waitUntilCount(institutionCodeComponentsPage.records, beforeRecordsCount + 1);
    expect(await institutionCodeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await institutionCodeComponentsPage.deleteInstitutionCode();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(institutionCodeComponentsPage.records, beforeRecordsCount);
      expect(await institutionCodeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(institutionCodeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
