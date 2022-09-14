import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ReportTemplateUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.reportTemplate.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  catalogueNumberInput: ElementFinder = element(by.css('input#report-template-catalogueNumber'));
  descriptionInput: ElementFinder = element(by.css('textarea#report-template-description'));
  notesInput: ElementFinder = element(by.css('input#report-template-notes'));
  reportFileInput: ElementFinder = element(by.css('input#report-template-reportFile'));
  compileReportFileInput: ElementFinder = element(by.css('input#report-template-compileReportFile'));
  placeholderSelect: ElementFinder = element(by.css('select#report-template-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCatalogueNumberInput(catalogueNumber) {
    await this.catalogueNumberInput.sendKeys(catalogueNumber);
  }

  async getCatalogueNumberInput() {
    return this.catalogueNumberInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async setReportFileInput(reportFile) {
    await this.reportFileInput.sendKeys(reportFile);
  }

  async getReportFileInput() {
    return this.reportFileInput.getAttribute('value');
  }

  async setCompileReportFileInput(compileReportFile) {
    await this.compileReportFileInput.sendKeys(compileReportFile);
  }

  async getCompileReportFileInput() {
    return this.compileReportFileInput.getAttribute('value');
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
    await this.setCatalogueNumberInput('catalogueNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setReportFileInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setCompileReportFileInput(absolutePath);
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
