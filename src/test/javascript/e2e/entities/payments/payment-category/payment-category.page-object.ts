import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import PaymentCategoryUpdatePage from './payment-category-update.page-object';

const expect = chai.expect;
export class PaymentCategoryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsPaymentCategory.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-paymentCategory'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PaymentCategoryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('payment-category-heading'));
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
    await navBarPage.getEntityPage('payment-category');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePaymentCategory() {
    await this.createButton.click();
    return new PaymentCategoryUpdatePage();
  }

  async deletePaymentCategory() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const paymentCategoryDeleteDialog = new PaymentCategoryDeleteDialog();
    await waitUntilDisplayed(paymentCategoryDeleteDialog.deleteModal);
    expect(await paymentCategoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.paymentsPaymentCategory.delete.question/
    );
    await paymentCategoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(paymentCategoryDeleteDialog.deleteModal);

    expect(await isVisible(paymentCategoryDeleteDialog.deleteModal)).to.be.false;
  }
}
