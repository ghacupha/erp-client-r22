import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class PaymentCalculationUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsPaymentCalculation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  paymentExpenseInput: ElementFinder = element(by.css('input#payment-calculation-paymentExpense'));
  withholdingVATInput: ElementFinder = element(by.css('input#payment-calculation-withholdingVAT'));
  withholdingTaxInput: ElementFinder = element(by.css('input#payment-calculation-withholdingTax'));
  paymentAmountInput: ElementFinder = element(by.css('input#payment-calculation-paymentAmount'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#payment-calculation-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#payment-calculation-compilationToken'));
  paymentLabelSelect: ElementFinder = element(by.css('select#payment-calculation-paymentLabel'));
  paymentCategorySelect: ElementFinder = element(by.css('select#payment-calculation-paymentCategory'));
  placeholderSelect: ElementFinder = element(by.css('select#payment-calculation-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPaymentExpenseInput(paymentExpense) {
    await this.paymentExpenseInput.sendKeys(paymentExpense);
  }

  async getPaymentExpenseInput() {
    return this.paymentExpenseInput.getAttribute('value');
  }

  async setWithholdingVATInput(withholdingVAT) {
    await this.withholdingVATInput.sendKeys(withholdingVAT);
  }

  async getWithholdingVATInput() {
    return this.withholdingVATInput.getAttribute('value');
  }

  async setWithholdingTaxInput(withholdingTax) {
    await this.withholdingTaxInput.sendKeys(withholdingTax);
  }

  async getWithholdingTaxInput() {
    return this.withholdingTaxInput.getAttribute('value');
  }

  async setPaymentAmountInput(paymentAmount) {
    await this.paymentAmountInput.sendKeys(paymentAmount);
  }

  async getPaymentAmountInput() {
    return this.paymentAmountInput.getAttribute('value');
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
    await this.setPaymentExpenseInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setWithholdingVATInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setWithholdingTaxInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPaymentAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.paymentLabelSelectLastOption();
    await this.paymentCategorySelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
