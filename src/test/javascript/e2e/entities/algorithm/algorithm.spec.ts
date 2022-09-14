import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AlgorithmComponentsPage from './algorithm.page-object';
import AlgorithmUpdatePage from './algorithm-update.page-object';
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

describe('Algorithm e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let algorithmComponentsPage: AlgorithmComponentsPage;
  let algorithmUpdatePage: AlgorithmUpdatePage;
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
    algorithmComponentsPage = new AlgorithmComponentsPage();
    algorithmComponentsPage = await algorithmComponentsPage.goToPage(navBarPage);
  });

  it('should load Algorithms', async () => {
    expect(await algorithmComponentsPage.title.getText()).to.match(/Algorithms/);
    expect(await algorithmComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Algorithms', async () => {
    const beforeRecordsCount = (await isVisible(algorithmComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(algorithmComponentsPage.table);
    algorithmUpdatePage = await algorithmComponentsPage.goToCreateAlgorithm();
    await algorithmUpdatePage.enterData();
    expect(await isVisible(algorithmUpdatePage.saveButton)).to.be.false;

    expect(await algorithmComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(algorithmComponentsPage.table);
    await waitUntilCount(algorithmComponentsPage.records, beforeRecordsCount + 1);
    expect(await algorithmComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await algorithmComponentsPage.deleteAlgorithm();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(algorithmComponentsPage.records, beforeRecordsCount);
      expect(await algorithmComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(algorithmComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
