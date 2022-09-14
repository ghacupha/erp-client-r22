import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PrepaymentMarshallingUpdatePage from './prepayment-marshalling-update.page-object';

const expect = chai.expect;
export class PrepaymentMarshallingDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentMarshalling.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-prepaymentMarshalling'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepaymentMarshallingComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prepayment-marshalling-heading'));
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
    await navBarPage.getEntityPage('prepayment-marshalling');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepaymentMarshalling() {
    await this.createButton.click();
    return new PrepaymentMarshallingUpdatePage();
  }

  async deletePrepaymentMarshalling() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepaymentMarshallingDeleteDialog = new PrepaymentMarshallingDeleteDialog();
    await waitUntilDisplayed(prepaymentMarshallingDeleteDialog.deleteModal);
    expect(await prepaymentMarshallingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.prepaymentMarshalling.delete.question/
    );
    await prepaymentMarshallingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepaymentMarshallingDeleteDialog.deleteModal);

    expect(await isVisible(prepaymentMarshallingDeleteDialog.deleteModal)).to.be.false;
  }
}
