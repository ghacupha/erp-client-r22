import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AssetCategoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.assetCategory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  assetCategoryNameInput: ElementFinder = element(by.css('input#asset-category-assetCategoryName'));
  descriptionInput: ElementFinder = element(by.css('input#asset-category-description'));
  notesInput: ElementFinder = element(by.css('input#asset-category-notes'));
  remarksInput: ElementFinder = element(by.css('textarea#asset-category-remarks'));
  depreciationMethodSelect: ElementFinder = element(by.css('select#asset-category-depreciationMethod'));
  placeholderSelect: ElementFinder = element(by.css('select#asset-category-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAssetCategoryNameInput(assetCategoryName) {
    await this.assetCategoryNameInput.sendKeys(assetCategoryName);
  }

  async getAssetCategoryNameInput() {
    return this.assetCategoryNameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  async depreciationMethodSelectLastOption() {
    await this.depreciationMethodSelect.all(by.tagName('option')).last().click();
  }

  async depreciationMethodSelectOption(option) {
    await this.depreciationMethodSelect.sendKeys(option);
  }

  getDepreciationMethodSelect() {
    return this.depreciationMethodSelect;
  }

  async getDepreciationMethodSelectedOption() {
    return this.depreciationMethodSelect.element(by.css('option:checked')).getText();
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
    await this.setAssetCategoryNameInput('assetCategoryName');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput('notes');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    await this.depreciationMethodSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
