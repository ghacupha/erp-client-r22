import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PrepaymentMarshallingUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.prepaymentMarshalling.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  inactiveInput: ElementFinder = element(by.css('input#prepayment-marshalling-inactive'));
  amortizationCommencementDateInput: ElementFinder = element(by.css('input#prepayment-marshalling-amortizationCommencementDate'));
  amortizationPeriodsInput: ElementFinder = element(by.css('input#prepayment-marshalling-amortizationPeriods'));
  prepaymentAccountSelect: ElementFinder = element(by.css('select#prepayment-marshalling-prepaymentAccount'));
  placeholderSelect: ElementFinder = element(by.css('select#prepayment-marshalling-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  getInactiveInput() {
    return this.inactiveInput;
  }
  async setAmortizationCommencementDateInput(amortizationCommencementDate) {
    await this.amortizationCommencementDateInput.sendKeys(amortizationCommencementDate);
  }

  async getAmortizationCommencementDateInput() {
    return this.amortizationCommencementDateInput.getAttribute('value');
  }

  async setAmortizationPeriodsInput(amortizationPeriods) {
    await this.amortizationPeriodsInput.sendKeys(amortizationPeriods);
  }

  async getAmortizationPeriodsInput() {
    return this.amortizationPeriodsInput.getAttribute('value');
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
    const selectedInactive = await this.getInactiveInput().isSelected();
    if (selectedInactive) {
      await this.getInactiveInput().click();
    } else {
      await this.getInactiveInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setAmortizationCommencementDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setAmortizationPeriodsInput('5');
    await this.prepaymentAccountSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
