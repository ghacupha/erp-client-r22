import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AlgorithmUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.algorithm.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#algorithm-name'));
  placeholderSelect: ElementFinder = element(by.css('select#algorithm-placeholder'));
  parametersSelect: ElementFinder = element(by.css('select#algorithm-parameters'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
    await this.setNameInput('name');
    // this.placeholderSelectLastOption();
    // this.parametersSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
