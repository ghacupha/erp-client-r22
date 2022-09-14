import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class InvoiceUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsInvoice.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  invoiceNumberInput: ElementFinder = element(by.css('input#invoice-invoiceNumber'));
  invoiceDateInput: ElementFinder = element(by.css('input#invoice-invoiceDate'));
  invoiceAmountInput: ElementFinder = element(by.css('input#invoice-invoiceAmount'));
  currencySelect: ElementFinder = element(by.css('select#invoice-currency'));
  paymentReferenceInput: ElementFinder = element(by.css('input#invoice-paymentReference'));
  dealerNameInput: ElementFinder = element(by.css('input#invoice-dealerName'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#invoice-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#invoice-compilationToken'));
  paymentLabelSelect: ElementFinder = element(by.css('select#invoice-paymentLabel'));
  placeholderSelect: ElementFinder = element(by.css('select#invoice-placeholder'));

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

  async setCurrencySelect(currency) {
    await this.currencySelect.sendKeys(currency);
  }

  async getCurrencySelect() {
    return this.currencySelect.element(by.css('option:checked')).getText();
  }

  async currencySelectLastOption() {
    await this.currencySelect.all(by.tagName('option')).last().click();
  }
  async setPaymentReferenceInput(paymentReference) {
    await this.paymentReferenceInput.sendKeys(paymentReference);
  }

  async getPaymentReferenceInput() {
    return this.paymentReferenceInput.getAttribute('value');
  }

  async setDealerNameInput(dealerName) {
    await this.dealerNameInput.sendKeys(dealerName);
  }

  async getDealerNameInput() {
    return this.dealerNameInput.getAttribute('value');
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
    await this.setInvoiceNumberInput('invoiceNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setInvoiceDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setInvoiceAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.currencySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentReferenceInput('paymentReference');
    await waitUntilDisplayed(this.saveButton);
    await this.setDealerNameInput('dealerName');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.paymentLabelSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
