import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class SettlementUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.settlement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  paymentNumberInput: ElementFinder = element(by.css('input#settlement-paymentNumber'));
  paymentDateInput: ElementFinder = element(by.css('input#settlement-paymentDate'));
  paymentAmountInput: ElementFinder = element(by.css('input#settlement-paymentAmount'));
  descriptionInput: ElementFinder = element(by.css('input#settlement-description'));
  notesInput: ElementFinder = element(by.css('input#settlement-notes'));
  calculationFileInput: ElementFinder = element(by.css('input#settlement-calculationFile'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#settlement-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#settlement-compilationToken'));
  remarksInput: ElementFinder = element(by.css('textarea#settlement-remarks'));
  placeholderSelect: ElementFinder = element(by.css('select#settlement-placeholder'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#settlement-settlementCurrency'));
  paymentLabelSelect: ElementFinder = element(by.css('select#settlement-paymentLabel'));
  paymentCategorySelect: ElementFinder = element(by.css('select#settlement-paymentCategory'));
  groupSettlementSelect: ElementFinder = element(by.css('select#settlement-groupSettlement'));
  billerSelect: ElementFinder = element(by.css('select#settlement-biller'));
  paymentInvoiceSelect: ElementFinder = element(by.css('select#settlement-paymentInvoice'));
  signatoriesSelect: ElementFinder = element(by.css('select#settlement-signatories'));

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

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async setCalculationFileInput(calculationFile) {
    await this.calculationFileInput.sendKeys(calculationFile);
  }

  async getCalculationFileInput() {
    return this.calculationFileInput.getAttribute('value');
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

  async groupSettlementSelectLastOption() {
    await this.groupSettlementSelect.all(by.tagName('option')).last().click();
  }

  async groupSettlementSelectOption(option) {
    await this.groupSettlementSelect.sendKeys(option);
  }

  getGroupSettlementSelect() {
    return this.groupSettlementSelect;
  }

  async getGroupSettlementSelectedOption() {
    return this.groupSettlementSelect.element(by.css('option:checked')).getText();
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

  async paymentInvoiceSelectLastOption() {
    await this.paymentInvoiceSelect.all(by.tagName('option')).last().click();
  }

  async paymentInvoiceSelectOption(option) {
    await this.paymentInvoiceSelect.sendKeys(option);
  }

  getPaymentInvoiceSelect() {
    return this.paymentInvoiceSelect;
  }

  async getPaymentInvoiceSelectedOption() {
    return this.paymentInvoiceSelect.element(by.css('option:checked')).getText();
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
    await this.setPaymentAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput('notes');
    await waitUntilDisplayed(this.saveButton);
    await this.setCalculationFileInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    // this.placeholderSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    // this.paymentLabelSelectLastOption();
    await this.paymentCategorySelectLastOption();
    await this.groupSettlementSelectLastOption();
    await this.billerSelectLastOption();
    // this.paymentInvoiceSelectLastOption();
    // this.signatoriesSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
