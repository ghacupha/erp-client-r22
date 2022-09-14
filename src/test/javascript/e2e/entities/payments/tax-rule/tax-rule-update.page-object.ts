import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class TaxRuleUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsTaxRule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  telcoExciseDutyInput: ElementFinder = element(by.css('input#tax-rule-telcoExciseDuty'));
  valueAddedTaxInput: ElementFinder = element(by.css('input#tax-rule-valueAddedTax'));
  withholdingVATInput: ElementFinder = element(by.css('input#tax-rule-withholdingVAT'));
  withholdingTaxConsultancyInput: ElementFinder = element(by.css('input#tax-rule-withholdingTaxConsultancy'));
  withholdingTaxRentInput: ElementFinder = element(by.css('input#tax-rule-withholdingTaxRent'));
  cateringLevyInput: ElementFinder = element(by.css('input#tax-rule-cateringLevy'));
  serviceChargeInput: ElementFinder = element(by.css('input#tax-rule-serviceCharge'));
  withholdingTaxImportedServiceInput: ElementFinder = element(by.css('input#tax-rule-withholdingTaxImportedService'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#tax-rule-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#tax-rule-compilationToken'));
  placeholderSelect: ElementFinder = element(by.css('select#tax-rule-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTelcoExciseDutyInput(telcoExciseDuty) {
    await this.telcoExciseDutyInput.sendKeys(telcoExciseDuty);
  }

  async getTelcoExciseDutyInput() {
    return this.telcoExciseDutyInput.getAttribute('value');
  }

  async setValueAddedTaxInput(valueAddedTax) {
    await this.valueAddedTaxInput.sendKeys(valueAddedTax);
  }

  async getValueAddedTaxInput() {
    return this.valueAddedTaxInput.getAttribute('value');
  }

  async setWithholdingVATInput(withholdingVAT) {
    await this.withholdingVATInput.sendKeys(withholdingVAT);
  }

  async getWithholdingVATInput() {
    return this.withholdingVATInput.getAttribute('value');
  }

  async setWithholdingTaxConsultancyInput(withholdingTaxConsultancy) {
    await this.withholdingTaxConsultancyInput.sendKeys(withholdingTaxConsultancy);
  }

  async getWithholdingTaxConsultancyInput() {
    return this.withholdingTaxConsultancyInput.getAttribute('value');
  }

  async setWithholdingTaxRentInput(withholdingTaxRent) {
    await this.withholdingTaxRentInput.sendKeys(withholdingTaxRent);
  }

  async getWithholdingTaxRentInput() {
    return this.withholdingTaxRentInput.getAttribute('value');
  }

  async setCateringLevyInput(cateringLevy) {
    await this.cateringLevyInput.sendKeys(cateringLevy);
  }

  async getCateringLevyInput() {
    return this.cateringLevyInput.getAttribute('value');
  }

  async setServiceChargeInput(serviceCharge) {
    await this.serviceChargeInput.sendKeys(serviceCharge);
  }

  async getServiceChargeInput() {
    return this.serviceChargeInput.getAttribute('value');
  }

  async setWithholdingTaxImportedServiceInput(withholdingTaxImportedService) {
    await this.withholdingTaxImportedServiceInput.sendKeys(withholdingTaxImportedService);
  }

  async getWithholdingTaxImportedServiceInput() {
    return this.withholdingTaxImportedServiceInput.getAttribute('value');
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
    await this.setTelcoExciseDutyInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setValueAddedTaxInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setWithholdingVATInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setWithholdingTaxConsultancyInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setWithholdingTaxRentInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCateringLevyInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setServiceChargeInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setWithholdingTaxImportedServiceInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
