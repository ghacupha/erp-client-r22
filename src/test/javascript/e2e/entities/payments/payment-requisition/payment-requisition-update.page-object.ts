import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class PaymentRequisitionUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsPaymentRequisition.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  receptionDateInput: ElementFinder = element(by.css('input#payment-requisition-receptionDate'));
  dealerNameInput: ElementFinder = element(by.css('input#payment-requisition-dealerName'));
  briefDescriptionInput: ElementFinder = element(by.css('input#payment-requisition-briefDescription'));
  requisitionNumberInput: ElementFinder = element(by.css('input#payment-requisition-requisitionNumber'));
  invoicedAmountInput: ElementFinder = element(by.css('input#payment-requisition-invoicedAmount'));
  disbursementCostInput: ElementFinder = element(by.css('input#payment-requisition-disbursementCost'));
  taxableAmountInput: ElementFinder = element(by.css('input#payment-requisition-taxableAmount'));
  requisitionProcessedInput: ElementFinder = element(by.css('input#payment-requisition-requisitionProcessed'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#payment-requisition-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#payment-requisition-compilationToken'));
  paymentLabelSelect: ElementFinder = element(by.css('select#payment-requisition-paymentLabel'));
  placeholderSelect: ElementFinder = element(by.css('select#payment-requisition-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReceptionDateInput(receptionDate) {
    await this.receptionDateInput.sendKeys(receptionDate);
  }

  async getReceptionDateInput() {
    return this.receptionDateInput.getAttribute('value');
  }

  async setDealerNameInput(dealerName) {
    await this.dealerNameInput.sendKeys(dealerName);
  }

  async getDealerNameInput() {
    return this.dealerNameInput.getAttribute('value');
  }

  async setBriefDescriptionInput(briefDescription) {
    await this.briefDescriptionInput.sendKeys(briefDescription);
  }

  async getBriefDescriptionInput() {
    return this.briefDescriptionInput.getAttribute('value');
  }

  async setRequisitionNumberInput(requisitionNumber) {
    await this.requisitionNumberInput.sendKeys(requisitionNumber);
  }

  async getRequisitionNumberInput() {
    return this.requisitionNumberInput.getAttribute('value');
  }

  async setInvoicedAmountInput(invoicedAmount) {
    await this.invoicedAmountInput.sendKeys(invoicedAmount);
  }

  async getInvoicedAmountInput() {
    return this.invoicedAmountInput.getAttribute('value');
  }

  async setDisbursementCostInput(disbursementCost) {
    await this.disbursementCostInput.sendKeys(disbursementCost);
  }

  async getDisbursementCostInput() {
    return this.disbursementCostInput.getAttribute('value');
  }

  async setTaxableAmountInput(taxableAmount) {
    await this.taxableAmountInput.sendKeys(taxableAmount);
  }

  async getTaxableAmountInput() {
    return this.taxableAmountInput.getAttribute('value');
  }

  getRequisitionProcessedInput() {
    return this.requisitionProcessedInput;
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
    await this.setReceptionDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setDealerNameInput('dealerName');
    await waitUntilDisplayed(this.saveButton);
    await this.setBriefDescriptionInput('briefDescription');
    await waitUntilDisplayed(this.saveButton);
    await this.setRequisitionNumberInput('requisitionNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setInvoicedAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDisbursementCostInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setTaxableAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    const selectedRequisitionProcessed = await this.getRequisitionProcessedInput().isSelected();
    if (selectedRequisitionProcessed) {
      await this.getRequisitionProcessedInput().click();
    } else {
      await this.getRequisitionProcessedInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    // this.paymentLabelSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
