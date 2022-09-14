import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class IsoCountryCodeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.isoCountryCode.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  countryCodeInput: ElementFinder = element(by.css('input#iso-country-code-countryCode'));
  countryDescriptionInput: ElementFinder = element(by.css('input#iso-country-code-countryDescription'));
  placeholderSelect: ElementFinder = element(by.css('select#iso-country-code-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  async setCountryDescriptionInput(countryDescription) {
    await this.countryDescriptionInput.sendKeys(countryDescription);
  }

  async getCountryDescriptionInput() {
    return this.countryDescriptionInput.getAttribute('value');
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
    await this.setCountryCodeInput('countryCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setCountryDescriptionInput('countryDescription');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
