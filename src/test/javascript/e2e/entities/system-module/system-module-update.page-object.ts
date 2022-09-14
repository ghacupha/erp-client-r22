import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SystemModuleUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.systemModule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  moduleNameInput: ElementFinder = element(by.css('input#system-module-moduleName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setModuleNameInput(moduleName) {
    await this.moduleNameInput.sendKeys(moduleName);
  }

  async getModuleNameInput() {
    return this.moduleNameInput.getAttribute('value');
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
    await this.setModuleNameInput('moduleName');
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
