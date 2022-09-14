import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SystemContentTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.systemContentType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contentTypeNameInput: ElementFinder = element(by.css('input#system-content-type-contentTypeName'));
  contentTypeHeaderInput: ElementFinder = element(by.css('input#system-content-type-contentTypeHeader'));
  commentsInput: ElementFinder = element(by.css('textarea#system-content-type-comments'));
  availabilitySelect: ElementFinder = element(by.css('select#system-content-type-availability'));
  placeholdersSelect: ElementFinder = element(by.css('select#system-content-type-placeholders'));
  sysMapsSelect: ElementFinder = element(by.css('select#system-content-type-sysMaps'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setContentTypeNameInput(contentTypeName) {
    await this.contentTypeNameInput.sendKeys(contentTypeName);
  }

  async getContentTypeNameInput() {
    return this.contentTypeNameInput.getAttribute('value');
  }

  async setContentTypeHeaderInput(contentTypeHeader) {
    await this.contentTypeHeaderInput.sendKeys(contentTypeHeader);
  }

  async getContentTypeHeaderInput() {
    return this.contentTypeHeaderInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return this.commentsInput.getAttribute('value');
  }

  async setAvailabilitySelect(availability) {
    await this.availabilitySelect.sendKeys(availability);
  }

  async getAvailabilitySelect() {
    return this.availabilitySelect.element(by.css('option:checked')).getText();
  }

  async availabilitySelectLastOption() {
    await this.availabilitySelect.all(by.tagName('option')).last().click();
  }
  async placeholdersSelectLastOption() {
    await this.placeholdersSelect.all(by.tagName('option')).last().click();
  }

  async placeholdersSelectOption(option) {
    await this.placeholdersSelect.sendKeys(option);
  }

  getPlaceholdersSelect() {
    return this.placeholdersSelect;
  }

  async getPlaceholdersSelectedOption() {
    return this.placeholdersSelect.element(by.css('option:checked')).getText();
  }

  async sysMapsSelectLastOption() {
    await this.sysMapsSelect.all(by.tagName('option')).last().click();
  }

  async sysMapsSelectOption(option) {
    await this.sysMapsSelect.sendKeys(option);
  }

  getSysMapsSelect() {
    return this.sysMapsSelect;
  }

  async getSysMapsSelectedOption() {
    return this.sysMapsSelect.element(by.css('option:checked')).getText();
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
    await this.setContentTypeNameInput('contentTypeName');
    await waitUntilDisplayed(this.saveButton);
    await this.setContentTypeHeaderInput('contentTypeHeader');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentsInput('comments');
    await waitUntilDisplayed(this.saveButton);
    await this.availabilitySelectLastOption();
    // this.placeholdersSelectLastOption();
    // this.sysMapsSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
