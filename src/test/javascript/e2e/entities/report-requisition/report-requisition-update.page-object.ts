import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ReportRequisitionUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.reportRequisition.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reportNameInput: ElementFinder = element(by.css('input#report-requisition-reportName'));
  reportRequestTimeInput: ElementFinder = element(by.css('input#report-requisition-reportRequestTime'));
  reportPasswordInput: ElementFinder = element(by.css('input#report-requisition-reportPassword'));
  reportStatusSelect: ElementFinder = element(by.css('select#report-requisition-reportStatus'));
  reportIdInput: ElementFinder = element(by.css('input#report-requisition-reportId'));
  reportFileAttachmentInput: ElementFinder = element(by.css('input#report-requisition-reportFileAttachment'));
  reportFileCheckSumInput: ElementFinder = element(by.css('textarea#report-requisition-reportFileCheckSum'));
  reportNotesInput: ElementFinder = element(by.css('input#report-requisition-reportNotes'));
  placeholdersSelect: ElementFinder = element(by.css('select#report-requisition-placeholders'));
  parametersSelect: ElementFinder = element(by.css('select#report-requisition-parameters'));
  reportTemplateSelect: ElementFinder = element(by.css('select#report-requisition-reportTemplate'));
  reportContentTypeSelect: ElementFinder = element(by.css('select#report-requisition-reportContentType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReportNameInput(reportName) {
    await this.reportNameInput.sendKeys(reportName);
  }

  async getReportNameInput() {
    return this.reportNameInput.getAttribute('value');
  }

  async setReportRequestTimeInput(reportRequestTime) {
    await this.reportRequestTimeInput.sendKeys(reportRequestTime);
  }

  async getReportRequestTimeInput() {
    return this.reportRequestTimeInput.getAttribute('value');
  }

  async setReportPasswordInput(reportPassword) {
    await this.reportPasswordInput.sendKeys(reportPassword);
  }

  async getReportPasswordInput() {
    return this.reportPasswordInput.getAttribute('value');
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

  async setReportFileAttachmentInput(reportFileAttachment) {
    await this.reportFileAttachmentInput.sendKeys(reportFileAttachment);
  }

  async getReportFileAttachmentInput() {
    return this.reportFileAttachmentInput.getAttribute('value');
  }

  async setReportFileCheckSumInput(reportFileCheckSum) {
    await this.reportFileCheckSumInput.sendKeys(reportFileCheckSum);
  }

  async getReportFileCheckSumInput() {
    return this.reportFileCheckSumInput.getAttribute('value');
  }

  async setReportNotesInput(reportNotes) {
    await this.reportNotesInput.sendKeys(reportNotes);
  }

  async getReportNotesInput() {
    return this.reportNotesInput.getAttribute('value');
  }

  async placeholdersSelectLastOption() {
    await this.placeholdersSelect.all(by.tagName('option')).last().click();
  }

  async placeholdersSelectOption(option) {
    await this.placeholdersSelect.sendKeys(option);
  }

  getPlaceholdersSelect() {
    return this.placeholdersSelect;
  }

  async getPlaceholdersSelectedOption() {
    return this.placeholdersSelect.element(by.css('option:checked')).getText();
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

  async reportContentTypeSelectLastOption() {
    await this.reportContentTypeSelect.all(by.tagName('option')).last().click();
  }

  async reportContentTypeSelectOption(option) {
    await this.reportContentTypeSelect.sendKeys(option);
  }

  getReportContentTypeSelect() {
    return this.reportContentTypeSelect;
  }

  async getReportContentTypeSelectedOption() {
    return this.reportContentTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setReportRequestTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportPasswordInput('reportPassword');
    await waitUntilDisplayed(this.saveButton);
    await this.reportStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setReportIdInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileAttachmentInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileCheckSumInput('reportFileCheckSum');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportNotesInput(absolutePath);
    // this.placeholdersSelectLastOption();
    // this.parametersSelectLastOption();
    await this.reportTemplateSelectLastOption();
    await this.reportContentTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
