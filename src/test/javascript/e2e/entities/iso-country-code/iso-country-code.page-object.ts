import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import IsoCountryCodeUpdatePage from './iso-country-code-update.page-object';

const expect = chai.expect;
export class IsoCountryCodeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.isoCountryCode.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-isoCountryCode'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class IsoCountryCodeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('iso-country-code-heading'));
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
    await navBarPage.getEntityPage('iso-country-code');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateIsoCountryCode() {
    await this.createButton.click();
    return new IsoCountryCodeUpdatePage();
  }

  async deleteIsoCountryCode() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const isoCountryCodeDeleteDialog = new IsoCountryCodeDeleteDialog();
    await waitUntilDisplayed(isoCountryCodeDeleteDialog.deleteModal);
    expect(await isoCountryCodeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.isoCountryCode.delete.question/);
    await isoCountryCodeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(isoCountryCodeDeleteDialog.deleteModal);

    expect(await isVisible(isoCountryCodeDeleteDialog.deleteModal)).to.be.false;
  }
}
