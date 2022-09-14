import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import InstitutionCodeUpdatePage from './institution-code-update.page-object';

const expect = chai.expect;
export class InstitutionCodeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('erpSystemR22App.institutionCode.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-institutionCode'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class InstitutionCodeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('institution-code-heading'));
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
    await navBarPage.getEntityPage('institution-code');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateInstitutionCode() {
    await this.createButton.click();
    return new InstitutionCodeUpdatePage();
  }

  async deleteInstitutionCode() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const institutionCodeDeleteDialog = new InstitutionCodeDeleteDialog();
    await waitUntilDisplayed(institutionCodeDeleteDialog.deleteModal);
    expect(await institutionCodeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /erpSystemR22App.institutionCode.delete.question/
    );
    await institutionCodeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(institutionCodeDeleteDialog.deleteModal);

    expect(await isVisible(institutionCodeDeleteDialog.deleteModal)).to.be.false;
  }
}
