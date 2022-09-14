import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ReportContentTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.reportContentType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reportTypeNameInput: ElementFinder = element(by.css('input#report-content-type-reportTypeName'));
  reportFileExtensionInput: ElementFinder = element(by.css('input#report-content-type-reportFileExtension'));
  systemContentTypeSelect: ElementFinder = element(by.css('select#report-content-type-systemContentType'));
  placeholderSelect: ElementFinder = element(by.css('select#report-content-type-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReportTypeNameInput(reportTypeName) {
    await this.reportTypeNameInput.sendKeys(reportTypeName);
  }

  async getReportTypeNameInput() {
    return this.reportTypeNameInput.getAttribute('value');
  }

  async setReportFileExtensionInput(reportFileExtension) {
    await this.reportFileExtensionInput.sendKeys(reportFileExtension);
  }

  async getReportFileExtensionInput() {
    return this.reportFileExtensionInput.getAttribute('value');
  }

  async systemContentTypeSelectLastOption() {
    await this.systemContentTypeSelect.all(by.tagName('option')).last().click();
  }

  async systemContentTypeSelectOption(option) {
    await this.systemContentTypeSelect.sendKeys(option);
  }

  getSystemContentTypeSelect() {
    return this.systemContentTypeSelect;
  }

  async getSystemContentTypeSelectedOption() {
    return this.systemContentTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setReportTypeNameInput('reportTypeName');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileExtensionInput('reportFileExtension');
    await this.systemContentTypeSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
