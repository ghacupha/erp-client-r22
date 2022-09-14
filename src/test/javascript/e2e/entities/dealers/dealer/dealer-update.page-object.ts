import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class DealerUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.dealersDealer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dealerNameInput: ElementFinder = element(by.css('input#dealer-dealerName'));
  taxNumberInput: ElementFinder = element(by.css('input#dealer-taxNumber'));
  identificationDocumentNumberInput: ElementFinder = element(by.css('input#dealer-identificationDocumentNumber'));
  organizationNameInput: ElementFinder = element(by.css('input#dealer-organizationName'));
  departmentInput: ElementFinder = element(by.css('input#dealer-department'));
  positionInput: ElementFinder = element(by.css('input#dealer-position'));
  postalAddressInput: ElementFinder = element(by.css('input#dealer-postalAddress'));
  physicalAddressInput: ElementFinder = element(by.css('input#dealer-physicalAddress'));
  accountNameInput: ElementFinder = element(by.css('input#dealer-accountName'));
  accountNumberInput: ElementFinder = element(by.css('input#dealer-accountNumber'));
  bankersNameInput: ElementFinder = element(by.css('input#dealer-bankersName'));
  bankersBranchInput: ElementFinder = element(by.css('input#dealer-bankersBranch'));
  bankersSwiftCodeInput: ElementFinder = element(by.css('input#dealer-bankersSwiftCode'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#dealer-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#dealer-compilationToken'));
  remarksInput: ElementFinder = element(by.css('textarea#dealer-remarks'));
  otherNamesInput: ElementFinder = element(by.css('input#dealer-otherNames'));
  paymentLabelSelect: ElementFinder = element(by.css('select#dealer-paymentLabel'));
  dealerGroupSelect: ElementFinder = element(by.css('select#dealer-dealerGroup'));
  placeholderSelect: ElementFinder = element(by.css('select#dealer-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDealerNameInput(dealerName) {
    await this.dealerNameInput.sendKeys(dealerName);
  }

  async getDealerNameInput() {
    return this.dealerNameInput.getAttribute('value');
  }

  async setTaxNumberInput(taxNumber) {
    await this.taxNumberInput.sendKeys(taxNumber);
  }

  async getTaxNumberInput() {
    return this.taxNumberInput.getAttribute('value');
  }

  async setIdentificationDocumentNumberInput(identificationDocumentNumber) {
    await this.identificationDocumentNumberInput.sendKeys(identificationDocumentNumber);
  }

  async getIdentificationDocumentNumberInput() {
    return this.identificationDocumentNumberInput.getAttribute('value');
  }

  async setOrganizationNameInput(organizationName) {
    await this.organizationNameInput.sendKeys(organizationName);
  }

  async getOrganizationNameInput() {
    return this.organizationNameInput.getAttribute('value');
  }

  async setDepartmentInput(department) {
    await this.departmentInput.sendKeys(department);
  }

  async getDepartmentInput() {
    return this.departmentInput.getAttribute('value');
  }

  async setPositionInput(position) {
    await this.positionInput.sendKeys(position);
  }

  async getPositionInput() {
    return this.positionInput.getAttribute('value');
  }

  async setPostalAddressInput(postalAddress) {
    await this.postalAddressInput.sendKeys(postalAddress);
  }

  async getPostalAddressInput() {
    return this.postalAddressInput.getAttribute('value');
  }

  async setPhysicalAddressInput(physicalAddress) {
    await this.physicalAddressInput.sendKeys(physicalAddress);
  }

  async getPhysicalAddressInput() {
    return this.physicalAddressInput.getAttribute('value');
  }

  async setAccountNameInput(accountName) {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput() {
    return this.accountNameInput.getAttribute('value');
  }

  async setAccountNumberInput(accountNumber) {
    await this.accountNumberInput.sendKeys(accountNumber);
  }

  async getAccountNumberInput() {
    return this.accountNumberInput.getAttribute('value');
  }

  async setBankersNameInput(bankersName) {
    await this.bankersNameInput.sendKeys(bankersName);
  }

  async getBankersNameInput() {
    return this.bankersNameInput.getAttribute('value');
  }

  async setBankersBranchInput(bankersBranch) {
    await this.bankersBranchInput.sendKeys(bankersBranch);
  }

  async getBankersBranchInput() {
    return this.bankersBranchInput.getAttribute('value');
  }

  async setBankersSwiftCodeInput(bankersSwiftCode) {
    await this.bankersSwiftCodeInput.sendKeys(bankersSwiftCode);
  }

  async getBankersSwiftCodeInput() {
    return this.bankersSwiftCodeInput.getAttribute('value');
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

  async setOtherNamesInput(otherNames) {
    await this.otherNamesInput.sendKeys(otherNames);
  }

  async getOtherNamesInput() {
    return this.otherNamesInput.getAttribute('value');
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

  async dealerGroupSelectLastOption() {
    await this.dealerGroupSelect.all(by.tagName('option')).last().click();
  }

  async dealerGroupSelectOption(option) {
    await this.dealerGroupSelect.sendKeys(option);
  }

  getDealerGroupSelect() {
    return this.dealerGroupSelect;
  }

  async getDealerGroupSelectedOption() {
    return this.dealerGroupSelect.element(by.css('option:checked')).getText();
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
    await this.setDealerNameInput('dealerName');
    await waitUntilDisplayed(this.saveButton);
    await this.setTaxNumberInput('taxNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setIdentificationDocumentNumberInput('identificationDocumentNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setOrganizationNameInput('organizationName');
    await waitUntilDisplayed(this.saveButton);
    await this.setDepartmentInput('department');
    await waitUntilDisplayed(this.saveButton);
    await this.setPositionInput('position');
    await waitUntilDisplayed(this.saveButton);
    await this.setPostalAddressInput('postalAddress');
    await waitUntilDisplayed(this.saveButton);
    await this.setPhysicalAddressInput('physicalAddress');
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNameInput('accountName');
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNumberInput('accountNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setBankersNameInput('bankersName');
    await waitUntilDisplayed(this.saveButton);
    await this.setBankersBranchInput('bankersBranch');
    await waitUntilDisplayed(this.saveButton);
    await this.setBankersSwiftCodeInput('bankersSwiftCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    await waitUntilDisplayed(this.saveButton);
    await this.setOtherNamesInput('otherNames');
    // this.paymentLabelSelectLastOption();
    await this.dealerGroupSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
