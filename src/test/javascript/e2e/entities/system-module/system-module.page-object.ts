import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SystemModuleUpdatePage from './system-module-update.page-object';

const expect = chai.expect;
export class SystemModuleDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.systemModule.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-systemModule'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SystemModuleComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('system-module-heading'));
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
    await navBarPage.getEntityPage('system-module');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSystemModule() {
    await this.createButton.click();
    return new SystemModuleUpdatePage();
  }

  async deleteSystemModule() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const systemModuleDeleteDialog = new SystemModuleDeleteDialog();
    await waitUntilDisplayed(systemModuleDeleteDialog.deleteModal);
    expect(await systemModuleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.systemModule.delete.question/);
    await systemModuleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(systemModuleDeleteDialog.deleteModal);

    expect(await isVisible(systemModuleDeleteDialog.deleteModal)).to.be.false;
  }
}
