import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CustomerIDDocumentTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.customerIDDocumentType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  documentCodeInput: ElementFinder = element(by.css('input#customer-id-document-type-documentCode'));
  documentTypeInput: ElementFinder = element(by.css('input#customer-id-document-type-documentType'));
  documentTypeDescriptionInput: ElementFinder = element(by.css('input#customer-id-document-type-documentTypeDescription'));
  placeholderSelect: ElementFinder = element(by.css('select#customer-id-document-type-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDocumentCodeInput(documentCode) {
    await this.documentCodeInput.sendKeys(documentCode);
  }

  async getDocumentCodeInput() {
    return this.documentCodeInput.getAttribute('value');
  }

  async setDocumentTypeInput(documentType) {
    await this.documentTypeInput.sendKeys(documentType);
  }

  async getDocumentTypeInput() {
    return this.documentTypeInput.getAttribute('value');
  }

  async setDocumentTypeDescriptionInput(documentTypeDescription) {
    await this.documentTypeDescriptionInput.sendKeys(documentTypeDescription);
  }

  async getDocumentTypeDescriptionInput() {
    return this.documentTypeDescriptionInput.getAttribute('value');
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
    await this.setDocumentCodeInput('documentCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setDocumentTypeInput('documentType');
    await waitUntilDisplayed(this.saveButton);
    await this.setDocumentTypeDescriptionInput('documentTypeDescription');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
