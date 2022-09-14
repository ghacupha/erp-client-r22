import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ReportStatusUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.reportStatus.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reportNameInput: ElementFinder = element(by.css('input#report-status-reportName'));
  reportIdInput: ElementFinder = element(by.css('input#report-status-reportId'));
  placeholderSelect: ElementFinder = element(by.css('select#report-status-placeholder'));
  processStatusSelect: ElementFinder = element(by.css('select#report-status-processStatus'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReportNameInput(reportName) {
    await this.reportNameInput.sendKeys(reportName);
  }

  async getReportNameInput() {
    return this.reportNameInput.getAttribute('value');
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

  async processStatusSelectLastOption() {
    await this.processStatusSelect.all(by.tagName('option')).last().click();
  }

  async processStatusSelectOption(option) {
    await this.processStatusSelect.sendKeys(option);
  }

  getProcessStatusSelect() {
    return this.processStatusSelect;
  }

  async getProcessStatusSelectedOption() {
    return this.processStatusSelect.element(by.css('option:checked')).getText();
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
    await this.setReportIdInput('64c99148-3908-465d-8c4a-e510e3ade974');
    // this.placeholderSelectLastOption();
    await this.processStatusSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
