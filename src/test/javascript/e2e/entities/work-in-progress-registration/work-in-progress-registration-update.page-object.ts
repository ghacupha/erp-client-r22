import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class WorkInProgressRegistrationUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.workInProgressRegistration.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  sequenceNumberInput: ElementFinder = element(by.css('input#work-in-progress-registration-sequenceNumber'));
  particularsInput: ElementFinder = element(by.css('input#work-in-progress-registration-particulars'));
  instalmentAmountInput: ElementFinder = element(by.css('input#work-in-progress-registration-instalmentAmount'));
  commentsInput: ElementFinder = element(by.css('input#work-in-progress-registration-comments'));
  placeholderSelect: ElementFinder = element(by.css('select#work-in-progress-registration-placeholder'));
  paymentInvoicesSelect: ElementFinder = element(by.css('select#work-in-progress-registration-paymentInvoices'));
  serviceOutletSelect: ElementFinder = element(by.css('select#work-in-progress-registration-serviceOutlet'));
  settlementSelect: ElementFinder = element(by.css('select#work-in-progress-registration-settlement'));
  purchaseOrderSelect: ElementFinder = element(by.css('select#work-in-progress-registration-purchaseOrder'));
  deliveryNoteSelect: ElementFinder = element(by.css('select#work-in-progress-registration-deliveryNote'));
  jobSheetSelect: ElementFinder = element(by.css('select#work-in-progress-registration-jobSheet'));
  dealerSelect: ElementFinder = element(by.css('select#work-in-progress-registration-dealer'));
  workInProgressGroupSelect: ElementFinder = element(by.css('select#work-in-progress-registration-workInProgressGroup'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#work-in-progress-registration-settlementCurrency'));
  workProjectRegisterSelect: ElementFinder = element(by.css('select#work-in-progress-registration-workProjectRegister'));

  getPageTitle() {
    return this.pageTitle;
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

  async setInstalmentAmountInput(instalmentAmount) {
    await this.instalmentAmountInput.sendKeys(instalmentAmount);
  }

  async getInstalmentAmountInput() {
    return this.instalmentAmountInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return this.commentsInput.getAttribute('value');
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

  async paymentInvoicesSelectLastOption() {
    await this.paymentInvoicesSelect.all(by.tagName('option')).last().click();
  }

  async paymentInvoicesSelectOption(option) {
    await this.paymentInvoicesSelect.sendKeys(option);
  }

  getPaymentInvoicesSelect() {
    return this.paymentInvoicesSelect;
  }

  async getPaymentInvoicesSelectedOption() {
    return this.paymentInvoicesSelect.element(by.css('option:checked')).getText();
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

  async settlementSelectLastOption() {
    await this.settlementSelect.all(by.tagName('option')).last().click();
  }

  async settlementSelectOption(option) {
    await this.settlementSelect.sendKeys(option);
  }

  getSettlementSelect() {
    return this.settlementSelect;
  }

  async getSettlementSelectedOption() {
    return this.settlementSelect.element(by.css('option:checked')).getText();
  }

  async purchaseOrderSelectLastOption() {
    await this.purchaseOrderSelect.all(by.tagName('option')).last().click();
  }

  async purchaseOrderSelectOption(option) {
    await this.purchaseOrderSelect.sendKeys(option);
  }

  getPurchaseOrderSelect() {
    return this.purchaseOrderSelect;
  }

  async getPurchaseOrderSelectedOption() {
    return this.purchaseOrderSelect.element(by.css('option:checked')).getText();
  }

  async deliveryNoteSelectLastOption() {
    await this.deliveryNoteSelect.all(by.tagName('option')).last().click();
  }

  async deliveryNoteSelectOption(option) {
    await this.deliveryNoteSelect.sendKeys(option);
  }

  getDeliveryNoteSelect() {
    return this.deliveryNoteSelect;
  }

  async getDeliveryNoteSelectedOption() {
    return this.deliveryNoteSelect.element(by.css('option:checked')).getText();
  }

  async jobSheetSelectLastOption() {
    await this.jobSheetSelect.all(by.tagName('option')).last().click();
  }

  async jobSheetSelectOption(option) {
    await this.jobSheetSelect.sendKeys(option);
  }

  getJobSheetSelect() {
    return this.jobSheetSelect;
  }

  async getJobSheetSelectedOption() {
    return this.jobSheetSelect.element(by.css('option:checked')).getText();
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

  async workInProgressGroupSelectLastOption() {
    await this.workInProgressGroupSelect.all(by.tagName('option')).last().click();
  }

  async workInProgressGroupSelectOption(option) {
    await this.workInProgressGroupSelect.sendKeys(option);
  }

  getWorkInProgressGroupSelect() {
    return this.workInProgressGroupSelect;
  }

  async getWorkInProgressGroupSelectedOption() {
    return this.workInProgressGroupSelect.element(by.css('option:checked')).getText();
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

  async workProjectRegisterSelectLastOption() {
    await this.workProjectRegisterSelect.all(by.tagName('option')).last().click();
  }

  async workProjectRegisterSelectOption(option) {
    await this.workProjectRegisterSelect.sendKeys(option);
  }

  getWorkProjectRegisterSelect() {
    return this.workProjectRegisterSelect;
  }

  async getWorkProjectRegisterSelectedOption() {
    return this.workProjectRegisterSelect.element(by.css('option:checked')).getText();
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
    await this.setSequenceNumberInput('sequenceNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setParticularsInput('particulars');
    await waitUntilDisplayed(this.saveButton);
    await this.setInstalmentAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentsInput(absolutePath);
    // this.placeholderSelectLastOption();
    // this.paymentInvoicesSelectLastOption();
    // this.serviceOutletSelectLastOption();
    // this.settlementSelectLastOption();
    // this.purchaseOrderSelectLastOption();
    // this.deliveryNoteSelectLastOption();
    // this.jobSheetSelectLastOption();
    await this.dealerSelectLastOption();
    await this.workInProgressGroupSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    await this.workProjectRegisterSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
