import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SecurityClearanceUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.securityClearance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  clearanceLevelInput: ElementFinder = element(by.css('input#security-clearance-clearanceLevel'));
  grantedClearancesSelect: ElementFinder = element(by.css('select#security-clearance-grantedClearances'));
  placeholderSelect: ElementFinder = element(by.css('select#security-clearance-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setClearanceLevelInput(clearanceLevel) {
    await this.clearanceLevelInput.sendKeys(clearanceLevel);
  }

  async getClearanceLevelInput() {
    return this.clearanceLevelInput.getAttribute('value');
  }

  async grantedClearancesSelectLastOption() {
    await this.grantedClearancesSelect.all(by.tagName('option')).last().click();
  }

  async grantedClearancesSelectOption(option) {
    await this.grantedClearancesSelect.sendKeys(option);
  }

  getGrantedClearancesSelect() {
    return this.grantedClearancesSelect;
  }

  async getGrantedClearancesSelectedOption() {
    return this.grantedClearancesSelect.element(by.css('option:checked')).getText();
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
    await this.setClearanceLevelInput('clearanceLevel');
    // this.grantedClearancesSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
