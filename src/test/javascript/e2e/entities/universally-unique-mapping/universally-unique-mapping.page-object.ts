import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UniversallyUniqueMappingUpdatePage from './universally-unique-mapping-update.page-object';

const expect = chai.expect;
export class UniversallyUniqueMappingDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.universallyUniqueMapping.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-universallyUniqueMapping'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UniversallyUniqueMappingComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('universally-unique-mapping-heading'));
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
    await navBarPage.getEntityPage('universally-unique-mapping');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUniversallyUniqueMapping() {
    await this.createButton.click();
    return new UniversallyUniqueMappingUpdatePage();
  }

  async deleteUniversallyUniqueMapping() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const universallyUniqueMappingDeleteDialog = new UniversallyUniqueMappingDeleteDialog();
    await waitUntilDisplayed(universallyUniqueMappingDeleteDialog.deleteModal);
    expect(await universallyUniqueMappingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.universallyUniqueMapping.delete.question/
    );
    await universallyUniqueMappingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(universallyUniqueMappingDeleteDialog.deleteModal);

    expect(await isVisible(universallyUniqueMappingDeleteDialog.deleteModal)).to.be.false;
  }
}
