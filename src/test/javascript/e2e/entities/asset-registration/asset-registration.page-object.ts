import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AssetRegistrationUpdatePage from './asset-registration-update.page-object';

const expect = chai.expect;
export class AssetRegistrationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.assetRegistration.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-assetRegistration'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AssetRegistrationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('asset-registration-heading'));
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
    await navBarPage.getEntityPage('asset-registration');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAssetRegistration() {
    await this.createButton.click();
    return new AssetRegistrationUpdatePage();
  }

  async deleteAssetRegistration() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const assetRegistrationDeleteDialog = new AssetRegistrationDeleteDialog();
    await waitUntilDisplayed(assetRegistrationDeleteDialog.deleteModal);
    expect(await assetRegistrationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.assetRegistration.delete.question/
    );
    await assetRegistrationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(assetRegistrationDeleteDialog.deleteModal);

    expect(await isVisible(assetRegistrationDeleteDialog.deleteModal)).to.be.false;
  }
}
