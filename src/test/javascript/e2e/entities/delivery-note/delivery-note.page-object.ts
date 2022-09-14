import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DeliveryNoteUpdatePage from './delivery-note-update.page-object';

const expect = chai.expect;
export class DeliveryNoteDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.deliveryNote.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-deliveryNote'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DeliveryNoteComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('delivery-note-heading'));
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
    await navBarPage.getEntityPage('delivery-note');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDeliveryNote() {
    await this.createButton.click();
    return new DeliveryNoteUpdatePage();
  }

  async deleteDeliveryNote() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const deliveryNoteDeleteDialog = new DeliveryNoteDeleteDialog();
    await waitUntilDisplayed(deliveryNoteDeleteDialog.deleteModal);
    expect(await deliveryNoteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.deliveryNote.delete.question/);
    await deliveryNoteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(deliveryNoteDeleteDialog.deleteModal);

    expect(await isVisible(deliveryNoteDeleteDialog.deleteModal)).to.be.false;
  }
}
