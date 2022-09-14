import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AmortizationSequenceUpdatePage from './amortization-sequence-update.page-object';

const expect = chai.expect;
export class AmortizationSequenceDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.amortizationSequence.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-amortizationSequence'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AmortizationSequenceComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('amortization-sequence-heading'));
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
    await navBarPage.getEntityPage('amortization-sequence');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAmortizationSequence() {
    await this.createButton.click();
    return new AmortizationSequenceUpdatePage();
  }

  async deleteAmortizationSequence() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const amortizationSequenceDeleteDialog = new AmortizationSequenceDeleteDialog();
    await waitUntilDisplayed(amortizationSequenceDeleteDialog.deleteModal);
    expect(await amortizationSequenceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.amortizationSequence.delete.question/
    );
    await amortizationSequenceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(amortizationSequenceDeleteDialog.deleteModal);

    expect(await isVisible(amortizationSequenceDeleteDialog.deleteModal)).to.be.false;
  }
}
