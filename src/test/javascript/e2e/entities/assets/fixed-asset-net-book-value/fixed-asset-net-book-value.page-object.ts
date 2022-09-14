import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import FixedAssetNetBookValueUpdatePage from './fixed-asset-net-book-value-update.page-object';

const expect = chai.expect;
export class FixedAssetNetBookValueDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.assetsFixedAssetNetBookValue.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fixedAssetNetBookValue'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FixedAssetNetBookValueComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('fixed-asset-net-book-value-heading'));
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
    await navBarPage.getEntityPage('fixed-asset-net-book-value');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFixedAssetNetBookValue() {
    await this.createButton.click();
    return new FixedAssetNetBookValueUpdatePage();
  }

  async deleteFixedAssetNetBookValue() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fixedAssetNetBookValueDeleteDialog = new FixedAssetNetBookValueDeleteDialog();
    await waitUntilDisplayed(fixedAssetNetBookValueDeleteDialog.deleteModal);
    expect(await fixedAssetNetBookValueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.assetsFixedAssetNetBookValue.delete.question/
    );
    await fixedAssetNetBookValueDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fixedAssetNetBookValueDeleteDialog.deleteModal);

    expect(await isVisible(fixedAssetNetBookValueDeleteDialog.deleteModal)).to.be.false;
  }
}
