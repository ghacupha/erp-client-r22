import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class DeliveryNoteUpdatePage {
  pageTitle: ElementFinder = element(by.id('erpSystemR22App.deliveryNote.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  deliveryNoteNumberInput: ElementFinder = element(by.css('input#delivery-note-deliveryNoteNumber'));
  documentDateInput: ElementFinder = element(by.css('input#delivery-note-documentDate'));
  descriptionInput: ElementFinder = element(by.css('input#delivery-note-description'));
  serialNumberInput: ElementFinder = element(by.css('input#delivery-note-serialNumber'));
  quantityInput: ElementFinder = element(by.css('input#delivery-note-quantity'));
  remarksInput: ElementFinder = element(by.css('textarea#delivery-note-remarks'));
  placeholderSelect: ElementFinder = element(by.css('select#delivery-note-placeholder'));
  receivedBySelect: ElementFinder = element(by.css('select#delivery-note-receivedBy'));
  deliveryStampsSelect: ElementFinder = element(by.css('select#delivery-note-deliveryStamps'));
  purchaseOrderSelect: ElementFinder = element(by.css('select#delivery-note-purchaseOrder'));
  supplierSelect: ElementFinder = element(by.css('select#delivery-note-supplier'));
  signatoriesSelect: ElementFinder = element(by.css('select#delivery-note-signatories'));
  otherPurchaseOrdersSelect: ElementFinder = element(by.css('select#delivery-note-otherPurchaseOrders'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDeliveryNoteNumberInput(deliveryNoteNumber) {
    await this.deliveryNoteNumberInput.sendKeys(deliveryNoteNumber);
  }

  async getDeliveryNoteNumberInput() {
    return this.deliveryNoteNumberInput.getAttribute('value');
  }

  async setDocumentDateInput(documentDate) {
    await this.documentDateInput.sendKeys(documentDate);
  }

  async getDocumentDateInput() {
    return this.documentDateInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setSerialNumberInput(serialNumber) {
    await this.serialNumberInput.sendKeys(serialNumber);
  }

  async getSerialNumberInput() {
    return this.serialNumberInput.getAttribute('value');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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

  async receivedBySelectLastOption() {
    await this.receivedBySelect.all(by.tagName('option')).last().click();
  }

  async receivedBySelectOption(option) {
    await this.receivedBySelect.sendKeys(option);
  }

  getReceivedBySelect() {
    return this.receivedBySelect;
  }

  async getReceivedBySelectedOption() {
    return this.receivedBySelect.element(by.css('option:checked')).getText();
  }

  async deliveryStampsSelectLastOption() {
    await this.deliveryStampsSelect.all(by.tagName('option')).last().click();
  }

  async deliveryStampsSelectOption(option) {
    await this.deliveryStampsSelect.sendKeys(option);
  }

  getDeliveryStampsSelect() {
    return this.deliveryStampsSelect;
  }

  async getDeliveryStampsSelectedOption() {
    return this.deliveryStampsSelect.element(by.css('option:checked')).getText();
  }

  async purchaseOrderSelectLastOption() {
    await this.purchaseOrderSelect.all(by.tagName('option')).last().click();
  }

  async purchaseOrderSelectOption(option) {
    await this.purchaseOrderSelect.sendKeys(option);
  }

  getPurchaseOrderSelect() {
    return this.purchaseOrderSelect;
  }

  async getPurchaseOrderSelectedOption() {
    return this.purchaseOrderSelect.element(by.css('option:checked')).getText();
  }

  async supplierSelectLastOption() {
    await this.supplierSelect.all(by.tagName('option')).last().click();
  }

  async supplierSelectOption(option) {
    await this.supplierSelect.sendKeys(option);
  }

  getSupplierSelect() {
    return this.supplierSelect;
  }

  async getSupplierSelectedOption() {
    return this.supplierSelect.element(by.css('option:checked')).getText();
  }

  async signatoriesSelectLastOption() {
    await this.signatoriesSelect.all(by.tagName('option')).last().click();
  }

  async signatoriesSelectOption(option) {
    await this.signatoriesSelect.sendKeys(option);
  }

  getSignatoriesSelect() {
    return this.signatoriesSelect;
  }

  async getSignatoriesSelectedOption() {
    return this.signatoriesSelect.element(by.css('option:checked')).getText();
  }

  async otherPurchaseOrdersSelectLastOption() {
    await this.otherPurchaseOrdersSelect.all(by.tagName('option')).last().click();
  }

  async otherPurchaseOrdersSelectOption(option) {
    await this.otherPurchaseOrdersSelect.sendKeys(option);
  }

  getOtherPurchaseOrdersSelect() {
    return this.otherPurchaseOrdersSelect;
  }

  async getOtherPurchaseOrdersSelectedOption() {
    return this.otherPurchaseOrdersSelect.element(by.css('option:checked')).getText();
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
    await this.setDeliveryNoteNumberInput('deliveryNoteNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setDocumentDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setSerialNumberInput('serialNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setQuantityInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    // this.placeholderSelectLastOption();
    await this.receivedBySelectLastOption();
    // this.deliveryStampsSelectLastOption();
    await this.purchaseOrderSelectLastOption();
    await this.supplierSelectLastOption();
    // this.signatoriesSelectLastOption();
    // this.otherPurchaseOrdersSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
