import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class AssetRegistrationUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.assetRegistration.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  assetNumberInput: ElementFinder = element(by.css('input#asset-registration-assetNumber'));
  assetTagInput: ElementFinder = element(by.css('input#asset-registration-assetTag'));
  assetDetailsInput: ElementFinder = element(by.css('input#asset-registration-assetDetails'));
  assetCostInput: ElementFinder = element(by.css('input#asset-registration-assetCost'));
  commentsInput: ElementFinder = element(by.css('input#asset-registration-comments'));
  placeholderSelect: ElementFinder = element(by.css('select#asset-registration-placeholder'));
  paymentInvoicesSelect: ElementFinder = element(by.css('select#asset-registration-paymentInvoices'));
  serviceOutletSelect: ElementFinder = element(by.css('select#asset-registration-serviceOutlet'));
  settlementSelect: ElementFinder = element(by.css('select#asset-registration-settlement'));
  assetCategorySelect: ElementFinder = element(by.css('select#asset-registration-assetCategory'));
  purchaseOrderSelect: ElementFinder = element(by.css('select#asset-registration-purchaseOrder'));
  deliveryNoteSelect: ElementFinder = element(by.css('select#asset-registration-deliveryNote'));
  jobSheetSelect: ElementFinder = element(by.css('select#asset-registration-jobSheet'));
  dealerSelect: ElementFinder = element(by.css('select#asset-registration-dealer'));
  designatedUsersSelect: ElementFinder = element(by.css('select#asset-registration-designatedUsers'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#asset-registration-settlementCurrency'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAssetNumberInput(assetNumber) {
    await this.assetNumberInput.sendKeys(assetNumber);
  }

  async getAssetNumberInput() {
    return this.assetNumberInput.getAttribute('value');
  }

  async setAssetTagInput(assetTag) {
    await this.assetTagInput.sendKeys(assetTag);
  }

  async getAssetTagInput() {
    return this.assetTagInput.getAttribute('value');
  }

  async setAssetDetailsInput(assetDetails) {
    await this.assetDetailsInput.sendKeys(assetDetails);
  }

  async getAssetDetailsInput() {
    return this.assetDetailsInput.getAttribute('value');
  }

  async setAssetCostInput(assetCost) {
    await this.assetCostInput.sendKeys(assetCost);
  }

  async getAssetCostInput() {
    return this.assetCostInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return this.commentsInput.getAttribute('value');
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

  async paymentInvoicesSelectLastOption() {
    await this.paymentInvoicesSelect.all(by.tagName('option')).last().click();
  }

  async paymentInvoicesSelectOption(option) {
    await this.paymentInvoicesSelect.sendKeys(option);
  }

  getPaymentInvoicesSelect() {
    return this.paymentInvoicesSelect;
  }

  async getPaymentInvoicesSelectedOption() {
    return this.paymentInvoicesSelect.element(by.css('option:checked')).getText();
  }

  async serviceOutletSelectLastOption() {
    await this.serviceOutletSelect.all(by.tagName('option')).last().click();
  }

  async serviceOutletSelectOption(option) {
    await this.serviceOutletSelect.sendKeys(option);
  }

  getServiceOutletSelect() {
    return this.serviceOutletSelect;
  }

  async getServiceOutletSelectedOption() {
    return this.serviceOutletSelect.element(by.css('option:checked')).getText();
  }

  async settlementSelectLastOption() {
    await this.settlementSelect.all(by.tagName('option')).last().click();
  }

  async settlementSelectOption(option) {
    await this.settlementSelect.sendKeys(option);
  }

  getSettlementSelect() {
    return this.settlementSelect;
  }

  async getSettlementSelectedOption() {
    return this.settlementSelect.element(by.css('option:checked')).getText();
  }

  async assetCategorySelectLastOption() {
    await this.assetCategorySelect.all(by.tagName('option')).last().click();
  }

  async assetCategorySelectOption(option) {
    await this.assetCategorySelect.sendKeys(option);
  }

  getAssetCategorySelect() {
    return this.assetCategorySelect;
  }

  async getAssetCategorySelectedOption() {
    return this.assetCategorySelect.element(by.css('option:checked')).getText();
  }

  async purchaseOrderSelectLastOption() {
    await this.purchaseOrderSelect.all(by.tagName('option')).last().click();
  }

  async purchaseOrderSelectOption(option) {
    await this.purchaseOrderSelect.sendKeys(option);
  }

  getPurchaseOrderSelect() {
    return this.purchaseOrderSelect;
  }

  async getPurchaseOrderSelectedOption() {
    return this.purchaseOrderSelect.element(by.css('option:checked')).getText();
  }

  async deliveryNoteSelectLastOption() {
    await this.deliveryNoteSelect.all(by.tagName('option')).last().click();
  }

  async deliveryNoteSelectOption(option) {
    await this.deliveryNoteSelect.sendKeys(option);
  }

  getDeliveryNoteSelect() {
    return this.deliveryNoteSelect;
  }

  async getDeliveryNoteSelectedOption() {
    return this.deliveryNoteSelect.element(by.css('option:checked')).getText();
  }

  async jobSheetSelectLastOption() {
    await this.jobSheetSelect.all(by.tagName('option')).last().click();
  }

  async jobSheetSelectOption(option) {
    await this.jobSheetSelect.sendKeys(option);
  }

  getJobSheetSelect() {
    return this.jobSheetSelect;
  }

  async getJobSheetSelectedOption() {
    return this.jobSheetSelect.element(by.css('option:checked')).getText();
  }

  async dealerSelectLastOption() {
    await this.dealerSelect.all(by.tagName('option')).last().click();
  }

  async dealerSelectOption(option) {
    await this.dealerSelect.sendKeys(option);
  }

  getDealerSelect() {
    return this.dealerSelect;
  }

  async getDealerSelectedOption() {
    return this.dealerSelect.element(by.css('option:checked')).getText();
  }

  async designatedUsersSelectLastOption() {
    await this.designatedUsersSelect.all(by.tagName('option')).last().click();
  }

  async designatedUsersSelectOption(option) {
    await this.designatedUsersSelect.sendKeys(option);
  }

  getDesignatedUsersSelect() {
    return this.designatedUsersSelect;
  }

  async getDesignatedUsersSelectedOption() {
    return this.designatedUsersSelect.element(by.css('option:checked')).getText();
  }

  async settlementCurrencySelectLastOption() {
    await this.settlementCurrencySelect.all(by.tagName('option')).last().click();
  }

  async settlementCurrencySelectOption(option) {
    await this.settlementCurrencySelect.sendKeys(option);
  }

  getSettlementCurrencySelect() {
    return this.settlementCurrencySelect;
  }

  async getSettlementCurrencySelectedOption() {
    return this.settlementCurrencySelect.element(by.css('option:checked')).getText();
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
    await this.setAssetNumberInput('assetNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssetTagInput('assetTag');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssetDetailsInput('assetDetails');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssetCostInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentsInput(absolutePath);
    // this.placeholderSelectLastOption();
    // this.paymentInvoicesSelectLastOption();
    // this.serviceOutletSelectLastOption();
    // this.settlementSelectLastOption();
    await this.assetCategorySelectLastOption();
    // this.purchaseOrderSelectLastOption();
    // this.deliveryNoteSelectLastOption();
    // this.jobSheetSelectLastOption();
    await this.dealerSelectLastOption();
    // this.designatedUsersSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
