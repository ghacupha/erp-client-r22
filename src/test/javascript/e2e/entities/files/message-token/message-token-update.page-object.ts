import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class MessageTokenUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.filesMessageToken.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#message-token-description'));
  timeSentInput: ElementFinder = element(by.css('input#message-token-timeSent'));
  tokenValueInput: ElementFinder = element(by.css('input#message-token-tokenValue'));
  receivedInput: ElementFinder = element(by.css('input#message-token-received'));
  actionedInput: ElementFinder = element(by.css('input#message-token-actioned'));
  contentFullyEnqueuedInput: ElementFinder = element(by.css('input#message-token-contentFullyEnqueued'));
  placeholderSelect: ElementFinder = element(by.css('select#message-token-placeholder'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setTimeSentInput(timeSent) {
    await this.timeSentInput.sendKeys(timeSent);
  }

  async getTimeSentInput() {
    return this.timeSentInput.getAttribute('value');
  }

  async setTokenValueInput(tokenValue) {
    await this.tokenValueInput.sendKeys(tokenValue);
  }

  async getTokenValueInput() {
    return this.tokenValueInput.getAttribute('value');
  }

  getReceivedInput() {
    return this.receivedInput;
  }
  getActionedInput() {
    return this.actionedInput;
  }
  getContentFullyEnqueuedInput() {
    return this.contentFullyEnqueuedInput;
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
    await this.setTimeSentInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setTokenValueInput('tokenValue');
    await waitUntilDisplayed(this.saveButton);
    const selectedReceived = await this.getReceivedInput().isSelected();
    if (selectedReceived) {
      await this.getReceivedInput().click();
    } else {
      await this.getReceivedInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedActioned = await this.getActionedInput().isSelected();
    if (selectedActioned) {
      await this.getActionedInput().click();
    } else {
      await this.getActionedInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedContentFullyEnqueued = await this.getContentFullyEnqueuedInput().isSelected();
    if (selectedContentFullyEnqueued) {
      await this.getContentFullyEnqueuedInput().click();
    } else {
      await this.getContentFullyEnqueuedInput().click();
    }
    // this.placeholderSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
