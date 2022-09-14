import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CreditNoteUpdatePage from './credit-note-update.page-object';

const expect = chai.expect;
export class CreditNoteDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.creditNote.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-creditNote'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CreditNoteComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('credit-note-heading'));
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
    await navBarPage.getEntityPage('credit-note');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCreditNote() {
    await this.createButton.click();
    return new CreditNoteUpdatePage();
  }

  async deleteCreditNote() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const creditNoteDeleteDialog = new CreditNoteDeleteDialog();
    await waitUntilDisplayed(creditNoteDeleteDialog.deleteModal);
    expect(await creditNoteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.creditNote.delete.question/);
    await creditNoteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(creditNoteDeleteDialog.deleteModal);

    expect(await isVisible(creditNoteDeleteDialog.deleteModal)).to.be.false;
  }
}
