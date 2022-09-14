import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class InstitutionCodeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.institutionCode.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  institutionCodeInput: ElementFinder = element(by.css('input#institution-code-institutionCode'));
  institutionNameInput: ElementFinder = element(by.css('input#institution-code-institutionName'));
  shortNameInput: ElementFinder = element(by.css('input#institution-code-shortName'));
  categoryInput: ElementFinder = element(by.css('input#institution-code-category'));
  institutionCategoryInput: ElementFinder = element(by.css('input#institution-code-institutionCategory'));
  placeholderSelect: ElementFinder = element(by.css('select#institution-code-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setInstitutionCodeInput(institutionCode) {
    await this.institutionCodeInput.sendKeys(institutionCode);
  }

  async getInstitutionCodeInput() {
    return this.institutionCodeInput.getAttribute('value');
  }

  async setInstitutionNameInput(institutionName) {
    await this.institutionNameInput.sendKeys(institutionName);
  }

  async getInstitutionNameInput() {
    return this.institutionNameInput.getAttribute('value');
  }

  async setShortNameInput(shortName) {
    await this.shortNameInput.sendKeys(shortName);
  }

  async getShortNameInput() {
    return this.shortNameInput.getAttribute('value');
  }

  async setCategoryInput(category) {
    await this.categoryInput.sendKeys(category);
  }

  async getCategoryInput() {
    return this.categoryInput.getAttribute('value');
  }

  async setInstitutionCategoryInput(institutionCategory) {
    await this.institutionCategoryInput.sendKeys(institutionCategory);
  }

  async getInstitutionCategoryInput() {
    return this.institutionCategoryInput.getAttribute('value');
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
    await this.setInstitutionCodeInput('institutionCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setInstitutionNameInput('institutionName');
    await waitUntilDisplayed(this.saveButton);
    await this.setShortNameInput('shortName');
    await waitUntilDisplayed(this.saveButton);
    await this.setCategoryInput('category');
    await waitUntilDisplayed(this.saveButton);
    await this.setInstitutionCategoryInput('institutionCategory');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
