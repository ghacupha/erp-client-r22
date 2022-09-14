import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PurchaseOrderUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.purchaseOrder.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  purchaseOrderNumberInput: ElementFinder = element(by.css('input#purchase-order-purchaseOrderNumber'));
  purchaseOrderDateInput: ElementFinder = element(by.css('input#purchase-order-purchaseOrderDate'));
  purchaseOrderAmountInput: ElementFinder = element(by.css('input#purchase-order-purchaseOrderAmount'));
  descriptionInput: ElementFinder = element(by.css('input#purchase-order-description'));
  notesInput: ElementFinder = element(by.css('input#purchase-order-notes'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#purchase-order-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#purchase-order-compilationToken'));
  remarksInput: ElementFinder = element(by.css('textarea#purchase-order-remarks'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#purchase-order-settlementCurrency'));
  placeholderSelect: ElementFinder = element(by.css('select#purchase-order-placeholder'));
  signatoriesSelect: ElementFinder = element(by.css('select#purchase-order-signatories'));
  vendorSelect: ElementFinder = element(by.css('select#purchase-order-vendor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPurchaseOrderNumberInput(purchaseOrderNumber) {
    await this.purchaseOrderNumberInput.sendKeys(purchaseOrderNumber);
  }

  async getPurchaseOrderNumberInput() {
    return this.purchaseOrderNumberInput.getAttribute('value');
  }

  async setPurchaseOrderDateInput(purchaseOrderDate) {
    await this.purchaseOrderDateInput.sendKeys(purchaseOrderDate);
  }

  async getPurchaseOrderDateInput() {
    return this.purchaseOrderDateInput.getAttribute('value');
  }

  async setPurchaseOrderAmountInput(purchaseOrderAmount) {
    await this.purchaseOrderAmountInput.sendKeys(purchaseOrderAmount);
  }

  async getPurchaseOrderAmountInput() {
    return this.purchaseOrderAmountInput.getAttribute('value');
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

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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

  async signatoriesSelectLastOption() {
    await this.signatoriesSelect.all(by.tagName('option')).last().click();
  }

  async signatoriesSelectOption(option) {
    await this.signatoriesSelect.sendKeys(option);
  }

  getSignatoriesSelect() {
    return this.signatoriesSelect;
  }

  async getSignatoriesSelectedOption() {
    return this.signatoriesSelect.element(by.css('option:checked')).getText();
  }

  async vendorSelectLastOption() {
    await this.vendorSelect.all(by.tagName('option')).last().click();
  }

  async vendorSelectOption(option) {
    await this.vendorSelect.sendKeys(option);
  }

  getVendorSelect() {
    return this.vendorSelect;
  }

  async getVendorSelectedOption() {
    return this.vendorSelect.element(by.css('option:checked')).getText();
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
    await this.setPurchaseOrderNumberInput('purchaseOrderNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setPurchaseOrderDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setPurchaseOrderAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput('notes');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    await this.settlementCurrencySelectLastOption();
    // this.placeholderSelectLastOption();
    // this.signatoriesSelectLastOption();
    await this.vendorSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
