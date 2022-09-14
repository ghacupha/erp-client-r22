import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import FixedAssetAcquisitionUpdatePage from './fixed-asset-acquisition-update.page-object';

const expect = chai.expect;
export class FixedAssetAcquisitionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.assetsFixedAssetAcquisition.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fixedAssetAcquisition'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FixedAssetAcquisitionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('fixed-asset-acquisition-heading'));
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
    await navBarPage.getEntityPage('fixed-asset-acquisition');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFixedAssetAcquisition() {
    await this.createButton.click();
    return new FixedAssetAcquisitionUpdatePage();
  }

  async deleteFixedAssetAcquisition() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fixedAssetAcquisitionDeleteDialog = new FixedAssetAcquisitionDeleteDialog();
    await waitUntilDisplayed(fixedAssetAcquisitionDeleteDialog.deleteModal);
    expect(await fixedAssetAcquisitionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.assetsFixedAssetAcquisition.delete.question/
    );
    await fixedAssetAcquisitionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fixedAssetAcquisitionDeleteDialog.deleteModal);

    expect(await isVisible(fixedAssetAcquisitionDeleteDialog.deleteModal)).to.be.false;
  }
}
