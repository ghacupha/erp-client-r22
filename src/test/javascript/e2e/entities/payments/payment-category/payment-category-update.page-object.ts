import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class PaymentCategoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.paymentsPaymentCategory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  categoryNameInput: ElementFinder = element(by.css('input#payment-category-categoryName'));
  categoryDescriptionInput: ElementFinder = element(by.css('input#payment-category-categoryDescription'));
  categoryTypeSelect: ElementFinder = element(by.css('select#payment-category-categoryType'));
  fileUploadTokenInput: ElementFinder = element(by.css('input#payment-category-fileUploadToken'));
  compilationTokenInput: ElementFinder = element(by.css('input#payment-category-compilationToken'));
  paymentLabelSelect: ElementFinder = element(by.css('select#payment-category-paymentLabel'));
  placeholderSelect: ElementFinder = element(by.css('select#payment-category-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCategoryNameInput(categoryName) {
    await this.categoryNameInput.sendKeys(categoryName);
  }

  async getCategoryNameInput() {
    return this.categoryNameInput.getAttribute('value');
  }

  async setCategoryDescriptionInput(categoryDescription) {
    await this.categoryDescriptionInput.sendKeys(categoryDescription);
  }

  async getCategoryDescriptionInput() {
    return this.categoryDescriptionInput.getAttribute('value');
  }

  async setCategoryTypeSelect(categoryType) {
    await this.categoryTypeSelect.sendKeys(categoryType);
  }

  async getCategoryTypeSelect() {
    return this.categoryTypeSelect.element(by.css('option:checked')).getText();
  }

  async categoryTypeSelectLastOption() {
    await this.categoryTypeSelect.all(by.tagName('option')).last().click();
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
    await this.setCategoryNameInput('categoryName');
    await waitUntilDisplayed(this.saveButton);
    await this.setCategoryDescriptionInput('categoryDescription');
    await waitUntilDisplayed(this.saveButton);
    await this.categoryTypeSelectLastOption();
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
