import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BankBranchCodeUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.bankBranchCode.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bankCodeInput: ElementFinder = element(by.css('input#bank-branch-code-bankCode'));
  bankNameInput: ElementFinder = element(by.css('input#bank-branch-code-bankName'));
  branchCodeInput: ElementFinder = element(by.css('input#bank-branch-code-branchCode'));
  branchNameInput: ElementFinder = element(by.css('input#bank-branch-code-branchName'));
  notesInput: ElementFinder = element(by.css('input#bank-branch-code-notes'));
  placeholderSelect: ElementFinder = element(by.css('select#bank-branch-code-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBankCodeInput(bankCode) {
    await this.bankCodeInput.sendKeys(bankCode);
  }

  async getBankCodeInput() {
    return this.bankCodeInput.getAttribute('value');
  }

  async setBankNameInput(bankName) {
    await this.bankNameInput.sendKeys(bankName);
  }

  async getBankNameInput() {
    return this.bankNameInput.getAttribute('value');
  }

  async setBranchCodeInput(branchCode) {
    await this.branchCodeInput.sendKeys(branchCode);
  }

  async getBranchCodeInput() {
    return this.branchCodeInput.getAttribute('value');
  }

  async setBranchNameInput(branchName) {
    await this.branchNameInput.sendKeys(branchName);
  }

  async getBranchNameInput() {
    return this.branchNameInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
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
    await this.setBankCodeInput('bankCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setBankNameInput('bankName');
    await waitUntilDisplayed(this.saveButton);
    await this.setBranchCodeInput('branchCode');
    await waitUntilDisplayed(this.saveButton);
    await this.setBranchNameInput('branchName');
    await waitUntilDisplayed(this.saveButton);
    await this.setNotesInput('notes');
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
