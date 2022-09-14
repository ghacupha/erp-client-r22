import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BankBranchCodeUpdatePage from './bank-branch-code-update.page-object';

const expect = chai.expect;
export class BankBranchCodeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.bankBranchCode.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bankBranchCode'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BankBranchCodeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bank-branch-code-heading'));
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
    await navBarPage.getEntityPage('bank-branch-code');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBankBranchCode() {
    await this.createButton.click();
    return new BankBranchCodeUpdatePage();
  }

  async deleteBankBranchCode() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bankBranchCodeDeleteDialog = new BankBranchCodeDeleteDialog();
    await waitUntilDisplayed(bankBranchCodeDeleteDialog.deleteModal);
    expect(await bankBranchCodeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.bankBranchCode.delete.question/);
    await bankBranchCodeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bankBranchCodeDeleteDialog.deleteModal);

    expect(await isVisible(bankBranchCodeDeleteDialog.deleteModal)).to.be.false;
  }
}
