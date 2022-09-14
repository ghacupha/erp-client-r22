import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AmortizationSequenceUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.amortizationSequence.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  prepaymentAccountGuidInput: ElementFinder = element(by.css('input#amortization-sequence-prepaymentAccountGuid'));
  recurrenceGuidInput: ElementFinder = element(by.css('input#amortization-sequence-recurrenceGuid'));
  sequenceNumberInput: ElementFinder = element(by.css('input#amortization-sequence-sequenceNumber'));
  particularsInput: ElementFinder = element(by.css('input#amortization-sequence-particulars'));
  currentAmortizationDateInput: ElementFinder = element(by.css('input#amortization-sequence-currentAmortizationDate'));
  previousAmortizationDateInput: ElementFinder = element(by.css('input#amortization-sequence-previousAmortizationDate'));
  nextAmortizationDateInput: ElementFinder = element(by.css('input#amortization-sequence-nextAmortizationDate'));
  isCommencementSequenceInput: ElementFinder = element(by.css('input#amortization-sequence-isCommencementSequence'));
  isTerminalSequenceInput: ElementFinder = element(by.css('input#amortization-sequence-isTerminalSequence'));
  amortizationAmountInput: ElementFinder = element(by.css('input#amortization-sequence-amortizationAmount'));
  sequenceGuidInput: ElementFinder = element(by.css('input#amortization-sequence-sequenceGuid'));
  prepaymentAccountSelect: ElementFinder = element(by.css('select#amortization-sequence-prepaymentAccount'));
  amortizationRecurrenceSelect: ElementFinder = element(by.css('select#amortization-sequence-amortizationRecurrence'));
  placeholderSelect: ElementFinder = element(by.css('select#amortization-sequence-placeholder'));
  prepaymentMappingSelect: ElementFinder = element(by.css('select#amortization-sequence-prepaymentMapping'));
  applicationParametersSelect: ElementFinder = element(by.css('select#amortization-sequence-applicationParameters'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPrepaymentAccountGuidInput(prepaymentAccountGuid) {
    await this.prepaymentAccountGuidInput.sendKeys(prepaymentAccountGuid);
  }

  async getPrepaymentAccountGuidInput() {
    return this.prepaymentAccountGuidInput.getAttribute('value');
  }

  async setRecurrenceGuidInput(recurrenceGuid) {
    await this.recurrenceGuidInput.sendKeys(recurrenceGuid);
  }

  async getRecurrenceGuidInput() {
    return this.recurrenceGuidInput.getAttribute('value');
  }

  async setSequenceNumberInput(sequenceNumber) {
    await this.sequenceNumberInput.sendKeys(sequenceNumber);
  }

  async getSequenceNumberInput() {
    return this.sequenceNumberInput.getAttribute('value');
  }

  async setParticularsInput(particulars) {
    await this.particularsInput.sendKeys(particulars);
  }

  async getParticularsInput() {
    return this.particularsInput.getAttribute('value');
  }

  async setCurrentAmortizationDateInput(currentAmortizationDate) {
    await this.currentAmortizationDateInput.sendKeys(currentAmortizationDate);
  }

  async getCurrentAmortizationDateInput() {
    return this.currentAmortizationDateInput.getAttribute('value');
  }

  async setPreviousAmortizationDateInput(previousAmortizationDate) {
    await this.previousAmortizationDateInput.sendKeys(previousAmortizationDate);
  }

  async getPreviousAmortizationDateInput() {
    return this.previousAmortizationDateInput.getAttribute('value');
  }

  async setNextAmortizationDateInput(nextAmortizationDate) {
    await this.nextAmortizationDateInput.sendKeys(nextAmortizationDate);
  }

  async getNextAmortizationDateInput() {
    return this.nextAmortizationDateInput.getAttribute('value');
  }

  getIsCommencementSequenceInput() {
    return this.isCommencementSequenceInput;
  }
  getIsTerminalSequenceInput() {
    return this.isTerminalSequenceInput;
  }
  async setAmortizationAmountInput(amortizationAmount) {
    await this.amortizationAmountInput.sendKeys(amortizationAmount);
  }

  async getAmortizationAmountInput() {
    return this.amortizationAmountInput.getAttribute('value');
  }

  async setSequenceGuidInput(sequenceGuid) {
    await this.sequenceGuidInput.sendKeys(sequenceGuid);
  }

  async getSequenceGuidInput() {
    return this.sequenceGuidInput.getAttribute('value');
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

  async amortizationRecurrenceSelectLastOption() {
    await this.amortizationRecurrenceSelect.all(by.tagName('option')).last().click();
  }

  async amortizationRecurrenceSelectOption(option) {
    await this.amortizationRecurrenceSelect.sendKeys(option);
  }

  getAmortizationRecurrenceSelect() {
    return this.amortizationRecurrenceSelect;
  }

  async getAmortizationRecurrenceSelectedOption() {
    return this.amortizationRecurrenceSelect.element(by.css('option:checked')).getText();
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

  async prepaymentMappingSelectLastOption() {
    await this.prepaymentMappingSelect.all(by.tagName('option')).last().click();
  }

  async prepaymentMappingSelectOption(option) {
    await this.prepaymentMappingSelect.sendKeys(option);
  }

  getPrepaymentMappingSelect() {
    return this.prepaymentMappingSelect;
  }

  async getPrepaymentMappingSelectedOption() {
    return this.prepaymentMappingSelect.element(by.css('option:checked')).getText();
  }

  async applicationParametersSelectLastOption() {
    await this.applicationParametersSelect.all(by.tagName('option')).last().click();
  }

  async applicationParametersSelectOption(option) {
    await this.applicationParametersSelect.sendKeys(option);
  }

  getApplicationParametersSelect() {
    return this.applicationParametersSelect;
  }

  async getApplicationParametersSelectedOption() {
    return this.applicationParametersSelect.element(by.css('option:checked')).getText();
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
    await this.setPrepaymentAccountGuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setRecurrenceGuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setSequenceNumberInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setParticularsInput('particulars');
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrentAmortizationDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setPreviousAmortizationDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setNextAmortizationDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    const selectedIsCommencementSequence = await this.getIsCommencementSequenceInput().isSelected();
    if (selectedIsCommencementSequence) {
      await this.getIsCommencementSequenceInput().click();
    } else {
      await this.getIsCommencementSequenceInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedIsTerminalSequence = await this.getIsTerminalSequenceInput().isSelected();
    if (selectedIsTerminalSequence) {
      await this.getIsTerminalSequenceInput().click();
    } else {
      await this.getIsTerminalSequenceInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setAmortizationAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setSequenceGuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await this.prepaymentAccountSelectLastOption();
    await this.amortizationRecurrenceSelectLastOption();
    // this.placeholderSelectLastOption();
    // this.prepaymentMappingSelectLastOption();
    // this.applicationParametersSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
