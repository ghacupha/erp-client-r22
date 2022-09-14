import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ServiceOutletUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.serviceOutlet.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  outletCodeInput: ElementFinder = element(by.css('input#service-outlet-outletCode'));
  outletNameInput: ElementFinder = element(by.css('input#service-outlet-outletName'));
  townInput: ElementFinder = element(by.css('input#service-outlet-town'));
  parliamentaryConstituencyInput: ElementFinder = element(by.css('input#service-outlet-parliamentaryConstituency'));
  gpsCoordinatesInput: ElementFinder = element(by.css('input#service-outlet-gpsCoordinates'));
  outletOpeningDateInput: ElementFinder = element(by.css('input#service-outlet-outletOpeningDate'));
  regulatorApprovalDateInput: ElementFinder = element(by.css('input#service-outlet-regulatorApprovalDate'));
  outletClosureDateInput: ElementFinder = element(by.css('input#service-outlet-outletClosureDate'));
  dateLastModifiedInput: ElementFinder = element(by.css('input#service-outlet-dateLastModified'));
  licenseFeePayableInput: ElementFinder = element(by.css('input#service-outlet-licenseFeePayable'));
  placeholderSelect: ElementFinder = element(by.css('select#service-outlet-placeholder'));
  bankCodeSelect: ElementFinder = element(by.css('select#service-outlet-bankCode'));
  outletTypeSelect: ElementFinder = element(by.css('select#service-outlet-outletType'));
  outletStatusSelect: ElementFinder = element(by.css('select#service-outlet-outletStatus'));
  countyNameSelect: ElementFinder = element(by.css('select#service-outlet-countyName'));
  subCountyNameSelect: ElementFinder = element(by.css('select#service-outlet-subCountyName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setOutletCodeInput(outletCode) {
    await this.outletCodeInput.sendKeys(outletCode);
  }

  async getOutletCodeInput() {
    return this.outletCodeInput.getAttribute('value');
  }

  async setOutletNameInput(outletName) {
    await this.outletNameInput.sendKeys(outletName);
  }

  async getOutletNameInput() {
    return this.outletNameInput.getAttribute('value');
  }

  async setTownInput(town) {
    await this.townInput.sendKeys(town);
  }

  async getTownInput() {
    return this.townInput.getAttribute('value');
  }

  async setParliamentaryConstituencyInput(parliamentaryConstituency) {
    await this.parliamentaryConstituencyInput.sendKeys(parliamentaryConstituency);
  }

  async getParliamentaryConstituencyInput() {
    return this.parliamentaryConstituencyInput.getAttribute('value');
  }

  async setGpsCoordinatesInput(gpsCoordinates) {
    await this.gpsCoordinatesInput.sendKeys(gpsCoordinates);
  }

  async getGpsCoordinatesInput() {
    return this.gpsCoordinatesInput.getAttribute('value');
  }

  async setOutletOpeningDateInput(outletOpeningDate) {
    await this.outletOpeningDateInput.sendKeys(outletOpeningDate);
  }

  async getOutletOpeningDateInput() {
    return this.outletOpeningDateInput.getAttribute('value');
  }

  async setRegulatorApprovalDateInput(regulatorApprovalDate) {
    await this.regulatorApprovalDateInput.sendKeys(regulatorApprovalDate);
  }

  async getRegulatorApprovalDateInput() {
    return this.regulatorApprovalDateInput.getAttribute('value');
  }

  async setOutletClosureDateInput(outletClosureDate) {
    await this.outletClosureDateInput.sendKeys(outletClosureDate);
  }

  async getOutletClosureDateInput() {
    return this.outletClosureDateInput.getAttribute('value');
  }

  async setDateLastModifiedInput(dateLastModified) {
    await this.dateLastModifiedInput.sendKeys(dateLastModified);
  }

  async getDateLastModifiedInput() {
    return this.dateLastModifiedInput.getAttribute('value');
  }

  async setLicenseFeePayableInput(licenseFeePayable) {
    await this.licenseFeePayableInput.sendKeys(licenseFeePayable);
  }

  async getLicenseFeePayableInput() {
    return this.licenseFeePayableInput.getAttribute('value');
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

  async bankCodeSelectLastOption() {
    await this.bankCodeSelect.all(by.tagName('option')).last().click();
  }

  async bankCodeSelectOption(option) {
    await this.bankCodeSelect.sendKeys(option);
  }

  getBankCodeSelect() {
    return this.bankCodeSelect;
  }

  async getBankCodeSelectedOption() {
    return this.bankCodeSelect.element(by.css('option:checked')).getText();
  }

  async outletTypeSelectLastOption() {
    await this.outletTypeSelect.all(by.tagName('option')).last().click();
  }

  async outletTypeSelectOption(option) {
    await this.outletTypeSelect.sendKeys(option);
  }

  getOutletTypeSelect() {
    return this.outletTypeSelect;
  }

  async getOutletTypeSelectedOption() {
    return this.outletTypeSelect.element(by.css('option:checked')).getText();
  }

  async outletStatusSelectLastOption() {
    await this.outletStatusSelect.all(by.tagName('option')).last().click();
  }

  async outletStatusSelectOption(option) {
    await this.outletStatusSelect.sendKeys(option);
  }

  getOutletStatusSelect() {
    return this.outletStatusSelect;
  }

  async getOutletStatusSelectedOption() {
    return this.outletStatusSelect.element(by.css('option:checked')).getText();
  }

  async countyNameSelectLastOption() {
    await this.countyNameSelect.all(by.tagName('option')).last().click();
  }

  async countyNameSelectOption(option) {
    await this.countyNameSelect.sendKeys(option);
  }

  getCountyNameSelect() {
    return this.countyNameSelect;
  }

  async getCountyNameSelectedOption() {
    return this.countyNameSelect.element(by.css('option:checked')).getText();
  }

  async subCountyNameSelectLastOption() {
    await this.subCountyNameSelect.all(by.tagName('option')).last().click();
  }

  async subCountyNameSelectOption(option) {
    await this.subCountyNameSelect.sendKeys(option);
  }

  getSubCountyNameSelect() {
    return this.subCountyNameSelect;
  }

  async getSubCountyNameSelectedOption() {
    return this.subCountyNameSelect.element(by.css('option:checked')).getText();
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
    await this.setOutletCodeInput('outletCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setOutletNameInput('outletName');
    await waitUntilDisplayed(this.saveButton);
    await this.setTownInput('town');
    await waitUntilDisplayed(this.saveButton);
    await this.setParliamentaryConstituencyInput('parliamentaryConstituency');
    await waitUntilDisplayed(this.saveButton);
    await this.setGpsCoordinatesInput('gpsCoordinates');
    await waitUntilDisplayed(this.saveButton);
    await this.setOutletOpeningDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setRegulatorApprovalDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setOutletClosureDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateLastModifiedInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setLicenseFeePayableInput('5');
    // this.placeholderSelectLastOption();
    await this.bankCodeSelectLastOption();
    await this.outletTypeSelectLastOption();
    await this.outletStatusSelectLastOption();
    await this.countyNameSelectLastOption();
    await this.subCountyNameSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
