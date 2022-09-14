import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class WorkInProgressTransferUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.workInProgressTransfer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#work-in-progress-transfer-description'));
  targetAssetNumberInput: ElementFinder = element(by.css('input#work-in-progress-transfer-targetAssetNumber'));
  workInProgressRegistrationSelect: ElementFinder = element(by.css('select#work-in-progress-transfer-workInProgressRegistration'));
  placeholderSelect: ElementFinder = element(by.css('select#work-in-progress-transfer-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setTargetAssetNumberInput(targetAssetNumber) {
    await this.targetAssetNumberInput.sendKeys(targetAssetNumber);
  }

  async getTargetAssetNumberInput() {
    return this.targetAssetNumberInput.getAttribute('value');
  }

  async workInProgressRegistrationSelectLastOption() {
    await this.workInProgressRegistrationSelect.all(by.tagName('option')).last().click();
  }

  async workInProgressRegistrationSelectOption(option) {
    await this.workInProgressRegistrationSelect.sendKeys(option);
  }

  getWorkInProgressRegistrationSelect() {
    return this.workInProgressRegistrationSelect;
  }

  async getWorkInProgressRegistrationSelectedOption() {
    return this.workInProgressRegistrationSelect.element(by.css('option:checked')).getText();
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
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setTargetAssetNumberInput('targetAssetNumber');
    // this.workInProgressRegistrationSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
