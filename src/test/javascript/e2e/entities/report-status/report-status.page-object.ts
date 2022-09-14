import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ReportStatusUpdatePage from './report-status-update.page-object';

const expect = chai.expect;
export class ReportStatusDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.reportStatus.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-reportStatus'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ReportStatusComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('report-status-heading'));
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
    await navBarPage.getEntityPage('report-status');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateReportStatus() {
    await this.createButton.click();
    return new ReportStatusUpdatePage();
  }

  async deleteReportStatus() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const reportStatusDeleteDialog = new ReportStatusDeleteDialog();
    await waitUntilDisplayed(reportStatusDeleteDialog.deleteModal);
    expect(await reportStatusDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.reportStatus.delete.question/);
    await reportStatusDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(reportStatusDeleteDialog.deleteModal);

    expect(await isVisible(reportStatusDeleteDialog.deleteModal)).to.be.false;
  }
}
