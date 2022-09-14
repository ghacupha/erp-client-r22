import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SubCountyCodeUpdatePage from './sub-county-code-update.page-object';

const expect = chai.expect;
export class SubCountyCodeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.subCountyCode.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-subCountyCode'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SubCountyCodeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('sub-county-code-heading'));
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
    await navBarPage.getEntityPage('sub-county-code');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSubCountyCode() {
    await this.createButton.click();
    return new SubCountyCodeUpdatePage();
  }

  async deleteSubCountyCode() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const subCountyCodeDeleteDialog = new SubCountyCodeDeleteDialog();
    await waitUntilDisplayed(subCountyCodeDeleteDialog.deleteModal);
    expect(await subCountyCodeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.subCountyCode.delete.question/);
    await subCountyCodeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(subCountyCodeDeleteDialog.deleteModal);

    expect(await isVisible(subCountyCodeDeleteDialog.deleteModal)).to.be.false;
  }
}
