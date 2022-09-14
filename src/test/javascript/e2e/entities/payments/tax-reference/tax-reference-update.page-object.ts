import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class TaxReferenceUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsTaxReference.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  taxNameInput: ElementFinder = element(by.css('input#tax-reference-taxName'));
  taxDescriptionInput: ElementFinder = element(by.css('input#tax-reference-taxDescription'));
  taxPercentageInput: ElementFinder = element(by.css('input#tax-reference-taxPercentage'));
  taxReferenceTypeSelect: ElementFinder = element(by.css('select#tax-reference-taxReferenceType'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#tax-reference-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#tax-reference-compilationToken'));
  placeholderSelect: ElementFinder = element(by.css('select#tax-reference-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTaxNameInput(taxName) {
    await this.taxNameInput.sendKeys(taxName);
  }

  async getTaxNameInput() {
    return this.taxNameInput.getAttribute('value');
  }

  async setTaxDescriptionInput(taxDescription) {
    await this.taxDescriptionInput.sendKeys(taxDescription);
  }

  async getTaxDescriptionInput() {
    return this.taxDescriptionInput.getAttribute('value');
  }

  async setTaxPercentageInput(taxPercentage) {
    await this.taxPercentageInput.sendKeys(taxPercentage);
  }

  async getTaxPercentageInput() {
    return this.taxPercentageInput.getAttribute('value');
  }

  async setTaxReferenceTypeSelect(taxReferenceType) {
    await this.taxReferenceTypeSelect.sendKeys(taxReferenceType);
  }

  async getTaxReferenceTypeSelect() {
    return this.taxReferenceTypeSelect.element(by.css('option:checked')).getText();
  }

  async taxReferenceTypeSelectLastOption() {
    await this.taxReferenceTypeSelect.all(by.tagName('option')).last().click();
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
    await this.setTaxNameInput('taxName');
    await waitUntilDisplayed(this.saveButton);
    await this.setTaxDescriptionInput('taxDescription');
    await waitUntilDisplayed(this.saveButton);
    await this.setTaxPercentageInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.taxReferenceTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
