import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MfbBranchCodeUpdatePage from './mfb-branch-code-update.page-object';

const expect = chai.expect;
export class MfbBranchCodeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.mfbBranchCode.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-mfbBranchCode'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MfbBranchCodeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('mfb-branch-code-heading'));
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
    await navBarPage.getEntityPage('mfb-branch-code');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMfbBranchCode() {
    await this.createButton.click();
    return new MfbBranchCodeUpdatePage();
  }

  async deleteMfbBranchCode() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const mfbBranchCodeDeleteDialog = new MfbBranchCodeDeleteDialog();
    await waitUntilDisplayed(mfbBranchCodeDeleteDialog.deleteModal);
    expect(await mfbBranchCodeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.mfbBranchCode.delete.question/);
    await mfbBranchCodeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(mfbBranchCodeDeleteDialog.deleteModal);

    expect(await isVisible(mfbBranchCodeDeleteDialog.deleteModal)).to.be.false;
  }
}
