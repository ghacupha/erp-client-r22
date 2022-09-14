import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CountyCodeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.countyCode.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  countyCodeInput: ElementFinder = element(by.css('input#county-code-countyCode'));
  countyNameInput: ElementFinder = element(by.css('input#county-code-countyName'));
  subCountyCodeInput: ElementFinder = element(by.css('input#county-code-subCountyCode'));
  subCountyNameInput: ElementFinder = element(by.css('input#county-code-subCountyName'));
  placeholderSelect: ElementFinder = element(by.css('select#county-code-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCountyCodeInput(countyCode) {
    await this.countyCodeInput.sendKeys(countyCode);
  }

  async getCountyCodeInput() {
    return this.countyCodeInput.getAttribute('value');
  }

  async setCountyNameInput(countyName) {
    await this.countyNameInput.sendKeys(countyName);
  }

  async getCountyNameInput() {
    return this.countyNameInput.getAttribute('value');
  }

  async setSubCountyCodeInput(subCountyCode) {
    await this.subCountyCodeInput.sendKeys(subCountyCode);
  }

  async getSubCountyCodeInput() {
    return this.subCountyCodeInput.getAttribute('value');
  }

  async setSubCountyNameInput(subCountyName) {
    await this.subCountyNameInput.sendKeys(subCountyName);
  }

  async getSubCountyNameInput() {
    return this.subCountyNameInput.getAttribute('value');
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
    await this.setCountyCodeInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCountyNameInput('countyName');
    await waitUntilDisplayed(this.saveButton);
    await this.setSubCountyCodeInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setSubCountyNameInput('subCountyName');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
