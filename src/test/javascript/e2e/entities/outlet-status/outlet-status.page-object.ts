import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import OutletStatusUpdatePage from './outlet-status-update.page-object';

const expect = chai.expect;
export class OutletStatusDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.outletStatus.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-outletStatus'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class OutletStatusComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('outlet-status-heading'));
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
    await navBarPage.getEntityPage('outlet-status');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateOutletStatus() {
    await this.createButton.click();
    return new OutletStatusUpdatePage();
  }

  async deleteOutletStatus() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const outletStatusDeleteDialog = new OutletStatusDeleteDialog();
    await waitUntilDisplayed(outletStatusDeleteDialog.deleteModal);
    expect(await outletStatusDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.outletStatus.delete.question/);
    await outletStatusDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(outletStatusDeleteDialog.deleteModal);

    expect(await isVisible(outletStatusDeleteDialog.deleteModal)).to.be.false;
  }
}
