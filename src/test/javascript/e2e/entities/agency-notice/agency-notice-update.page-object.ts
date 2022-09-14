import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class AgencyNoticeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.agencyNotice.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  referenceNumberInput: ElementFinder = element(by.css('input#agency-notice-referenceNumber'));
  referenceDateInput: ElementFinder = element(by.css('input#agency-notice-referenceDate'));
  assessmentAmountInput: ElementFinder = element(by.css('input#agency-notice-assessmentAmount'));
  agencyStatusSelect: ElementFinder = element(by.css('select#agency-notice-agencyStatus'));
  assessmentNoticeInput: ElementFinder = element(by.css('input#agency-notice-assessmentNotice'));
  correspondentsSelect: ElementFinder = element(by.css('select#agency-notice-correspondents'));
  settlementCurrencySelect: ElementFinder = element(by.css('select#agency-notice-settlementCurrency'));
  assessorSelect: ElementFinder = element(by.css('select#agency-notice-assessor'));
  placeholderSelect: ElementFinder = element(by.css('select#agency-notice-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReferenceNumberInput(referenceNumber) {
    await this.referenceNumberInput.sendKeys(referenceNumber);
  }

  async getReferenceNumberInput() {
    return this.referenceNumberInput.getAttribute('value');
  }

  async setReferenceDateInput(referenceDate) {
    await this.referenceDateInput.sendKeys(referenceDate);
  }

  async getReferenceDateInput() {
    return this.referenceDateInput.getAttribute('value');
  }

  async setAssessmentAmountInput(assessmentAmount) {
    await this.assessmentAmountInput.sendKeys(assessmentAmount);
  }

  async getAssessmentAmountInput() {
    return this.assessmentAmountInput.getAttribute('value');
  }

  async setAgencyStatusSelect(agencyStatus) {
    await this.agencyStatusSelect.sendKeys(agencyStatus);
  }

  async getAgencyStatusSelect() {
    return this.agencyStatusSelect.element(by.css('option:checked')).getText();
  }

  async agencyStatusSelectLastOption() {
    await this.agencyStatusSelect.all(by.tagName('option')).last().click();
  }
  async setAssessmentNoticeInput(assessmentNotice) {
    await this.assessmentNoticeInput.sendKeys(assessmentNotice);
  }

  async getAssessmentNoticeInput() {
    return this.assessmentNoticeInput.getAttribute('value');
  }

  async correspondentsSelectLastOption() {
    await this.correspondentsSelect.all(by.tagName('option')).last().click();
  }

  async correspondentsSelectOption(option) {
    await this.correspondentsSelect.sendKeys(option);
  }

  getCorrespondentsSelect() {
    return this.correspondentsSelect;
  }

  async getCorrespondentsSelectedOption() {
    return this.correspondentsSelect.element(by.css('option:checked')).getText();
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

  async assessorSelectLastOption() {
    await this.assessorSelect.all(by.tagName('option')).last().click();
  }

  async assessorSelectOption(option) {
    await this.assessorSelect.sendKeys(option);
  }

  getAssessorSelect() {
    return this.assessorSelect;
  }

  async getAssessorSelectedOption() {
    return this.assessorSelect.element(by.css('option:checked')).getText();
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
    await this.setReferenceNumberInput('referenceNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setReferenceDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setAssessmentAmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.agencyStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setAssessmentNoticeInput(absolutePath);
    // this.correspondentsSelectLastOption();
    await this.settlementCurrencySelectLastOption();
    await this.assessorSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
