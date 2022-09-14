import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UniversallyUniqueMappingComponentsPage from './universally-unique-mapping.page-object';
import UniversallyUniqueMappingUpdatePage from './universally-unique-mapping-update.page-object';
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

describe('UniversallyUniqueMapping e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let universallyUniqueMappingComponentsPage: UniversallyUniqueMappingComponentsPage;
  let universallyUniqueMappingUpdatePage: UniversallyUniqueMappingUpdatePage;
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
    universallyUniqueMappingComponentsPage = new UniversallyUniqueMappingComponentsPage();
    universallyUniqueMappingComponentsPage = await universallyUniqueMappingComponentsPage.goToPage(navBarPage);
  });

  it('should load UniversallyUniqueMappings', async () => {
    expect(await universallyUniqueMappingComponentsPage.title.getText()).to.match(/Universally Unique Mappings/);
    expect(await universallyUniqueMappingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete UniversallyUniqueMappings', async () => {
    const beforeRecordsCount = (await isVisible(universallyUniqueMappingComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(universallyUniqueMappingComponentsPage.table);
    universallyUniqueMappingUpdatePage = await universallyUniqueMappingComponentsPage.goToCreateUniversallyUniqueMapping();
    await universallyUniqueMappingUpdatePage.enterData();
    expect(await isVisible(universallyUniqueMappingUpdatePage.saveButton)).to.be.false;

    expect(await universallyUniqueMappingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(universallyUniqueMappingComponentsPage.table);
    await waitUntilCount(universallyUniqueMappingComponentsPage.records, beforeRecordsCount + 1);
    expect(await universallyUniqueMappingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await universallyUniqueMappingComponentsPage.deleteUniversallyUniqueMapping();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(universallyUniqueMappingComponentsPage.records, beforeRecordsCount);
      expect(await universallyUniqueMappingComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(universallyUniqueMappingComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
