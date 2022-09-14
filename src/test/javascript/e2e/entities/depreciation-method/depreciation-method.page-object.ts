import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DepreciationMethodUpdatePage from './depreciation-method-update.page-object';

const expect = chai.expect;
export class DepreciationMethodDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.depreciationMethod.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-depreciationMethod'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DepreciationMethodComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('depreciation-method-heading'));
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
    await navBarPage.getEntityPage('depreciation-method');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDepreciationMethod() {
    await this.createButton.click();
    return new DepreciationMethodUpdatePage();
  }

  async deleteDepreciationMethod() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const depreciationMethodDeleteDialog = new DepreciationMethodDeleteDialog();
    await waitUntilDisplayed(depreciationMethodDeleteDialog.deleteModal);
    expect(await depreciationMethodDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.depreciationMethod.delete.question/
    );
    await depreciationMethodDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(depreciationMethodDeleteDialog.deleteModal);

    expect(await isVisible(depreciationMethodDeleteDialog.deleteModal)).to.be.false;
  }
}
