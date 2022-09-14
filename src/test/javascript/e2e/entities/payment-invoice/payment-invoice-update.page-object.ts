import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PaymentInvoiceUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentInvoice.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  invoiceNumberInput: ElementFinder = element(by.css('input#payment-invoice-invoiceNumber'));
  invoiceDateInput: ElementFinder = element(by.css('input#payment-invoice-invoiceDate'));
  invoiceAmountInput: ElementFinder = element(by.css('input#payment-invoice-invoiceAmount'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#payment-invoice-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#payment-invoice-compilationToken'));
  remarksInput: ElementFinder = element(by.css('textarea#payment-invoice-remarks'));
  purchaseOrderSelect: ElementFinder = element(by.css('select#payment-invoice-purchaseOrder'));
  placeholderSelect: ElementFinder = element(by.css('select#payment-invoice-placeholder'));
  paymentLabelSelect: ElementFinder = element(by.css('select#payment-invoice-paymentLabel'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#payment-invoice-settlementCurrency'));
  billerSelect: ElementFinder = element(by.css('select#payment-invoice-biller'));
  deliveryNoteSelect: ElementFinder = element(by.css('select#payment-invoice-deliveryNote'));
  jobSheetSelect: ElementFinder = element(by.css('select#payment-invoice-jobSheet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setInvoiceNumberInput(invoiceNumber) {
    await this.invoiceNumberInput.sendKeys(invoiceNumber);
  }

  async getInvoiceNumberInput() {
    return this.invoiceNumberInput.getAttribute('value');
  }

  async setInvoiceDateInput(invoiceDate) {
    await this.invoiceDateInput.sendKeys(invoiceDate);
  }

  async getInvoiceDateInput() {
    return this.invoiceDateInput.getAttribute('value');
  }

  async setInvoiceAmountInput(invoiceAmount) {
    await this.invoiceAmountInput.sendKeys(invoiceAmount);
  }

  async getInvoiceAmountInput() {
    return this.invoiceAmountInput.getAttribute('value');
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

  async paymentLabelSelectLastOption() {
    await this.paymentLabelSelect.all(by.tagName('option')).last().click();
  }

  async paymentLabelSelectOption(option) {
    await this.paymentLabelSelect.sendKeys(option);
  }

  getPaymentLabelSelect() {
    return this.paymentLabelSelect;
  }

  async getPaymentLabelSelectedOption() {
    return this.paymentLabelSelect.element(by.css('option:checked')).getText();
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

  async billerSelectLastOption() {
    await this.billerSelect.all(by.tagName('option')).last().click();
  }

  async billerSelectOption(option) {
    await this.billerSelect.sendKeys(option);
  }

  getBillerSelect() {
    return this.billerSelect;
  }

  async getBillerSelectedOption() {
    return this.billerSelect.element(by.css('option:checked')).getText();
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
    await this.setInvoiceNumberInput('invoiceNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setInvoiceDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setInvoiceAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    // this.purchaseOrderSelectLastOption();
    // this.placeholderSelectLastOption();
    // this.paymentLabelSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    await this.billerSelectLastOption();
    // this.deliveryNoteSelectLastOption();
    // this.jobSheetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
