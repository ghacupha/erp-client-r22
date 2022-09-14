import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import FileUploadComponentsPage from './file-upload.page-object';
import FileUploadUpdatePage from './file-upload-update.page-object';
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

describe('FileUpload e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fileUploadComponentsPage: FileUploadComponentsPage;
  let fileUploadUpdatePage: FileUploadUpdatePage;
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
    fileUploadComponentsPage = new FileUploadComponentsPage();
    fileUploadComponentsPage = await fileUploadComponentsPage.goToPage(navBarPage);
  });

  it('should load FileUploads', async () => {
    expect(await fileUploadComponentsPage.title.getText()).to.match(/File Uploads/);
    expect(await fileUploadComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FileUploads', async () => {
    const beforeRecordsCount = (await isVisible(fileUploadComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fileUploadComponentsPage.table);
    fileUploadUpdatePage = await fileUploadComponentsPage.goToCreateFileUpload();
    await fileUploadUpdatePage.enterData();
    expect(await isVisible(fileUploadUpdatePage.saveButton)).to.be.false;

    expect(await fileUploadComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fileUploadComponentsPage.table);
    await waitUntilCount(fileUploadComponentsPage.records, beforeRecordsCount + 1);
    expect(await fileUploadComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fileUploadComponentsPage.deleteFileUpload();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fileUploadComponentsPage.records, beforeRecordsCount);
      expect(await fileUploadComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fileUploadComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
