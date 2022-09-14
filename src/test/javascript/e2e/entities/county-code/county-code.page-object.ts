import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CountyCodeUpdatePage from './county-code-update.page-object';

const expect = chai.expect;
export class CountyCodeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.countyCode.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-countyCode'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CountyCodeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('county-code-heading'));
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
    await navBarPage.getEntityPage('county-code');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCountyCode() {
    await this.createButton.click();
    return new CountyCodeUpdatePage();
  }

  async deleteCountyCode() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const countyCodeDeleteDialog = new CountyCodeDeleteDialog();
    await waitUntilDisplayed(countyCodeDeleteDialog.deleteModal);
    expect(await countyCodeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.countyCode.delete.question/);
    await countyCodeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(countyCodeDeleteDialog.deleteModal);

    expect(await isVisible(countyCodeDeleteDialog.deleteModal)).to.be.false;
  }
}
