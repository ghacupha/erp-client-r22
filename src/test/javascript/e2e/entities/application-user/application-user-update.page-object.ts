import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ApplicationUserUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.applicationUser.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  designationInput: ElementFinder = element(by.css('input#application-user-designation'));
  applicationIdentityInput: ElementFinder = element(by.css('input#application-user-applicationIdentity'));
  organizationSelect: ElementFinder = element(by.css('select#application-user-organization'));
  departmentSelect: ElementFinder = element(by.css('select#application-user-department'));
  securityClearanceSelect: ElementFinder = element(by.css('select#application-user-securityClearance'));
  systemIdentitySelect: ElementFinder = element(by.css('select#application-user-systemIdentity'));
  userPropertiesSelect: ElementFinder = element(by.css('select#application-user-userProperties'));
  dealerIdentitySelect: ElementFinder = element(by.css('select#application-user-dealerIdentity'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDesignationInput(designation) {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput() {
    return this.designationInput.getAttribute('value');
  }

  async setApplicationIdentityInput(applicationIdentity) {
    await this.applicationIdentityInput.sendKeys(applicationIdentity);
  }

  async getApplicationIdentityInput() {
    return this.applicationIdentityInput.getAttribute('value');
  }

  async organizationSelectLastOption() {
    await this.organizationSelect.all(by.tagName('option')).last().click();
  }

  async organizationSelectOption(option) {
    await this.organizationSelect.sendKeys(option);
  }

  getOrganizationSelect() {
    return this.organizationSelect;
  }

  async getOrganizationSelectedOption() {
    return this.organizationSelect.element(by.css('option:checked')).getText();
  }

  async departmentSelectLastOption() {
    await this.departmentSelect.all(by.tagName('option')).last().click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
  }

  async securityClearanceSelectLastOption() {
    await this.securityClearanceSelect.all(by.tagName('option')).last().click();
  }

  async securityClearanceSelectOption(option) {
    await this.securityClearanceSelect.sendKeys(option);
  }

  getSecurityClearanceSelect() {
    return this.securityClearanceSelect;
  }

  async getSecurityClearanceSelectedOption() {
    return this.securityClearanceSelect.element(by.css('option:checked')).getText();
  }

  async systemIdentitySelectLastOption() {
    await this.systemIdentitySelect.all(by.tagName('option')).last().click();
  }

  async systemIdentitySelectOption(option) {
    await this.systemIdentitySelect.sendKeys(option);
  }

  getSystemIdentitySelect() {
    return this.systemIdentitySelect;
  }

  async getSystemIdentitySelectedOption() {
    return this.systemIdentitySelect.element(by.css('option:checked')).getText();
  }

  async userPropertiesSelectLastOption() {
    await this.userPropertiesSelect.all(by.tagName('option')).last().click();
  }

  async userPropertiesSelectOption(option) {
    await this.userPropertiesSelect.sendKeys(option);
  }

  getUserPropertiesSelect() {
    return this.userPropertiesSelect;
  }

  async getUserPropertiesSelectedOption() {
    return this.userPropertiesSelect.element(by.css('option:checked')).getText();
  }

  async dealerIdentitySelectLastOption() {
    await this.dealerIdentitySelect.all(by.tagName('option')).last().click();
  }

  async dealerIdentitySelectOption(option) {
    await this.dealerIdentitySelect.sendKeys(option);
  }

  getDealerIdentitySelect() {
    return this.dealerIdentitySelect;
  }

  async getDealerIdentitySelectedOption() {
    return this.dealerIdentitySelect.element(by.css('option:checked')).getText();
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
    await this.setDesignationInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setApplicationIdentityInput('applicationIdentity');
    await this.organizationSelectLastOption();
    await this.departmentSelectLastOption();
    await this.securityClearanceSelectLastOption();
    await this.systemIdentitySelectLastOption();
    // this.userPropertiesSelectLastOption();
    await this.dealerIdentitySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
