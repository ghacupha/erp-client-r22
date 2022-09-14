import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UniversallyUniqueMappingUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.universallyUniqueMapping.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  universalKeyInput: ElementFinder = element(by.css('input#universally-unique-mapping-universalKey'));
  mappedValueInput: ElementFinder = element(by.css('input#universally-unique-mapping-mappedValue'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUniversalKeyInput(universalKey) {
    await this.universalKeyInput.sendKeys(universalKey);
  }

  async getUniversalKeyInput() {
    return this.universalKeyInput.getAttribute('value');
  }

  async setMappedValueInput(mappedValue) {
    await this.mappedValueInput.sendKeys(mappedValue);
  }

  async getMappedValueInput() {
    return this.mappedValueInput.getAttribute('value');
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
    await this.setUniversalKeyInput('universalKey');
    await waitUntilDisplayed(this.saveButton);
    await this.setMappedValueInput('mappedValue');
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
