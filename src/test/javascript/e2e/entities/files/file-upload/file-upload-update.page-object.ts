import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class FileUploadUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.filesFileUpload.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#file-upload-description'));
  fileNameInput: ElementFinder = element(by.css('input#file-upload-fileName'));
  periodFromInput: ElementFinder = element(by.css('input#file-upload-periodFrom'));
  periodToInput: ElementFinder = element(by.css('input#file-upload-periodTo'));
  fileTypeIdInput: ElementFinder = element(by.css('input#file-upload-fileTypeId'));
  dataFileInput: ElementFinder = element(by.css('input#file-upload-dataFile'));
  uploadSuccessfulInput: ElementFinder = element(by.css('input#file-upload-uploadSuccessful'));
  uploadProcessedInput: ElementFinder = element(by.css('input#file-upload-uploadProcessed'));
  uploadTokenInput: ElementFinder = element(by.css('input#file-upload-uploadToken'));
  placeholderSelect: ElementFinder = element(by.css('select#file-upload-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setFileNameInput(fileName) {
    await this.fileNameInput.sendKeys(fileName);
  }

  async getFileNameInput() {
    return this.fileNameInput.getAttribute('value');
  }

  async setPeriodFromInput(periodFrom) {
    await this.periodFromInput.sendKeys(periodFrom);
  }

  async getPeriodFromInput() {
    return this.periodFromInput.getAttribute('value');
  }

  async setPeriodToInput(periodTo) {
    await this.periodToInput.sendKeys(periodTo);
  }

  async getPeriodToInput() {
    return this.periodToInput.getAttribute('value');
  }

  async setFileTypeIdInput(fileTypeId) {
    await this.fileTypeIdInput.sendKeys(fileTypeId);
  }

  async getFileTypeIdInput() {
    return this.fileTypeIdInput.getAttribute('value');
  }

  async setDataFileInput(dataFile) {
    await this.dataFileInput.sendKeys(dataFile);
  }

  async getDataFileInput() {
    return this.dataFileInput.getAttribute('value');
  }

  getUploadSuccessfulInput() {
    return this.uploadSuccessfulInput;
  }
  getUploadProcessedInput() {
    return this.uploadProcessedInput;
  }
  async setUploadTokenInput(uploadToken) {
    await this.uploadTokenInput.sendKeys(uploadToken);
  }

  async getUploadTokenInput() {
    return this.uploadTokenInput.getAttribute('value');
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
    await this.setFileNameInput('fileName');
    await waitUntilDisplayed(this.saveButton);
    await this.setPeriodFromInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setPeriodToInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileTypeIdInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDataFileInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    const selectedUploadSuccessful = await this.getUploadSuccessfulInput().isSelected();
    if (selectedUploadSuccessful) {
      await this.getUploadSuccessfulInput().click();
    } else {
      await this.getUploadSuccessfulInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedUploadProcessed = await this.getUploadProcessedInput().isSelected();
    if (selectedUploadProcessed) {
      await this.getUploadProcessedInput().click();
    } else {
      await this.getUploadProcessedInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setUploadTokenInput('uploadToken');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
