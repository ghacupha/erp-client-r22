import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import WorkInProgressTransferUpdatePage from './work-in-progress-transfer-update.page-object';

const expect = chai.expect;
export class WorkInProgressTransferDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.workInProgressTransfer.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-workInProgressTransfer'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class WorkInProgressTransferComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('work-in-progress-transfer-heading'));
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
    await navBarPage.getEntityPage('work-in-progress-transfer');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateWorkInProgressTransfer() {
    await this.createButton.click();
    return new WorkInProgressTransferUpdatePage();
  }

  async deleteWorkInProgressTransfer() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const workInProgressTransferDeleteDialog = new WorkInProgressTransferDeleteDialog();
    await waitUntilDisplayed(workInProgressTransferDeleteDialog.deleteModal);
    expect(await workInProgressTransferDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.workInProgressTransfer.delete.question/
    );
    await workInProgressTransferDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(workInProgressTransferDeleteDialog.deleteModal);

    expect(await isVisible(workInProgressTransferDeleteDialog.deleteModal)).to.be.false;
  }
}
