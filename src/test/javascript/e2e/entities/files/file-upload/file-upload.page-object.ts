import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import FileUploadUpdatePage from './file-upload-update.page-object';

const expect = chai.expect;
export class FileUploadDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.filesFileUpload.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fileUpload'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FileUploadComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('file-upload-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('file-upload');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFileUpload() {
    await this.createButton.click();
    return new FileUploadUpdatePage();
  }

  async deleteFileUpload() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fileUploadDeleteDialog = new FileUploadDeleteDialog();
    await waitUntilDisplayed(fileUploadDeleteDialog.deleteModal);
    expect(await fileUploadDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.filesFileUpload.delete.question/);
    await fileUploadDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fileUploadDeleteDialog.deleteModal);

    expect(await isVisible(fileUploadDeleteDialog.deleteModal)).to.be.false;
  }
}
