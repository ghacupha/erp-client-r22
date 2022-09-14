import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PrepaymentMappingUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentMapping.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  parameterKeyInput: ElementFinder = element(by.css('input#prepayment-mapping-parameterKey'));
  parameterGuidInput: ElementFinder = element(by.css('input#prepayment-mapping-parameterGuid'));
  parameterInput: ElementFinder = element(by.css('input#prepayment-mapping-parameter'));
  placeholderSelect: ElementFinder = element(by.css('select#prepayment-mapping-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setParameterKeyInput(parameterKey) {
    await this.parameterKeyInput.sendKeys(parameterKey);
  }

  async getParameterKeyInput() {
    return this.parameterKeyInput.getAttribute('value');
  }

  async setParameterGuidInput(parameterGuid) {
    await this.parameterGuidInput.sendKeys(parameterGuid);
  }

  async getParameterGuidInput() {
    return this.parameterGuidInput.getAttribute('value');
  }

  async setParameterInput(parameter) {
    await this.parameterInput.sendKeys(parameter);
  }

  async getParameterInput() {
    return this.parameterInput.getAttribute('value');
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
    await this.setParameterKeyInput('parameterKey');
    await waitUntilDisplayed(this.saveButton);
    await this.setParameterGuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setParameterInput('parameter');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
