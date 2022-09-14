import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PrepaymentAccountUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentAccount.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  catalogueNumberInput: ElementFinder = element(by.css('input#prepayment-account-catalogueNumber'));
  particularsInput: ElementFinder = element(by.css('input#prepayment-account-particulars'));
  notesInput: ElementFinder = element(by.css('textarea#prepayment-account-notes'));
  prepaymentAmountInput: ElementFinder = element(by.css('input#prepayment-account-prepaymentAmount'));
  prepaymentGuidInput: ElementFinder = element(by.css('input#prepayment-account-prepaymentGuid'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#prepayment-account-settlementCurrency'));
  prepaymentTransactionSelect: ElementFinder = element(by.css('select#prepayment-account-prepaymentTransaction'));
  serviceOutletSelect: ElementFinder = element(by.css('select#prepayment-account-serviceOutlet'));
  dealerSelect: ElementFinder = element(by.css('select#prepayment-account-dealer'));
  debitAccountSelect: ElementFinder = element(by.css('select#prepayment-account-debitAccount'));
  transferAccountSelect: ElementFinder = element(by.css('select#prepayment-account-transferAccount'));
  placeholderSelect: ElementFinder = element(by.css('select#prepayment-account-placeholder'));
  generalParametersSelect: ElementFinder = element(by.css('select#prepayment-account-generalParameters'));
  prepaymentParametersSelect: ElementFinder = element(by.css('select#prepayment-account-prepaymentParameters'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCatalogueNumberInput(catalogueNumber) {
    await this.catalogueNumberInput.sendKeys(catalogueNumber);
  }

  async getCatalogueNumberInput() {
    return this.catalogueNumberInput.getAttribute('value');
  }

  async setParticularsInput(particulars) {
    await this.particularsInput.sendKeys(particulars);
  }

  async getParticularsInput() {
    return this.particularsInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async setPrepaymentAmountInput(prepaymentAmount) {
    await this.prepaymentAmountInput.sendKeys(prepaymentAmount);
  }

  async getPrepaymentAmountInput() {
    return this.prepaymentAmountInput.getAttribute('value');
  }

  async setPrepaymentGuidInput(prepaymentGuid) {
    await this.prepaymentGuidInput.sendKeys(prepaymentGuid);
  }

  async getPrepaymentGuidInput() {
    return this.prepaymentGuidInput.getAttribute('value');
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

  async prepaymentTransactionSelectLastOption() {
    await this.prepaymentTransactionSelect.all(by.tagName('option')).last().click();
  }

  async prepaymentTransactionSelectOption(option) {
    await this.prepaymentTransactionSelect.sendKeys(option);
  }

  getPrepaymentTransactionSelect() {
    return this.prepaymentTransactionSelect;
  }

  async getPrepaymentTransactionSelectedOption() {
    return this.prepaymentTransactionSelect.element(by.css('option:checked')).getText();
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

  async debitAccountSelectLastOption() {
    await this.debitAccountSelect.all(by.tagName('option')).last().click();
  }

  async debitAccountSelectOption(option) {
    await this.debitAccountSelect.sendKeys(option);
  }

  getDebitAccountSelect() {
    return this.debitAccountSelect;
  }

  async getDebitAccountSelectedOption() {
    return this.debitAccountSelect.element(by.css('option:checked')).getText();
  }

  async transferAccountSelectLastOption() {
    await this.transferAccountSelect.all(by.tagName('option')).last().click();
  }

  async transferAccountSelectOption(option) {
    await this.transferAccountSelect.sendKeys(option);
  }

  getTransferAccountSelect() {
    return this.transferAccountSelect;
  }

  async getTransferAccountSelectedOption() {
    return this.transferAccountSelect.element(by.css('option:checked')).getText();
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

  async generalParametersSelectLastOption() {
    await this.generalParametersSelect.all(by.tagName('option')).last().click();
  }

  async generalParametersSelectOption(option) {
    await this.generalParametersSelect.sendKeys(option);
  }

  getGeneralParametersSelect() {
    return this.generalParametersSelect;
  }

  async getGeneralParametersSelectedOption() {
    return this.generalParametersSelect.element(by.css('option:checked')).getText();
  }

  async prepaymentParametersSelectLastOption() {
    await this.prepaymentParametersSelect.all(by.tagName('option')).last().click();
  }

  async prepaymentParametersSelectOption(option) {
    await this.prepaymentParametersSelect.sendKeys(option);
  }

  getPrepaymentParametersSelect() {
    return this.prepaymentParametersSelect;
  }

  async getPrepaymentParametersSelectedOption() {
    return this.prepaymentParametersSelect.element(by.css('option:checked')).getText();
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
    await this.setCatalogueNumberInput('catalogueNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setParticularsInput('particulars');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput('notes');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentGuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await this.settlementCurrencySelectLastOption();
    await this.prepaymentTransactionSelectLastOption();
    await this.serviceOutletSelectLastOption();
    await this.dealerSelectLastOption();
    await this.debitAccountSelectLastOption();
    await this.transferAccountSelectLastOption();
    // this.placeholderSelectLastOption();
    // this.generalParametersSelectLastOption();
    // this.prepaymentParametersSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
