import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrepaymentMarshallingComponentsPage from './prepayment-marshalling.page-object';
import PrepaymentMarshallingUpdatePage from './prepayment-marshalling-update.page-object';
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

describe('PrepaymentMarshalling e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentMarshallingComponentsPage: PrepaymentMarshallingComponentsPage;
  let prepaymentMarshallingUpdatePage: PrepaymentMarshallingUpdatePage;
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
    prepaymentMarshallingComponentsPage = new PrepaymentMarshallingComponentsPage();
    prepaymentMarshallingComponentsPage = await prepaymentMarshallingComponentsPage.goToPage(navBarPage);
  });

  it('should load PrepaymentMarshallings', async () => {
    expect(await prepaymentMarshallingComponentsPage.title.getText()).to.match(/Prepayment Marshallings/);
    expect(await prepaymentMarshallingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete PrepaymentMarshallings', async () => {
        const beforeRecordsCount = await isVisible(prepaymentMarshallingComponentsPage.noRecords) ? 0 : await getRecordsCount(prepaymentMarshallingComponentsPage.table);
        prepaymentMarshallingUpdatePage = await prepaymentMarshallingComponentsPage.goToCreatePrepaymentMarshalling();
        await prepaymentMarshallingUpdatePage.enterData();
        expect(await isVisible(prepaymentMarshallingUpdatePage.saveButton)).to.be.false;

        expect(await prepaymentMarshallingComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(prepaymentMarshallingComponentsPage.table);
        await waitUntilCount(prepaymentMarshallingComponentsPage.records, beforeRecordsCount + 1);
        expect(await prepaymentMarshallingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await prepaymentMarshallingComponentsPage.deletePrepaymentMarshalling();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(prepaymentMarshallingComponentsPage.records, beforeRecordsCount);
          expect(await prepaymentMarshallingComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(prepaymentMarshallingComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
