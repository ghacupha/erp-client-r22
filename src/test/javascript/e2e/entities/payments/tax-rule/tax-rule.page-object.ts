import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import TaxRuleUpdatePage from './tax-rule-update.page-object';

const expect = chai.expect;
export class TaxRuleDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsTaxRule.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-taxRule'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TaxRuleComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('tax-rule-heading'));
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
    await navBarPage.getEntityPage('tax-rule');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTaxRule() {
    await this.createButton.click();
    return new TaxRuleUpdatePage();
  }

  async deleteTaxRule() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const taxRuleDeleteDialog = new TaxRuleDeleteDialog();
    await waitUntilDisplayed(taxRuleDeleteDialog.deleteModal);
    expect(await taxRuleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.paymentsTaxRule.delete.question/);
    await taxRuleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(taxRuleDeleteDialog.deleteModal);

    expect(await isVisible(taxRuleDeleteDialog.deleteModal)).to.be.false;
  }
}
