import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class DepreciationMethodUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.depreciationMethod.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  depreciationMethodNameInput: ElementFinder = element(by.css('input#depreciation-method-depreciationMethodName'));
  descriptionInput: ElementFinder = element(by.css('input#depreciation-method-description'));
  depreciationTypeSelect: ElementFinder = element(by.css('select#depreciation-method-depreciationType'));
  remarksInput: ElementFinder = element(by.css('textarea#depreciation-method-remarks'));
  placeholderSelect: ElementFinder = element(by.css('select#depreciation-method-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDepreciationMethodNameInput(depreciationMethodName) {
    await this.depreciationMethodNameInput.sendKeys(depreciationMethodName);
  }

  async getDepreciationMethodNameInput() {
    return this.depreciationMethodNameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setDepreciationTypeSelect(depreciationType) {
    await this.depreciationTypeSelect.sendKeys(depreciationType);
  }

  async getDepreciationTypeSelect() {
    return this.depreciationTypeSelect.element(by.css('option:checked')).getText();
  }

  async depreciationTypeSelectLastOption() {
    await this.depreciationTypeSelect.all(by.tagName('option')).last().click();
  }
  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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
    await this.setDepreciationMethodNameInput('depreciationMethodName');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.depreciationTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
