import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SettlementCurrencyUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.settlementCurrency.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  iso4217CurrencyCodeInput: ElementFinder = element(by.css('input#settlement-currency-iso4217CurrencyCode'));
  currencyNameInput: ElementFinder = element(by.css('input#settlement-currency-currencyName'));
  countryInput: ElementFinder = element(by.css('input#settlement-currency-country'));
  numericCodeInput: ElementFinder = element(by.css('input#settlement-currency-numericCode'));
  minorUnitInput: ElementFinder = element(by.css('input#settlement-currency-minorUnit'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#settlement-currency-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#settlement-currency-compilationToken'));
  placeholderSelect: ElementFinder = element(by.css('select#settlement-currency-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIso4217CurrencyCodeInput(iso4217CurrencyCode) {
    await this.iso4217CurrencyCodeInput.sendKeys(iso4217CurrencyCode);
  }

  async getIso4217CurrencyCodeInput() {
    return this.iso4217CurrencyCodeInput.getAttribute('value');
  }

  async setCurrencyNameInput(currencyName) {
    await this.currencyNameInput.sendKeys(currencyName);
  }

  async getCurrencyNameInput() {
    return this.currencyNameInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async setNumericCodeInput(numericCode) {
    await this.numericCodeInput.sendKeys(numericCode);
  }

  async getNumericCodeInput() {
    return this.numericCodeInput.getAttribute('value');
  }

  async setMinorUnitInput(minorUnit) {
    await this.minorUnitInput.sendKeys(minorUnit);
  }

  async getMinorUnitInput() {
    return this.minorUnitInput.getAttribute('value');
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
    await this.setIso4217CurrencyCodeInput('iso4217CurrencyCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrencyNameInput('currencyName');
    await waitUntilDisplayed(this.saveButton);
    await this.setCountryInput('country');
    await waitUntilDisplayed(this.saveButton);
    await this.setNumericCodeInput('numericCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setMinorUnitInput('minorUnit');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
