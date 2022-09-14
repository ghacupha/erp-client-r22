import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BusinessStampUpdatePage from './business-stamp-update.page-object';

const expect = chai.expect;
export class BusinessStampDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.businessStamp.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-businessStamp'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BusinessStampComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('business-stamp-heading'));
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
    await navBarPage.getEntityPage('business-stamp');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBusinessStamp() {
    await this.createButton.click();
    return new BusinessStampUpdatePage();
  }

  async deleteBusinessStamp() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const businessStampDeleteDialog = new BusinessStampDeleteDialog();
    await waitUntilDisplayed(businessStampDeleteDialog.deleteModal);
    expect(await businessStampDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.businessStamp.delete.question/);
    await businessStampDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(businessStampDeleteDialog.deleteModal);

    expect(await isVisible(businessStampDeleteDialog.deleteModal)).to.be.false;
  }
}
