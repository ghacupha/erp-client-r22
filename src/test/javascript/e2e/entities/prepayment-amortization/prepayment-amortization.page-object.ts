import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PrepaymentAmortizationUpdatePage from './prepayment-amortization-update.page-object';

const expect = chai.expect;
export class PrepaymentAmortizationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentAmortization.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-prepaymentAmortization'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepaymentAmortizationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prepayment-amortization-heading'));
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
    await navBarPage.getEntityPage('prepayment-amortization');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepaymentAmortization() {
    await this.createButton.click();
    return new PrepaymentAmortizationUpdatePage();
  }

  async deletePrepaymentAmortization() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepaymentAmortizationDeleteDialog = new PrepaymentAmortizationDeleteDialog();
    await waitUntilDisplayed(prepaymentAmortizationDeleteDialog.deleteModal);
    expect(await prepaymentAmortizationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.prepaymentAmortization.delete.question/
    );
    await prepaymentAmortizationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepaymentAmortizationDeleteDialog.deleteModal);

    expect(await isVisible(prepaymentAmortizationDeleteDialog.deleteModal)).to.be.false;
  }
}
