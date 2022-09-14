import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class FixedAssetAcquisitionUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.assetsFixedAssetAcquisition.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  assetNumberInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-assetNumber'));
  serviceOutletCodeInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-serviceOutletCode'));
  assetTagInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-assetTag'));
  assetDescriptionInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-assetDescription'));
  purchaseDateInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-purchaseDate'));
  assetCategoryInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-assetCategory'));
  purchasePriceInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-purchasePrice'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#fixed-asset-acquisition-fileUploadToken'));
  placeholderSelect: ElementFinder = element(by.css('select#fixed-asset-acquisition-placeholder'));

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

  async setPurchaseDateInput(purchaseDate) {
    await this.purchaseDateInput.sendKeys(purchaseDate);
  }

  async getPurchaseDateInput() {
    return this.purchaseDateInput.getAttribute('value');
  }

  async setAssetCategoryInput(assetCategory) {
    await this.assetCategoryInput.sendKeys(assetCategory);
  }

  async getAssetCategoryInput() {
    return this.assetCategoryInput.getAttribute('value');
  }

  async setPurchasePriceInput(purchasePrice) {
    await this.purchasePriceInput.sendKeys(purchasePrice);
  }

  async getPurchasePriceInput() {
    return this.purchasePriceInput.getAttribute('value');
  }

  async setFileUploadTokenInput(fileUploadToken) {
    await this.fileUploadTokenInput.sendKeys(fileUploadToken);
  }

  async getFileUploadTokenInput() {
    return this.fileUploadTokenInput.getAttribute('value');
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
    await this.setPurchaseDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssetCategoryInput('assetCategory');
    await waitUntilDisplayed(this.saveButton);
    await this.setPurchasePriceInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
