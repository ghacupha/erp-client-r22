import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DeliveryNoteComponentsPage from './delivery-note.page-object';
import DeliveryNoteUpdatePage from './delivery-note-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('DeliveryNote e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let deliveryNoteComponentsPage: DeliveryNoteComponentsPage;
  let deliveryNoteUpdatePage: DeliveryNoteUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    deliveryNoteComponentsPage = new DeliveryNoteComponentsPage();
    deliveryNoteComponentsPage = await deliveryNoteComponentsPage.goToPage(navBarPage);
  });

  it('should load DeliveryNotes', async () => {
    expect(await deliveryNoteComponentsPage.title.getText()).to.match(/Delivery Notes/);
    expect(await deliveryNoteComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete DeliveryNotes', async () => {
        const beforeRecordsCount = await isVisible(deliveryNoteComponentsPage.noRecords) ? 0 : await getRecordsCount(deliveryNoteComponentsPage.table);
        deliveryNoteUpdatePage = await deliveryNoteComponentsPage.goToCreateDeliveryNote();
        await deliveryNoteUpdatePage.enterData();
        expect(await isVisible(deliveryNoteUpdatePage.saveButton)).to.be.false;

        expect(await deliveryNoteComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(deliveryNoteComponentsPage.table);
        await waitUntilCount(deliveryNoteComponentsPage.records, beforeRecordsCount + 1);
        expect(await deliveryNoteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await deliveryNoteComponentsPage.deleteDeliveryNote();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(deliveryNoteComponentsPage.records, beforeRecordsCount);
          expect(await deliveryNoteComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(deliveryNoteComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
