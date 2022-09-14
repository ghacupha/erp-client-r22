import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PrepaymentMappingUpdatePage from './prepayment-mapping-update.page-object';

const expect = chai.expect;
export class PrepaymentMappingDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentMapping.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-prepaymentMapping'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepaymentMappingComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prepayment-mapping-heading'));
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
    await navBarPage.getEntityPage('prepayment-mapping');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepaymentMapping() {
    await this.createButton.click();
    return new PrepaymentMappingUpdatePage();
  }

  async deletePrepaymentMapping() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepaymentMappingDeleteDialog = new PrepaymentMappingDeleteDialog();
    await waitUntilDisplayed(prepaymentMappingDeleteDialog.deleteModal);
    expect(await prepaymentMappingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.prepaymentMapping.delete.question/
    );
    await prepaymentMappingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepaymentMappingDeleteDialog.deleteModal);

    expect(await isVisible(prepaymentMappingDeleteDialog.deleteModal)).to.be.false;
  }
}
