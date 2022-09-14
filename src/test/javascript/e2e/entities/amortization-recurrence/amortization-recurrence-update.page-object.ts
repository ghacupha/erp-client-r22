import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class AmortizationRecurrenceUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.amortizationRecurrence.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstAmortizationDateInput: ElementFinder = element(by.css('input#amortization-recurrence-firstAmortizationDate'));
  amortizationFrequencySelect: ElementFinder = element(by.css('select#amortization-recurrence-amortizationFrequency'));
  numberOfRecurrencesInput: ElementFinder = element(by.css('input#amortization-recurrence-numberOfRecurrences'));
  notesInput: ElementFinder = element(by.css('input#amortization-recurrence-notes'));
  particularsInput: ElementFinder = element(by.css('input#amortization-recurrence-particulars'));
  isActiveInput: ElementFinder = element(by.css('input#amortization-recurrence-isActive'));
  isOverWrittenInput: ElementFinder = element(by.css('input#amortization-recurrence-isOverWritten'));
  timeOfInstallationInput: ElementFinder = element(by.css('input#amortization-recurrence-timeOfInstallation'));
  recurrenceGuidInput: ElementFinder = element(by.css('input#amortization-recurrence-recurrenceGuid'));
  prepaymentAccountGuidInput: ElementFinder = element(by.css('input#amortization-recurrence-prepaymentAccountGuid'));
  placeholderSelect: ElementFinder = element(by.css('select#amortization-recurrence-placeholder'));
  parametersSelect: ElementFinder = element(by.css('select#amortization-recurrence-parameters'));
  applicationParametersSelect: ElementFinder = element(by.css('select#amortization-recurrence-applicationParameters'));
  depreciationMethodSelect: ElementFinder = element(by.css('select#amortization-recurrence-depreciationMethod'));
  prepaymentAccountSelect: ElementFinder = element(by.css('select#amortization-recurrence-prepaymentAccount'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstAmortizationDateInput(firstAmortizationDate) {
    await this.firstAmortizationDateInput.sendKeys(firstAmortizationDate);
  }

  async getFirstAmortizationDateInput() {
    return this.firstAmortizationDateInput.getAttribute('value');
  }

  async setAmortizationFrequencySelect(amortizationFrequency) {
    await this.amortizationFrequencySelect.sendKeys(amortizationFrequency);
  }

  async getAmortizationFrequencySelect() {
    return this.amortizationFrequencySelect.element(by.css('option:checked')).getText();
  }

  async amortizationFrequencySelectLastOption() {
    await this.amortizationFrequencySelect.all(by.tagName('option')).last().click();
  }
  async setNumberOfRecurrencesInput(numberOfRecurrences) {
    await this.numberOfRecurrencesInput.sendKeys(numberOfRecurrences);
  }

  async getNumberOfRecurrencesInput() {
    return this.numberOfRecurrencesInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async setParticularsInput(particulars) {
    await this.particularsInput.sendKeys(particulars);
  }

  async getParticularsInput() {
    return this.particularsInput.getAttribute('value');
  }

  getIsActiveInput() {
    return this.isActiveInput;
  }
  getIsOverWrittenInput() {
    return this.isOverWrittenInput;
  }
  async setTimeOfInstallationInput(timeOfInstallation) {
    await this.timeOfInstallationInput.sendKeys(timeOfInstallation);
  }

  async getTimeOfInstallationInput() {
    return this.timeOfInstallationInput.getAttribute('value');
  }

  async setRecurrenceGuidInput(recurrenceGuid) {
    await this.recurrenceGuidInput.sendKeys(recurrenceGuid);
  }

  async getRecurrenceGuidInput() {
    return this.recurrenceGuidInput.getAttribute('value');
  }

  async setPrepaymentAccountGuidInput(prepaymentAccountGuid) {
    await this.prepaymentAccountGuidInput.sendKeys(prepaymentAccountGuid);
  }

  async getPrepaymentAccountGuidInput() {
    return this.prepaymentAccountGuidInput.getAttribute('value');
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

  async parametersSelectLastOption() {
    await this.parametersSelect.all(by.tagName('option')).last().click();
  }

  async parametersSelectOption(option) {
    await this.parametersSelect.sendKeys(option);
  }

  getParametersSelect() {
    return this.parametersSelect;
  }

  async getParametersSelectedOption() {
    return this.parametersSelect.element(by.css('option:checked')).getText();
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

  async depreciationMethodSelectLastOption() {
    await this.depreciationMethodSelect.all(by.tagName('option')).last().click();
  }

  async depreciationMethodSelectOption(option) {
    await this.depreciationMethodSelect.sendKeys(option);
  }

  getDepreciationMethodSelect() {
    return this.depreciationMethodSelect;
  }

  async getDepreciationMethodSelectedOption() {
    return this.depreciationMethodSelect.element(by.css('option:checked')).getText();
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
    await this.setFirstAmortizationDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.amortizationFrequencySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setNumberOfRecurrencesInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setParticularsInput('particulars');
    await waitUntilDisplayed(this.saveButton);
    const selectedIsActive = await this.getIsActiveInput().isSelected();
    if (selectedIsActive) {
      await this.getIsActiveInput().click();
    } else {
      await this.getIsActiveInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedIsOverWritten = await this.getIsOverWrittenInput().isSelected();
    if (selectedIsOverWritten) {
      await this.getIsOverWrittenInput().click();
    } else {
      await this.getIsOverWrittenInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setTimeOfInstallationInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await waitUntilDisplayed(this.saveButton);
    await this.setRecurrenceGuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrepaymentAccountGuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    // this.placeholderSelectLastOption();
    // this.parametersSelectLastOption();
    // this.applicationParametersSelectLastOption();
    await this.depreciationMethodSelectLastOption();
    await this.prepaymentAccountSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
