import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class WorkProjectRegisterUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.workProjectRegister.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  catalogueNumberInput: ElementFinder = element(by.css('input#work-project-register-catalogueNumber'));
  descriptionInput: ElementFinder = element(by.css('input#work-project-register-description'));
  detailsInput: ElementFinder = element(by.css('input#work-project-register-details'));
  totalProjectCostInput: ElementFinder = element(by.css('input#work-project-register-totalProjectCost'));
  additionalNotesInput: ElementFinder = element(by.css('input#work-project-register-additionalNotes'));
  dealersSelect: ElementFinder = element(by.css('select#work-project-register-dealers'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#work-project-register-settlementCurrency'));
  placeholderSelect: ElementFinder = element(by.css('select#work-project-register-placeholder'));

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

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return this.detailsInput.getAttribute('value');
  }

  async setTotalProjectCostInput(totalProjectCost) {
    await this.totalProjectCostInput.sendKeys(totalProjectCost);
  }

  async getTotalProjectCostInput() {
    return this.totalProjectCostInput.getAttribute('value');
  }

  async setAdditionalNotesInput(additionalNotes) {
    await this.additionalNotesInput.sendKeys(additionalNotes);
  }

  async getAdditionalNotesInput() {
    return this.additionalNotesInput.getAttribute('value');
  }

  async dealersSelectLastOption() {
    await this.dealersSelect.all(by.tagName('option')).last().click();
  }

  async dealersSelectOption(option) {
    await this.dealersSelect.sendKeys(option);
  }

  getDealersSelect() {
    return this.dealersSelect;
  }

  async getDealersSelectedOption() {
    return this.dealersSelect.element(by.css('option:checked')).getText();
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
    await this.setDetailsInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setTotalProjectCostInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setAdditionalNotesInput(absolutePath);
    // this.dealersSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
