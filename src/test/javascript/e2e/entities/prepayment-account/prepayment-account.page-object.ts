import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PrepaymentAccountUpdatePage from './prepayment-account-update.page-object';

const expect = chai.expect;
export class PrepaymentAccountDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentAccount.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-prepaymentAccount'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PrepaymentAccountComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prepayment-account-heading'));
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
    await navBarPage.getEntityPage('prepayment-account');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePrepaymentAccount() {
    await this.createButton.click();
    return new PrepaymentAccountUpdatePage();
  }

  async deletePrepaymentAccount() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prepaymentAccountDeleteDialog = new PrepaymentAccountDeleteDialog();
    await waitUntilDisplayed(prepaymentAccountDeleteDialog.deleteModal);
    expect(await prepaymentAccountDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.prepaymentAccount.delete.question/
    );
    await prepaymentAccountDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prepaymentAccountDeleteDialog.deleteModal);

    expect(await isVisible(prepaymentAccountDeleteDialog.deleteModal)).to.be.false;
  }
}
