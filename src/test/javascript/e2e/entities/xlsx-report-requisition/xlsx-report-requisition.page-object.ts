import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import XlsxReportRequisitionUpdatePage from './xlsx-report-requisition-update.page-object';

const expect = chai.expect;
export class XlsxReportRequisitionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.xlsxReportRequisition.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-xlsxReportRequisition'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class XlsxReportRequisitionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('xlsx-report-requisition-heading'));
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
    await navBarPage.getEntityPage('xlsx-report-requisition');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateXlsxReportRequisition() {
    await this.createButton.click();
    return new XlsxReportRequisitionUpdatePage();
  }

  async deleteXlsxReportRequisition() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const xlsxReportRequisitionDeleteDialog = new XlsxReportRequisitionDeleteDialog();
    await waitUntilDisplayed(xlsxReportRequisitionDeleteDialog.deleteModal);
    expect(await xlsxReportRequisitionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.xlsxReportRequisition.delete.question/
    );
    await xlsxReportRequisitionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(xlsxReportRequisitionDeleteDialog.deleteModal);

    expect(await isVisible(xlsxReportRequisitionDeleteDialog.deleteModal)).to.be.false;
  }
}
