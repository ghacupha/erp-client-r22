import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class TransactionAccountUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.transactionAccount.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  accountNumberInput: ElementFinder = element(by.css('input#transaction-account-accountNumber'));
  accountNameInput: ElementFinder = element(by.css('input#transaction-account-accountName'));
  notesInput: ElementFinder = element(by.css('input#transaction-account-notes'));
  parentAccountSelect: ElementFinder = element(by.css('select#transaction-account-parentAccount'));
  placeholderSelect: ElementFinder = element(by.css('select#transaction-account-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAccountNumberInput(accountNumber) {
    await this.accountNumberInput.sendKeys(accountNumber);
  }

  async getAccountNumberInput() {
    return this.accountNumberInput.getAttribute('value');
  }

  async setAccountNameInput(accountName) {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput() {
    return this.accountNameInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async parentAccountSelectLastOption() {
    await this.parentAccountSelect.all(by.tagName('option')).last().click();
  }

  async parentAccountSelectOption(option) {
    await this.parentAccountSelect.sendKeys(option);
  }

  getParentAccountSelect() {
    return this.parentAccountSelect;
  }

  async getParentAccountSelectedOption() {
    return this.parentAccountSelect.element(by.css('option:checked')).getText();
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
    await this.setAccountNumberInput('accountNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNameInput('accountName');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput(absolutePath);
    await this.parentAccountSelectLastOption();
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
