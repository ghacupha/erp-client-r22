import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AgencyNoticeUpdatePage from './agency-notice-update.page-object';

const expect = chai.expect;
export class AgencyNoticeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.agencyNotice.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-agencyNotice'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AgencyNoticeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('agency-notice-heading'));
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
    await navBarPage.getEntityPage('agency-notice');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAgencyNotice() {
    await this.createButton.click();
    return new AgencyNoticeUpdatePage();
  }

  async deleteAgencyNotice() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const agencyNoticeDeleteDialog = new AgencyNoticeDeleteDialog();
    await waitUntilDisplayed(agencyNoticeDeleteDialog.deleteModal);
    expect(await agencyNoticeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.agencyNotice.delete.question/);
    await agencyNoticeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(agencyNoticeDeleteDialog.deleteModal);

    expect(await isVisible(agencyNoticeDeleteDialog.deleteModal)).to.be.false;
  }
}
