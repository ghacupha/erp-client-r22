import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PrepaymentAmortizationUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentAmortization.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#prepayment-amortization-description'));
  prepaymentPeriodInput: ElementFinder = element(by.css('input#prepayment-amortization-prepaymentPeriod'));
  prepaymentAmountInput: ElementFinder = element(by.css('input#prepayment-amortization-prepaymentAmount'));
  inactiveInput: ElementFinder = element(by.css('input#prepayment-amortization-inactive'));
  prepaymentAccountSelect: ElementFinder = element(by.css('select#prepayment-amortization-prepaymentAccount'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#prepayment-amortization-settlementCurrency'));
  debitAccountSelect: ElementFinder = element(by.css('select#prepayment-amortization-debitAccount'));
  creditAccountSelect: ElementFinder = element(by.css('select#prepayment-amortization-creditAccount'));
  placeholderSelect: ElementFinder = element(by.css('select#prepayment-amortization-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPrepaymentPeriodInput(prepaymentPeriod) {
    await this.prepaymentPeriodInput.sendKeys(prepaymentPeriod);
  }

  async getPrepaymentPeriodInput() {
    return this.prepaymentPeriodInput.getAttribute('value');
  }

  async setPrepaymentAmountInput(prepaymentAmount) {
    await this.prepaymentAmountInput.sendKeys(prepaymentAmount);
  }

  async getPrepaymentAmountInput() {
    return this.prepaymentAmountInput.getAttribute('value');
  }

  getInactiveInput() {
    return this.inactiveInput;
  }
  async prepaymentAccountSelectLastOption() {
    await this.prepaymentAccountSelect.all(by.tagName('option')).last().click();
  }

  async prepaymentAccountSelectOption(option) {
    await this.prepaymentAccountSelect.sendKeys(option);
  }

  getPrepaymentAccountSelect() {
    return this.prepaymentAccountSelect;
  }

  async getPrepaymentAccountSelectedOption() {
    return this.prepaymentAccountSelect.element(by.css('option:checked')).getText();
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

  async creditAccountSelectLastOption() {
    await this.creditAccountSelect.all(by.tagName('option')).last().click();
  }

  async creditAccountSelectOption(option) {
    await this.creditAccountSelect.sendKeys(option);
  }

  getCreditAccountSelect() {
    return this.creditAccountSelect;
  }

  async getCreditAccountSelectedOption() {
    return this.creditAccountSelect.element(by.css('option:checked')).getText();
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
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentPeriodInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    const selectedInactive = await this.getInactiveInput().isSelected();
    if (selectedInactive) {
      await this.getInactiveInput().click();
    } else {
      await this.getInactiveInput().click();
    }
    await this.prepaymentAccountSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    await this.debitAccountSelectLastOption();
    await this.creditAccountSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
