import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class PlaceholderUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.erpServicePlaceholder.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#placeholder-description'));
  tokenInput: ElementFinder = element(by.css('input#placeholder-token'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#placeholder-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#placeholder-compilationToken'));
  containingPlaceholderSelect: ElementFinder = element(by.css('select#placeholder-containingPlaceholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setTokenInput(token) {
    await this.tokenInput.sendKeys(token);
  }

  async getTokenInput() {
    return this.tokenInput.getAttribute('value');
  }

  async setFileUploadTokenInput(fileUploadToken) {
    await this.fileUploadTokenInput.sendKeys(fileUploadToken);
  }

  async getFileUploadTokenInput() {
    return this.fileUploadTokenInput.getAttribute('value');
  }

  async setCompilationTokenInput(compilationToken) {
    await this.compilationTokenInput.sendKeys(compilationToken);
  }

  async getCompilationTokenInput() {
    return this.compilationTokenInput.getAttribute('value');
  }

  async containingPlaceholderSelectLastOption() {
    await this.containingPlaceholderSelect.all(by.tagName('option')).last().click();
  }

  async containingPlaceholderSelectOption(option) {
    await this.containingPlaceholderSelect.sendKeys(option);
  }

  getContainingPlaceholderSelect() {
    return this.containingPlaceholderSelect;
  }

  async getContainingPlaceholderSelectedOption() {
    return this.containingPlaceholderSelect.element(by.css('option:checked')).getText();
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
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setTokenInput('token');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    await this.containingPlaceholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
