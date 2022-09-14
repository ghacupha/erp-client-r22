import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProcessStatusUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.processStatus.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusCodeInput: ElementFinder = element(by.css('input#process-status-statusCode'));
  descriptionInput: ElementFinder = element(by.css('input#process-status-description'));
  placeholderSelect: ElementFinder = element(by.css('select#process-status-placeholder'));
  parametersSelect: ElementFinder = element(by.css('select#process-status-parameters'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusCodeInput(statusCode) {
    await this.statusCodeInput.sendKeys(statusCode);
  }

  async getStatusCodeInput() {
    return this.statusCodeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
    await this.setStatusCodeInput('statusCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    // this.placeholderSelectLastOption();
    // this.parametersSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
