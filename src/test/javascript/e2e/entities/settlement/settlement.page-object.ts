import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SettlementUpdatePage from './settlement-update.page-object';

const expect = chai.expect;
export class SettlementDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.settlement.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-settlement'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SettlementComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('settlement-heading'));
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
    await navBarPage.getEntityPage('settlement');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSettlement() {
    await this.createButton.click();
    return new SettlementUpdatePage();
  }

  async deleteSettlement() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const settlementDeleteDialog = new SettlementDeleteDialog();
    await waitUntilDisplayed(settlementDeleteDialog.deleteModal);
    expect(await settlementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.settlement.delete.question/);
    await settlementDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(settlementDeleteDialog.deleteModal);

    expect(await isVisible(settlementDeleteDialog.deleteModal)).to.be.false;
  }
}
