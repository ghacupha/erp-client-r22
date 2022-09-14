import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CreditNoteUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.creditNote.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  creditNumberInput: ElementFinder = element(by.css('input#credit-note-creditNumber'));
  creditNoteDateInput: ElementFinder = element(by.css('input#credit-note-creditNoteDate'));
  creditAmountInput: ElementFinder = element(by.css('input#credit-note-creditAmount'));
  remarksInput: ElementFinder = element(by.css('textarea#credit-note-remarks'));
  purchaseOrdersSelect: ElementFinder = element(by.css('select#credit-note-purchaseOrders'));
  invoicesSelect: ElementFinder = element(by.css('select#credit-note-invoices'));
  paymentLabelSelect: ElementFinder = element(by.css('select#credit-note-paymentLabel'));
  placeholderSelect: ElementFinder = element(by.css('select#credit-note-placeholder'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#credit-note-settlementCurrency'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCreditNumberInput(creditNumber) {
    await this.creditNumberInput.sendKeys(creditNumber);
  }

  async getCreditNumberInput() {
    return this.creditNumberInput.getAttribute('value');
  }

  async setCreditNoteDateInput(creditNoteDate) {
    await this.creditNoteDateInput.sendKeys(creditNoteDate);
  }

  async getCreditNoteDateInput() {
    return this.creditNoteDateInput.getAttribute('value');
  }

  async setCreditAmountInput(creditAmount) {
    await this.creditAmountInput.sendKeys(creditAmount);
  }

  async getCreditAmountInput() {
    return this.creditAmountInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  async purchaseOrdersSelectLastOption() {
    await this.purchaseOrdersSelect.all(by.tagName('option')).last().click();
  }

  async purchaseOrdersSelectOption(option) {
    await this.purchaseOrdersSelect.sendKeys(option);
  }

  getPurchaseOrdersSelect() {
    return this.purchaseOrdersSelect;
  }

  async getPurchaseOrdersSelectedOption() {
    return this.purchaseOrdersSelect.element(by.css('option:checked')).getText();
  }

  async invoicesSelectLastOption() {
    await this.invoicesSelect.all(by.tagName('option')).last().click();
  }

  async invoicesSelectOption(option) {
    await this.invoicesSelect.sendKeys(option);
  }

  getInvoicesSelect() {
    return this.invoicesSelect;
  }

  async getInvoicesSelectedOption() {
    return this.invoicesSelect.element(by.css('option:checked')).getText();
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
    await this.setCreditNumberInput('creditNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreditNoteDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreditAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    // this.purchaseOrdersSelectLastOption();
    // this.invoicesSelectLastOption();
    // this.paymentLabelSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
