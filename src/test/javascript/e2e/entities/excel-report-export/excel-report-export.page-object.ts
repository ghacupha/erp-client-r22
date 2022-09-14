import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ExcelReportExportUpdatePage from './excel-report-export-update.page-object';

const expect = chai.expect;
export class ExcelReportExportDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.excelReportExport.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-excelReportExport'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ExcelReportExportComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('excel-report-export-heading'));
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
    await navBarPage.getEntityPage('excel-report-export');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateExcelReportExport() {
    await this.createButton.click();
    return new ExcelReportExportUpdatePage();
  }

  async deleteExcelReportExport() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const excelReportExportDeleteDialog = new ExcelReportExportDeleteDialog();
    await waitUntilDisplayed(excelReportExportDeleteDialog.deleteModal);
    expect(await excelReportExportDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.excelReportExport.delete.question/
    );
    await excelReportExportDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(excelReportExportDeleteDialog.deleteModal);

    expect(await isVisible(excelReportExportDeleteDialog.deleteModal)).to.be.false;
  }
}
