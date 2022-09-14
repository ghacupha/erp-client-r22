import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PaymentLabelUpdatePage from './payment-label-update.page-object';

const expect = chai.expect;
export class PaymentLabelDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.paymentLabel.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-paymentLabel'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PaymentLabelComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('payment-label-heading'));
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
    await navBarPage.getEntityPage('payment-label');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePaymentLabel() {
    await this.createButton.click();
    return new PaymentLabelUpdatePage();
  }

  async deletePaymentLabel() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const paymentLabelDeleteDialog = new PaymentLabelDeleteDialog();
    await waitUntilDisplayed(paymentLabelDeleteDialog.deleteModal);
    expect(await paymentLabelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.paymentLabel.delete.question/);
    await paymentLabelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(paymentLabelDeleteDialog.deleteModal);

    expect(await isVisible(paymentLabelDeleteDialog.deleteModal)).to.be.false;
  }
}
