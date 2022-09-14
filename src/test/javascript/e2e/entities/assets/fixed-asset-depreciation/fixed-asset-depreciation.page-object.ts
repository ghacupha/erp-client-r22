import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import FixedAssetDepreciationUpdatePage from './fixed-asset-depreciation-update.page-object';

const expect = chai.expect;
export class FixedAssetDepreciationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.assetsFixedAssetDepreciation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fixedAssetDepreciation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FixedAssetDepreciationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('fixed-asset-depreciation-heading'));
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
    await navBarPage.getEntityPage('fixed-asset-depreciation');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFixedAssetDepreciation() {
    await this.createButton.click();
    return new FixedAssetDepreciationUpdatePage();
  }

  async deleteFixedAssetDepreciation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fixedAssetDepreciationDeleteDialog = new FixedAssetDepreciationDeleteDialog();
    await waitUntilDisplayed(fixedAssetDepreciationDeleteDialog.deleteModal);
    expect(await fixedAssetDepreciationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.assetsFixedAssetDepreciation.delete.question/
    );
    await fixedAssetDepreciationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fixedAssetDepreciationDeleteDialog.deleteModal);

    expect(await isVisible(fixedAssetDepreciationDeleteDialog.deleteModal)).to.be.false;
  }
}
