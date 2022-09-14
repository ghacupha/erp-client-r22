import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import MessageTokenUpdatePage from './message-token-update.page-object';

const expect = chai.expect;
export class MessageTokenDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.filesMessageToken.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-messageToken'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MessageTokenComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('message-token-heading'));
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
    await navBarPage.getEntityPage('message-token');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMessageToken() {
    await this.createButton.click();
    return new MessageTokenUpdatePage();
  }

  async deleteMessageToken() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const messageTokenDeleteDialog = new MessageTokenDeleteDialog();
    await waitUntilDisplayed(messageTokenDeleteDialog.deleteModal);
    expect(await messageTokenDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.filesMessageToken.delete.question/
    );
    await messageTokenDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(messageTokenDeleteDialog.deleteModal);

    expect(await isVisible(messageTokenDeleteDialog.deleteModal)).to.be.false;
  }
}
