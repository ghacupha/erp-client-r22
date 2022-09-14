import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class JobSheetUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.jobSheet.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  serialNumberInput: ElementFinder = element(by.css('input#job-sheet-serialNumber'));
  jobSheetDateInput: ElementFinder = element(by.css('input#job-sheet-jobSheetDate'));
  detailsInput: ElementFinder = element(by.css('input#job-sheet-details'));
  remarksInput: ElementFinder = element(by.css('textarea#job-sheet-remarks'));
  billerSelect: ElementFinder = element(by.css('select#job-sheet-biller'));
  signatoriesSelect: ElementFinder = element(by.css('select#job-sheet-signatories'));
  contactPersonSelect: ElementFinder = element(by.css('select#job-sheet-contactPerson'));
  businessStampsSelect: ElementFinder = element(by.css('select#job-sheet-businessStamps'));
  placeholderSelect: ElementFinder = element(by.css('select#job-sheet-placeholder'));
  paymentLabelSelect: ElementFinder = element(by.css('select#job-sheet-paymentLabel'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSerialNumberInput(serialNumber) {
    await this.serialNumberInput.sendKeys(serialNumber);
  }

  async getSerialNumberInput() {
    return this.serialNumberInput.getAttribute('value');
  }

  async setJobSheetDateInput(jobSheetDate) {
    await this.jobSheetDateInput.sendKeys(jobSheetDate);
  }

  async getJobSheetDateInput() {
    return this.jobSheetDateInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return this.detailsInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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

  async contactPersonSelectLastOption() {
    await this.contactPersonSelect.all(by.tagName('option')).last().click();
  }

  async contactPersonSelectOption(option) {
    await this.contactPersonSelect.sendKeys(option);
  }

  getContactPersonSelect() {
    return this.contactPersonSelect;
  }

  async getContactPersonSelectedOption() {
    return this.contactPersonSelect.element(by.css('option:checked')).getText();
  }

  async businessStampsSelectLastOption() {
    await this.businessStampsSelect.all(by.tagName('option')).last().click();
  }

  async businessStampsSelectOption(option) {
    await this.businessStampsSelect.sendKeys(option);
  }

  getBusinessStampsSelect() {
    return this.businessStampsSelect;
  }

  async getBusinessStampsSelectedOption() {
    return this.businessStampsSelect.element(by.css('option:checked')).getText();
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
    await this.setSerialNumberInput('serialNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setJobSheetDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setDetailsInput('details');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    await this.billerSelectLastOption();
    // this.signatoriesSelectLastOption();
    await this.contactPersonSelectLastOption();
    // this.businessStampsSelectLastOption();
    // this.placeholderSelectLastOption();
    // this.paymentLabelSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
