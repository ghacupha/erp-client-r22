import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ExcelReportExportUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.excelReportExport.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reportNameInput: ElementFinder = element(by.css('input#excel-report-export-reportName'));
  reportPasswordInput: ElementFinder = element(by.css('input#excel-report-export-reportPassword'));
  reportNotesInput: ElementFinder = element(by.css('input#excel-report-export-reportNotes'));
  fileCheckSumInput: ElementFinder = element(by.css('textarea#excel-report-export-fileCheckSum'));
  reportFileInput: ElementFinder = element(by.css('input#excel-report-export-reportFile'));
  reportTimeStampInput: ElementFinder = element(by.css('input#excel-report-export-reportTimeStamp'));
  reportIdInput: ElementFinder = element(by.css('input#excel-report-export-reportId'));
  placeholderSelect: ElementFinder = element(by.css('select#excel-report-export-placeholder'));
  parametersSelect: ElementFinder = element(by.css('select#excel-report-export-parameters'));
  reportStatusSelect: ElementFinder = element(by.css('select#excel-report-export-reportStatus'));
  securityClearanceSelect: ElementFinder = element(by.css('select#excel-report-export-securityClearance'));
  reportCreatorSelect: ElementFinder = element(by.css('select#excel-report-export-reportCreator'));
  organizationSelect: ElementFinder = element(by.css('select#excel-report-export-organization'));
  departmentSelect: ElementFinder = element(by.css('select#excel-report-export-department'));
  systemModuleSelect: ElementFinder = element(by.css('select#excel-report-export-systemModule'));
  reportDesignSelect: ElementFinder = element(by.css('select#excel-report-export-reportDesign'));
  fileCheckSumAlgorithmSelect: ElementFinder = element(by.css('select#excel-report-export-fileCheckSumAlgorithm'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReportNameInput(reportName) {
    await this.reportNameInput.sendKeys(reportName);
  }

  async getReportNameInput() {
    return this.reportNameInput.getAttribute('value');
  }

  async setReportPasswordInput(reportPassword) {
    await this.reportPasswordInput.sendKeys(reportPassword);
  }

  async getReportPasswordInput() {
    return this.reportPasswordInput.getAttribute('value');
  }

  async setReportNotesInput(reportNotes) {
    await this.reportNotesInput.sendKeys(reportNotes);
  }

  async getReportNotesInput() {
    return this.reportNotesInput.getAttribute('value');
  }

  async setFileCheckSumInput(fileCheckSum) {
    await this.fileCheckSumInput.sendKeys(fileCheckSum);
  }

  async getFileCheckSumInput() {
    return this.fileCheckSumInput.getAttribute('value');
  }

  async setReportFileInput(reportFile) {
    await this.reportFileInput.sendKeys(reportFile);
  }

  async getReportFileInput() {
    return this.reportFileInput.getAttribute('value');
  }

  async setReportTimeStampInput(reportTimeStamp) {
    await this.reportTimeStampInput.sendKeys(reportTimeStamp);
  }

  async getReportTimeStampInput() {
    return this.reportTimeStampInput.getAttribute('value');
  }

  async setReportIdInput(reportId) {
    await this.reportIdInput.sendKeys(reportId);
  }

  async getReportIdInput() {
    return this.reportIdInput.getAttribute('value');
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

  async reportStatusSelectLastOption() {
    await this.reportStatusSelect.all(by.tagName('option')).last().click();
  }

  async reportStatusSelectOption(option) {
    await this.reportStatusSelect.sendKeys(option);
  }

  getReportStatusSelect() {
    return this.reportStatusSelect;
  }

  async getReportStatusSelectedOption() {
    return this.reportStatusSelect.element(by.css('option:checked')).getText();
  }

  async securityClearanceSelectLastOption() {
    await this.securityClearanceSelect.all(by.tagName('option')).last().click();
  }

  async securityClearanceSelectOption(option) {
    await this.securityClearanceSelect.sendKeys(option);
  }

  getSecurityClearanceSelect() {
    return this.securityClearanceSelect;
  }

  async getSecurityClearanceSelectedOption() {
    return this.securityClearanceSelect.element(by.css('option:checked')).getText();
  }

  async reportCreatorSelectLastOption() {
    await this.reportCreatorSelect.all(by.tagName('option')).last().click();
  }

  async reportCreatorSelectOption(option) {
    await this.reportCreatorSelect.sendKeys(option);
  }

  getReportCreatorSelect() {
    return this.reportCreatorSelect;
  }

  async getReportCreatorSelectedOption() {
    return this.reportCreatorSelect.element(by.css('option:checked')).getText();
  }

  async organizationSelectLastOption() {
    await this.organizationSelect.all(by.tagName('option')).last().click();
  }

  async organizationSelectOption(option) {
    await this.organizationSelect.sendKeys(option);
  }

  getOrganizationSelect() {
    return this.organizationSelect;
  }

  async getOrganizationSelectedOption() {
    return this.organizationSelect.element(by.css('option:checked')).getText();
  }

  async departmentSelectLastOption() {
    await this.departmentSelect.all(by.tagName('option')).last().click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
  }

  async systemModuleSelectLastOption() {
    await this.systemModuleSelect.all(by.tagName('option')).last().click();
  }

  async systemModuleSelectOption(option) {
    await this.systemModuleSelect.sendKeys(option);
  }

  getSystemModuleSelect() {
    return this.systemModuleSelect;
  }

  async getSystemModuleSelectedOption() {
    return this.systemModuleSelect.element(by.css('option:checked')).getText();
  }

  async reportDesignSelectLastOption() {
    await this.reportDesignSelect.all(by.tagName('option')).last().click();
  }

  async reportDesignSelectOption(option) {
    await this.reportDesignSelect.sendKeys(option);
  }

  getReportDesignSelect() {
    return this.reportDesignSelect;
  }

  async getReportDesignSelectedOption() {
    return this.reportDesignSelect.element(by.css('option:checked')).getText();
  }

  async fileCheckSumAlgorithmSelectLastOption() {
    await this.fileCheckSumAlgorithmSelect.all(by.tagName('option')).last().click();
  }

  async fileCheckSumAlgorithmSelectOption(option) {
    await this.fileCheckSumAlgorithmSelect.sendKeys(option);
  }

  getFileCheckSumAlgorithmSelect() {
    return this.fileCheckSumAlgorithmSelect;
  }

  async getFileCheckSumAlgorithmSelectedOption() {
    return this.fileCheckSumAlgorithmSelect.element(by.css('option:checked')).getText();
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
    await this.setReportPasswordInput('reportPassword');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportNotesInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setFileCheckSumInput('fileCheckSum');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setReportTimeStampInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportIdInput('64c99148-3908-465d-8c4a-e510e3ade974');
    // this.placeholderSelectLastOption();
    // this.parametersSelectLastOption();
    await this.reportStatusSelectLastOption();
    await this.securityClearanceSelectLastOption();
    await this.reportCreatorSelectLastOption();
    await this.organizationSelectLastOption();
    await this.departmentSelectLastOption();
    await this.systemModuleSelectLastOption();
    await this.reportDesignSelectLastOption();
    await this.fileCheckSumAlgorithmSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
