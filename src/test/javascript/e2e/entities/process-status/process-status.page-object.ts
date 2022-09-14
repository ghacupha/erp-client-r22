import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProcessStatusUpdatePage from './process-status-update.page-object';

const expect = chai.expect;
export class ProcessStatusDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.processStatus.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-processStatus'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProcessStatusComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('process-status-heading'));
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
    await navBarPage.getEntityPage('process-status');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProcessStatus() {
    await this.createButton.click();
    return new ProcessStatusUpdatePage();
  }

  async deleteProcessStatus() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const processStatusDeleteDialog = new ProcessStatusDeleteDialog();
    await waitUntilDisplayed(processStatusDeleteDialog.deleteModal);
    expect(await processStatusDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.processStatus.delete.question/);
    await processStatusDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(processStatusDeleteDialog.deleteModal);

    expect(await isVisible(processStatusDeleteDialog.deleteModal)).to.be.false;
  }
}
