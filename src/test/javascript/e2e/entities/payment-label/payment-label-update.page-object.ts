import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PaymentLabelUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentLabel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#payment-label-description'));
  commentsInput: ElementFinder = element(by.css('input#payment-label-comments'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#payment-label-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#payment-label-compilationToken'));
  remarksInput: ElementFinder = element(by.css('textarea#payment-label-remarks'));
  containingPaymentLabelSelect: ElementFinder = element(by.css('select#payment-label-containingPaymentLabel'));
  placeholderSelect: ElementFinder = element(by.css('select#payment-label-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return this.commentsInput.getAttribute('value');
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

  async containingPaymentLabelSelectLastOption() {
    await this.containingPaymentLabelSelect.all(by.tagName('option')).last().click();
  }

  async containingPaymentLabelSelectOption(option) {
    await this.containingPaymentLabelSelect.sendKeys(option);
  }

  getContainingPaymentLabelSelect() {
    return this.containingPaymentLabelSelect;
  }

  async getContainingPaymentLabelSelectedOption() {
    return this.containingPaymentLabelSelect.element(by.css('option:checked')).getText();
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
    await this.setCommentsInput('comments');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileUploadTokenInput('fileUploadToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompilationTokenInput('compilationToken');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    await this.containingPaymentLabelSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
