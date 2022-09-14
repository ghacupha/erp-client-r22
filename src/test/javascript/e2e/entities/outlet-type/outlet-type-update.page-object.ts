import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class OutletTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.outletType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  outletTypeCodeInput: ElementFinder = element(by.css('input#outlet-type-outletTypeCode'));
  outletTypeInput: ElementFinder = element(by.css('input#outlet-type-outletType'));
  outletTypeDetailsInput: ElementFinder = element(by.css('input#outlet-type-outletTypeDetails'));
  placeholderSelect: ElementFinder = element(by.css('select#outlet-type-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setOutletTypeCodeInput(outletTypeCode) {
    await this.outletTypeCodeInput.sendKeys(outletTypeCode);
  }

  async getOutletTypeCodeInput() {
    return this.outletTypeCodeInput.getAttribute('value');
  }

  async setOutletTypeInput(outletType) {
    await this.outletTypeInput.sendKeys(outletType);
  }

  async getOutletTypeInput() {
    return this.outletTypeInput.getAttribute('value');
  }

  async setOutletTypeDetailsInput(outletTypeDetails) {
    await this.outletTypeDetailsInput.sendKeys(outletTypeDetails);
  }

  async getOutletTypeDetailsInput() {
    return this.outletTypeDetailsInput.getAttribute('value');
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
    await this.setOutletTypeCodeInput('outletTypeCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setOutletTypeInput('outletType');
    await waitUntilDisplayed(this.saveButton);
    await this.setOutletTypeDetailsInput('outletTypeDetails');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
