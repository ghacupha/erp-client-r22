import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ServiceOutletUpdatePage from './service-outlet-update.page-object';

const expect = chai.expect;
export class ServiceOutletDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.serviceOutlet.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-serviceOutlet'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ServiceOutletComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('service-outlet-heading'));
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
    await navBarPage.getEntityPage('service-outlet');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateServiceOutlet() {
    await this.createButton.click();
    return new ServiceOutletUpdatePage();
  }

  async deleteServiceOutlet() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const serviceOutletDeleteDialog = new ServiceOutletDeleteDialog();
    await waitUntilDisplayed(serviceOutletDeleteDialog.deleteModal);
    expect(await serviceOutletDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/erpSystemR22App.serviceOutlet.delete.question/);
    await serviceOutletDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(serviceOutletDeleteDialog.deleteModal);

    expect(await isVisible(serviceOutletDeleteDialog.deleteModal)).to.be.false;
  }
}
