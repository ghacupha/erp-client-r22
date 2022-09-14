import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CustomerIDDocumentTypeUpdatePage from './customer-id-document-type-update.page-object';

const expect = chai.expect;
export class CustomerIDDocumentTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.customerIDDocumentType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-customerIDDocumentType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CustomerIDDocumentTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('customer-id-document-type-heading'));
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
    await navBarPage.getEntityPage('customer-id-document-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCustomerIDDocumentType() {
    await this.createButton.click();
    return new CustomerIDDocumentTypeUpdatePage();
  }

  async deleteCustomerIDDocumentType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const customerIDDocumentTypeDeleteDialog = new CustomerIDDocumentTypeDeleteDialog();
    await waitUntilDisplayed(customerIDDocumentTypeDeleteDialog.deleteModal);
    expect(await customerIDDocumentTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.customerIDDocumentType.delete.question/
    );
    await customerIDDocumentTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(customerIDDocumentTypeDeleteDialog.deleteModal);

    expect(await isVisible(customerIDDocumentTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
