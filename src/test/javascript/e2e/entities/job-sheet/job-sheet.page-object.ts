import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import JobSheetUpdatePage from './job-sheet-update.page-object';

const expect = chai.expect;
export class JobSheetDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.jobSheet.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-jobSheet'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class JobSheetComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('job-sheet-heading'));
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
    await navBarPage.getEntityPage('job-sheet');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateJobSheet() {
    await this.createButton.click();
    return new JobSheetUpdatePage();
  }

  async deleteJobSheet() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const jobSheetDeleteDialog = new JobSheetDeleteDialog();
    await waitUntilDisplayed(jobSheetDeleteDialog.deleteModal);
    expect(await jobSheetDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.jobSheet.delete.question/);
    await jobSheetDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(jobSheetDeleteDialog.deleteModal);

    expect(await isVisible(jobSheetDeleteDialog.deleteModal)).to.be.false;
  }
}
