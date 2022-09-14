import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PdfReportRequisitionUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.pdfReportRequisition.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reportNameInput: ElementFinder = element(by.css('input#pdf-report-requisition-reportName'));
  reportDateInput: ElementFinder = element(by.css('input#pdf-report-requisition-reportDate'));
  userPasswordInput: ElementFinder = element(by.css('input#pdf-report-requisition-userPassword'));
  ownerPasswordInput: ElementFinder = element(by.css('input#pdf-report-requisition-ownerPassword'));
  reportFileChecksumInput: ElementFinder = element(by.css('input#pdf-report-requisition-reportFileChecksum'));
  reportStatusSelect: ElementFinder = element(by.css('select#pdf-report-requisition-reportStatus'));
  reportIdInput: ElementFinder = element(by.css('input#pdf-report-requisition-reportId'));
  reportTemplateSelect: ElementFinder = element(by.css('select#pdf-report-requisition-reportTemplate'));
  placeholderSelect: ElementFinder = element(by.css('select#pdf-report-requisition-placeholder'));
  parametersSelect: ElementFinder = element(by.css('select#pdf-report-requisition-parameters'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReportNameInput(reportName) {
    await this.reportNameInput.sendKeys(reportName);
  }

  async getReportNameInput() {
    return this.reportNameInput.getAttribute('value');
  }

  async setReportDateInput(reportDate) {
    await this.reportDateInput.sendKeys(reportDate);
  }

  async getReportDateInput() {
    return this.reportDateInput.getAttribute('value');
  }

  async setUserPasswordInput(userPassword) {
    await this.userPasswordInput.sendKeys(userPassword);
  }

  async getUserPasswordInput() {
    return this.userPasswordInput.getAttribute('value');
  }

  async setOwnerPasswordInput(ownerPassword) {
    await this.ownerPasswordInput.sendKeys(ownerPassword);
  }

  async getOwnerPasswordInput() {
    return this.ownerPasswordInput.getAttribute('value');
  }

  async setReportFileChecksumInput(reportFileChecksum) {
    await this.reportFileChecksumInput.sendKeys(reportFileChecksum);
  }

  async getReportFileChecksumInput() {
    return this.reportFileChecksumInput.getAttribute('value');
  }

  async setReportStatusSelect(reportStatus) {
    await this.reportStatusSelect.sendKeys(reportStatus);
  }

  async getReportStatusSelect() {
    return this.reportStatusSelect.element(by.css('option:checked')).getText();
  }

  async reportStatusSelectLastOption() {
    await this.reportStatusSelect.all(by.tagName('option')).last().click();
  }
  async setReportIdInput(reportId) {
    await this.reportIdInput.sendKeys(reportId);
  }

  async getReportIdInput() {
    return this.reportIdInput.getAttribute('value');
  }

  async reportTemplateSelectLastOption() {
    await this.reportTemplateSelect.all(by.tagName('option')).last().click();
  }

  async reportTemplateSelectOption(option) {
    await this.reportTemplateSelect.sendKeys(option);
  }

  getReportTemplateSelect() {
    return this.reportTemplateSelect;
  }

  async getReportTemplateSelectedOption() {
    return this.reportTemplateSelect.element(by.css('option:checked')).getText();
  }

  async placeholderSelectLastOption() {
    await this.placeholderSelect.all(by.tagName('option')).last().click();
  }

  async placeholderSelectOption(option) {
    await this.placeholderSelect.sendKeys(option);
  }

  getPlaceholderSelect() {
    return this.placeholderSelect;
  }

  async getPlaceholderSelectedOption() {
    return this.placeholderSelect.element(by.css('option:checked')).getText();
  }

  async parametersSelectLastOption() {
    await this.parametersSelect.all(by.tagName('option')).last().click();
  }

  async parametersSelectOption(option) {
    await this.parametersSelect.sendKeys(option);
  }

  getParametersSelect() {
    return this.parametersSelect;
  }

  async getParametersSelectedOption() {
    return this.parametersSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setReportNameInput('reportName');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setUserPasswordInput('userPassword');
    await waitUntilDisplayed(this.saveButton);
    await this.setOwnerPasswordInput('ownerPassword');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileChecksumInput('reportFileChecksum');
    await waitUntilDisplayed(this.saveButton);
    await this.reportStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setReportIdInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await this.reportTemplateSelectLastOption();
    // this.placeholderSelectLastOption();
    // this.parametersSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
