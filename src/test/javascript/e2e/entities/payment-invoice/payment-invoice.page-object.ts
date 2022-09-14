import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PaymentInvoiceUpdatePage from './payment-invoice-update.page-object';

const expect = chai.expect;
export class PaymentInvoiceDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.paymentInvoice.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-paymentInvoice'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PaymentInvoiceComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('payment-invoice-heading'));
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
    await navBarPage.getEntityPage('payment-invoice');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePaymentInvoice() {
    await this.createButton.click();
    return new PaymentInvoiceUpdatePage();
  }

  async deletePaymentInvoice() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const paymentInvoiceDeleteDialog = new PaymentInvoiceDeleteDialog();
    await waitUntilDisplayed(paymentInvoiceDeleteDialog.deleteModal);
    expect(await paymentInvoiceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.paymentInvoice.delete.question/);
    await paymentInvoiceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(paymentInvoiceDeleteDialog.deleteModal);

    expect(await isVisible(paymentInvoiceDeleteDialog.deleteModal)).to.be.false;
  }
}
