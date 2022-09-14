import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MessageTokenComponentsPage from './message-token.page-object';
import MessageTokenUpdatePage from './message-token-update.page-object';
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

describe('MessageToken e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let messageTokenComponentsPage: MessageTokenComponentsPage;
  let messageTokenUpdatePage: MessageTokenUpdatePage;
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
    messageTokenComponentsPage = new MessageTokenComponentsPage();
    messageTokenComponentsPage = await messageTokenComponentsPage.goToPage(navBarPage);
  });

  it('should load MessageTokens', async () => {
    expect(await messageTokenComponentsPage.title.getText()).to.match(/Message Tokens/);
    expect(await messageTokenComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MessageTokens', async () => {
    const beforeRecordsCount = (await isVisible(messageTokenComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(messageTokenComponentsPage.table);
    messageTokenUpdatePage = await messageTokenComponentsPage.goToCreateMessageToken();
    await messageTokenUpdatePage.enterData();
    expect(await isVisible(messageTokenUpdatePage.saveButton)).to.be.false;

    expect(await messageTokenComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(messageTokenComponentsPage.table);
    await waitUntilCount(messageTokenComponentsPage.records, beforeRecordsCount + 1);
    expect(await messageTokenComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await messageTokenComponentsPage.deleteMessageToken();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(messageTokenComponentsPage.records, beforeRecordsCount);
      expect(await messageTokenComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(messageTokenComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
