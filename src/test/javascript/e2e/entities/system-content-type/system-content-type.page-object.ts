import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SystemContentTypeUpdatePage from './system-content-type-update.page-object';

const expect = chai.expect;
export class SystemContentTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.systemContentType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-systemContentType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SystemContentTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('system-content-type-heading'));
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
    await navBarPage.getEntityPage('system-content-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSystemContentType() {
    await this.createButton.click();
    return new SystemContentTypeUpdatePage();
  }

  async deleteSystemContentType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const systemContentTypeDeleteDialog = new SystemContentTypeDeleteDialog();
    await waitUntilDisplayed(systemContentTypeDeleteDialog.deleteModal);
    expect(await systemContentTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.systemContentType.delete.question/
    );
    await systemContentTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(systemContentTypeDeleteDialog.deleteModal);

    expect(await isVisible(systemContentTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
