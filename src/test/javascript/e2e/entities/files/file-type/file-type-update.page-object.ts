import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class FileTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.filesFileType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fileTypeNameInput: ElementFinder = element(by.css('input#file-type-fileTypeName'));
  fileMediumTypeSelect: ElementFinder = element(by.css('select#file-type-fileMediumType'));
  descriptionInput: ElementFinder = element(by.css('input#file-type-description'));
  fileTemplateInput: ElementFinder = element(by.css('input#file-type-fileTemplate'));
  fileTypeSelect: ElementFinder = element(by.css('select#file-type-fileType'));
  placeholderSelect: ElementFinder = element(by.css('select#file-type-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFileTypeNameInput(fileTypeName) {
    await this.fileTypeNameInput.sendKeys(fileTypeName);
  }

  async getFileTypeNameInput() {
    return this.fileTypeNameInput.getAttribute('value');
  }

  async setFileMediumTypeSelect(fileMediumType) {
    await this.fileMediumTypeSelect.sendKeys(fileMediumType);
  }

  async getFileMediumTypeSelect() {
    return this.fileMediumTypeSelect.element(by.css('option:checked')).getText();
  }

  async fileMediumTypeSelectLastOption() {
    await this.fileMediumTypeSelect.all(by.tagName('option')).last().click();
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setFileTemplateInput(fileTemplate) {
    await this.fileTemplateInput.sendKeys(fileTemplate);
  }

  async getFileTemplateInput() {
    return this.fileTemplateInput.getAttribute('value');
  }

  async setFileTypeSelect(fileType) {
    await this.fileTypeSelect.sendKeys(fileType);
  }

  async getFileTypeSelect() {
    return this.fileTypeSelect.element(by.css('option:checked')).getText();
  }

  async fileTypeSelectLastOption() {
    await this.fileTypeSelect.all(by.tagName('option')).last().click();
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
    await this.setFileTypeNameInput('fileTypeName');
    await waitUntilDisplayed(this.saveButton);
    await this.fileMediumTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileTemplateInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.fileTypeSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
