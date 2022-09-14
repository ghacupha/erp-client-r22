import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import FileTypeComponentsPage from './file-type.page-object';
import FileTypeUpdatePage from './file-type-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('FileType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fileTypeComponentsPage: FileTypeComponentsPage;
  let fileTypeUpdatePage: FileTypeUpdatePage;
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
    fileTypeComponentsPage = new FileTypeComponentsPage();
    fileTypeComponentsPage = await fileTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load FileTypes', async () => {
    expect(await fileTypeComponentsPage.title.getText()).to.match(/File Types/);
    expect(await fileTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FileTypes', async () => {
    const beforeRecordsCount = (await isVisible(fileTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fileTypeComponentsPage.table);
    fileTypeUpdatePage = await fileTypeComponentsPage.goToCreateFileType();
    await fileTypeUpdatePage.enterData();
    expect(await isVisible(fileTypeUpdatePage.saveButton)).to.be.false;

    expect(await fileTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fileTypeComponentsPage.table);
    await waitUntilCount(fileTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await fileTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fileTypeComponentsPage.deleteFileType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fileTypeComponentsPage.records, beforeRecordsCount);
      expect(await fileTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fileTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
