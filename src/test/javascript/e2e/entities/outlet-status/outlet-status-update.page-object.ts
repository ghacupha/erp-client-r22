import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class OutletStatusUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.outletStatus.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  branchStatusTypeCodeInput: ElementFinder = element(by.css('input#outlet-status-branchStatusTypeCode'));
  branchStatusTypeSelect: ElementFinder = element(by.css('select#outlet-status-branchStatusType'));
  branchStatusTypeDescriptionInput: ElementFinder = element(by.css('input#outlet-status-branchStatusTypeDescription'));
  placeholderSelect: ElementFinder = element(by.css('select#outlet-status-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBranchStatusTypeCodeInput(branchStatusTypeCode) {
    await this.branchStatusTypeCodeInput.sendKeys(branchStatusTypeCode);
  }

  async getBranchStatusTypeCodeInput() {
    return this.branchStatusTypeCodeInput.getAttribute('value');
  }

  async setBranchStatusTypeSelect(branchStatusType) {
    await this.branchStatusTypeSelect.sendKeys(branchStatusType);
  }

  async getBranchStatusTypeSelect() {
    return this.branchStatusTypeSelect.element(by.css('option:checked')).getText();
  }

  async branchStatusTypeSelectLastOption() {
    await this.branchStatusTypeSelect.all(by.tagName('option')).last().click();
  }
  async setBranchStatusTypeDescriptionInput(branchStatusTypeDescription) {
    await this.branchStatusTypeDescriptionInput.sendKeys(branchStatusTypeDescription);
  }

  async getBranchStatusTypeDescriptionInput() {
    return this.branchStatusTypeDescriptionInput.getAttribute('value');
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
    await this.setBranchStatusTypeCodeInput('branchStatusTypeCode');
    await waitUntilDisplayed(this.saveButton);
    await this.branchStatusTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setBranchStatusTypeDescriptionInput('branchStatusTypeDescription');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
