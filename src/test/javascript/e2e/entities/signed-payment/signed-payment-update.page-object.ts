import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SignedPaymentUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.signedPayment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  transactionNumberInput: ElementFinder = element(by.css('input#signed-payment-transactionNumber'));
  transactionDateInput: ElementFinder = element(by.css('input#signed-payment-transactionDate'));
  transactionCurrencySelect: ElementFinder = element(by.css('select#signed-payment-transactionCurrency'));
  transactionAmountInput: ElementFinder = element(by.css('input#signed-payment-transactionAmount'));
  dealerNameInput: ElementFinder = element(by.css('input#signed-payment-dealerName'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#signed-payment-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#signed-payment-compilationToken'));
  paymentLabelSelect: ElementFinder = element(by.css('select#signed-payment-paymentLabel'));
  paymentCategorySelect: ElementFinder = element(by.css('select#signed-payment-paymentCategory'));
  placeholderSelect: ElementFinder = element(by.css('select#signed-payment-placeholder'));
  signedPaymentGroupSelect: ElementFinder = element(by.css('select#signed-payment-signedPaymentGroup'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTransactionNumberInput(transactionNumber) {
    await this.transactionNumberInput.sendKeys(transactionNumber);
  }

  async getTransactionNumberInput() {
    return this.transactionNumberInput.getAttribute('value');
  }

  async setTransactionDateInput(transactionDate) {
    await this.transactionDateInput.sendKeys(transactionDate);
  }

  async getTransactionDateInput() {
    return this.transactionDateInput.getAttribute('value');
  }

  async setTransactionCurrencySelect(transactionCurrency) {
    await this.transactionCurrencySelect.sendKeys(transactionCurrency);
  }

  async getTransactionCurrencySelect() {
    return this.transactionCurrencySelect.element(by.css('option:checked')).getText();
  }

  async transactionCurrencySelectLastOption() {
    await this.transactionCurrencySelect.all(by.tagName('option')).last().click();
  }
  async setTransactionAmountInput(transactionAmount) {
    await this.transactionAmountInput.sendKeys(transactionAmount);
  }

  async getTransactionAmountInput() {
    return this.transactionAmountInput.getAttribute('value');
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

  async paymentCategorySelectLastOption() {
    await this.paymentCategorySelect.all(by.tagName('option')).last().click();
  }

  async paymentCategorySelectOption(option) {
    await this.paymentCategorySelect.sendKeys(option);
  }

  getPaymentCategorySelect() {
    return this.paymentCategorySelect;
  }

  async getPaymentCategorySelectedOption() {
    return this.paymentCategorySelect.element(by.css('option:checked')).getText();
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

  async signedPaymentGroupSelectLastOption() {
    await this.signedPaymentGroupSelect.all(by.tagName('option')).last().click();
  }

  async signedPaymentGroupSelectOption(option) {
    await this.signedPaymentGroupSelect.sendKeys(option);
  }

  getSignedPaymentGroupSelect() {
    return this.signedPaymentGroupSelect;
  }

  async getSignedPaymentGroupSelectedOption() {
    return this.signedPaymentGroupSelect.element(by.css('option:checked')).getText();
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
    await this.setTransactionNumberInput('transactionNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setTransactionDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.transactionCurrencySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setTransactionAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDealerNameInput('dealerName');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.paymentLabelSelectLastOption();
    await this.paymentCategorySelectLastOption();
    // this.placeholderSelectLastOption();
    await this.signedPaymentGroupSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
