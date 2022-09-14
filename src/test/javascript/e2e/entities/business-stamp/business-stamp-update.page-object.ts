import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BusinessStampUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.businessStamp.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  stampDateInput: ElementFinder = element(by.css('input#business-stamp-stampDate'));
  purposeInput: ElementFinder = element(by.css('input#business-stamp-purpose'));
  detailsInput: ElementFinder = element(by.css('input#business-stamp-details'));
  remarksInput: ElementFinder = element(by.css('textarea#business-stamp-remarks'));
  stampHolderSelect: ElementFinder = element(by.css('select#business-stamp-stampHolder'));
  placeholderSelect: ElementFinder = element(by.css('select#business-stamp-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStampDateInput(stampDate) {
    await this.stampDateInput.sendKeys(stampDate);
  }

  async getStampDateInput() {
    return this.stampDateInput.getAttribute('value');
  }

  async setPurposeInput(purpose) {
    await this.purposeInput.sendKeys(purpose);
  }

  async getPurposeInput() {
    return this.purposeInput.getAttribute('value');
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

  async stampHolderSelectLastOption() {
    await this.stampHolderSelect.all(by.tagName('option')).last().click();
  }

  async stampHolderSelectOption(option) {
    await this.stampHolderSelect.sendKeys(option);
  }

  getStampHolderSelect() {
    return this.stampHolderSelect;
  }

  async getStampHolderSelectedOption() {
    return this.stampHolderSelect.element(by.css('option:checked')).getText();
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
    await this.setStampDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setPurposeInput('purpose');
    await waitUntilDisplayed(this.saveButton);
    await this.setDetailsInput('details');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    await this.stampHolderSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
