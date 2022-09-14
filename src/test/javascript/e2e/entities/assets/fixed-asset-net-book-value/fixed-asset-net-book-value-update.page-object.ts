import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class FixedAssetNetBookValueUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.assetsFixedAssetNetBookValue.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  assetNumberInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-assetNumber'));
  serviceOutletCodeInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-serviceOutletCode'));
  assetTagInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-assetTag'));
  assetDescriptionInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-assetDescription'));
  netBookValueDateInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-netBookValueDate'));
  assetCategoryInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-assetCategory'));
  netBookValueInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-netBookValue'));
  depreciationRegimeSelect: ElementFinder = element(by.css('select#fixed-asset-net-book-value-depreciationRegime'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#fixed-asset-net-book-value-compilationToken'));
  placeholderSelect: ElementFinder = element(by.css('select#fixed-asset-net-book-value-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAssetNumberInput(assetNumber) {
    await this.assetNumberInput.sendKeys(assetNumber);
  }

  async getAssetNumberInput() {
    return this.assetNumberInput.getAttribute('value');
  }

  async setServiceOutletCodeInput(serviceOutletCode) {
    await this.serviceOutletCodeInput.sendKeys(serviceOutletCode);
  }

  async getServiceOutletCodeInput() {
    return this.serviceOutletCodeInput.getAttribute('value');
  }

  async setAssetTagInput(assetTag) {
    await this.assetTagInput.sendKeys(assetTag);
  }

  async getAssetTagInput() {
    return this.assetTagInput.getAttribute('value');
  }

  async setAssetDescriptionInput(assetDescription) {
    await this.assetDescriptionInput.sendKeys(assetDescription);
  }

  async getAssetDescriptionInput() {
    return this.assetDescriptionInput.getAttribute('value');
  }

  async setNetBookValueDateInput(netBookValueDate) {
    await this.netBookValueDateInput.sendKeys(netBookValueDate);
  }

  async getNetBookValueDateInput() {
    return this.netBookValueDateInput.getAttribute('value');
  }

  async setAssetCategoryInput(assetCategory) {
    await this.assetCategoryInput.sendKeys(assetCategory);
  }

  async getAssetCategoryInput() {
    return this.assetCategoryInput.getAttribute('value');
  }

  async setNetBookValueInput(netBookValue) {
    await this.netBookValueInput.sendKeys(netBookValue);
  }

  async getNetBookValueInput() {
    return this.netBookValueInput.getAttribute('value');
  }

  async setDepreciationRegimeSelect(depreciationRegime) {
    await this.depreciationRegimeSelect.sendKeys(depreciationRegime);
  }

  async getDepreciationRegimeSelect() {
    return this.depreciationRegimeSelect.element(by.css('option:checked')).getText();
  }

  async depreciationRegimeSelectLastOption() {
    await this.depreciationRegimeSelect.all(by.tagName('option')).last().click();
  }
  async setFileUploadTokenInput(fileUploadToken) {
    await this.fileUploadTokenInput.sendKeys(fileUploadToken);
  }

  async getFileUploadTokenInput() {
    return this.fileUploadTokenInput.getAttribute('value');
  }

  async setCompilationTokenInput(compilationToken) {
    await this.compilationTokenInput.sendKeys(compilationToken);
  }

  async getCompilationTokenInput() {
    return this.compilationTokenInput.getAttribute('value');
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
    await this.setAssetNumberInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setServiceOutletCodeInput('serviceOutletCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssetTagInput('assetTag');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssetDescriptionInput('assetDescription');
    await waitUntilDisplayed(this.saveButton);
    await this.setNetBookValueDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssetCategoryInput('assetCategory');
    await waitUntilDisplayed(this.saveButton);
    await this.setNetBookValueInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.depreciationRegimeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
