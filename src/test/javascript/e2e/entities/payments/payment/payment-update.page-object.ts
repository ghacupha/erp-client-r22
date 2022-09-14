import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class PaymentUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsPayment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  paymentNumberInput: ElementFinder = element(by.css('input#payment-paymentNumber'));
  paymentDateInput: ElementFinder = element(by.css('input#payment-paymentDate'));
  invoicedAmountInput: ElementFinder = element(by.css('input#payment-invoicedAmount'));
  paymentAmountInput: ElementFinder = element(by.css('input#payment-paymentAmount'));
  descriptionInput: ElementFinder = element(by.css('input#payment-description'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#payment-settlementCurrency'));
  calculationFileInput: ElementFinder = element(by.css('input#payment-calculationFile'));
  dealerNameInput: ElementFinder = element(by.css('input#payment-dealerName'));
  purchaseOrderNumberInput: ElementFinder = element(by.css('input#payment-purchaseOrderNumber'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#payment-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#payment-compilationToken'));
  paymentLabelSelect: ElementFinder = element(by.css('select#payment-paymentLabel'));
  paymentCategorySelect: ElementFinder = element(by.css('select#payment-paymentCategory'));
  placeholderSelect: ElementFinder = element(by.css('select#payment-placeholder'));
  paymentGroupSelect: ElementFinder = element(by.css('select#payment-paymentGroup'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPaymentNumberInput(paymentNumber) {
    await this.paymentNumberInput.sendKeys(paymentNumber);
  }

  async getPaymentNumberInput() {
    return this.paymentNumberInput.getAttribute('value');
  }

  async setPaymentDateInput(paymentDate) {
    await this.paymentDateInput.sendKeys(paymentDate);
  }

  async getPaymentDateInput() {
    return this.paymentDateInput.getAttribute('value');
  }

  async setInvoicedAmountInput(invoicedAmount) {
    await this.invoicedAmountInput.sendKeys(invoicedAmount);
  }

  async getInvoicedAmountInput() {
    return this.invoicedAmountInput.getAttribute('value');
  }

  async setPaymentAmountInput(paymentAmount) {
    await this.paymentAmountInput.sendKeys(paymentAmount);
  }

  async getPaymentAmountInput() {
    return this.paymentAmountInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setSettlementCurrencySelect(settlementCurrency) {
    await this.settlementCurrencySelect.sendKeys(settlementCurrency);
  }

  async getSettlementCurrencySelect() {
    return this.settlementCurrencySelect.element(by.css('option:checked')).getText();
  }

  async settlementCurrencySelectLastOption() {
    await this.settlementCurrencySelect.all(by.tagName('option')).last().click();
  }
  async setCalculationFileInput(calculationFile) {
    await this.calculationFileInput.sendKeys(calculationFile);
  }

  async getCalculationFileInput() {
    return this.calculationFileInput.getAttribute('value');
  }

  async setDealerNameInput(dealerName) {
    await this.dealerNameInput.sendKeys(dealerName);
  }

  async getDealerNameInput() {
    return this.dealerNameInput.getAttribute('value');
  }

  async setPurchaseOrderNumberInput(purchaseOrderNumber) {
    await this.purchaseOrderNumberInput.sendKeys(purchaseOrderNumber);
  }

  async getPurchaseOrderNumberInput() {
    return this.purchaseOrderNumberInput.getAttribute('value');
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

  async paymentGroupSelectLastOption() {
    await this.paymentGroupSelect.all(by.tagName('option')).last().click();
  }

  async paymentGroupSelectOption(option) {
    await this.paymentGroupSelect.sendKeys(option);
  }

  getPaymentGroupSelect() {
    return this.paymentGroupSelect;
  }

  async getPaymentGroupSelectedOption() {
    return this.paymentGroupSelect.element(by.css('option:checked')).getText();
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
    await this.setPaymentNumberInput('paymentNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setInvoicedAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.settlementCurrencySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setCalculationFileInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setDealerNameInput('dealerName');
    await waitUntilDisplayed(this.saveButton);
    await this.setPurchaseOrderNumberInput('purchaseOrderNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.paymentLabelSelectLastOption();
    await this.paymentCategorySelectLastOption();
    // this.placeholderSelectLastOption();
    await this.paymentGroupSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
