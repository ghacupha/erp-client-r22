import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ReportDesignUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.reportDesign.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  catalogueNumberInput: ElementFinder = element(by.css('input#report-design-catalogueNumber'));
  designationInput: ElementFinder = element(by.css('input#report-design-designation'));
  descriptionInput: ElementFinder = element(by.css('textarea#report-design-description'));
  notesInput: ElementFinder = element(by.css('input#report-design-notes'));
  reportFileInput: ElementFinder = element(by.css('input#report-design-reportFile'));
  reportFileChecksumInput: ElementFinder = element(by.css('input#report-design-reportFileChecksum'));
  parametersSelect: ElementFinder = element(by.css('select#report-design-parameters'));
  securityClearanceSelect: ElementFinder = element(by.css('select#report-design-securityClearance'));
  reportDesignerSelect: ElementFinder = element(by.css('select#report-design-reportDesigner'));
  organizationSelect: ElementFinder = element(by.css('select#report-design-organization'));
  departmentSelect: ElementFinder = element(by.css('select#report-design-department'));
  placeholderSelect: ElementFinder = element(by.css('select#report-design-placeholder'));
  systemModuleSelect: ElementFinder = element(by.css('select#report-design-systemModule'));
  fileCheckSumAlgorithmSelect: ElementFinder = element(by.css('select#report-design-fileCheckSumAlgorithm'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCatalogueNumberInput(catalogueNumber) {
    await this.catalogueNumberInput.sendKeys(catalogueNumber);
  }

  async getCatalogueNumberInput() {
    return this.catalogueNumberInput.getAttribute('value');
  }

  async setDesignationInput(designation) {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput() {
    return this.designationInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async setReportFileInput(reportFile) {
    await this.reportFileInput.sendKeys(reportFile);
  }

  async getReportFileInput() {
    return this.reportFileInput.getAttribute('value');
  }

  async setReportFileChecksumInput(reportFileChecksum) {
    await this.reportFileChecksumInput.sendKeys(reportFileChecksum);
  }

  async getReportFileChecksumInput() {
    return this.reportFileChecksumInput.getAttribute('value');
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

  async reportDesignerSelectLastOption() {
    await this.reportDesignerSelect.all(by.tagName('option')).last().click();
  }

  async reportDesignerSelectOption(option) {
    await this.reportDesignerSelect.sendKeys(option);
  }

  getReportDesignerSelect() {
    return this.reportDesignerSelect;
  }

  async getReportDesignerSelectedOption() {
    return this.reportDesignerSelect.element(by.css('option:checked')).getText();
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
    await this.setCatalogueNumberInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setDesignationInput('designation');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileChecksumInput('reportFileChecksum');
    // this.parametersSelectLastOption();
    await this.securityClearanceSelectLastOption();
    await this.reportDesignerSelectLastOption();
    await this.organizationSelectLastOption();
    await this.departmentSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.systemModuleSelectLastOption();
    await this.fileCheckSumAlgorithmSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
