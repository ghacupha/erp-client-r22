import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AmortizationRecurrence from './amortization-recurrence';
import FixedAssetAcquisition from './assets/fixed-asset-acquisition';
import FixedAssetNetBookValue from './assets/fixed-asset-net-book-value';
import FixedAssetDepreciation from './assets/fixed-asset-depreciation';
import FileType from './files/file-type';
import FileUpload from './files/file-upload';
import MessageToken from './files/message-token';
import Invoice from './payments/invoice';
import Payment from './payments/payment';
import Dealer from './dealers/dealer';
import PaymentCalculation from './payments/payment-calculation';
import PaymentRequisition from './payments/payment-requisition';
import TaxReference from './payments/tax-reference';
import TaxRule from './payments/tax-rule';
import PaymentCategory from './payments/payment-category';
import Placeholder from './erpService/placeholder';
import PaymentLabel from './payment-label';
import SignedPayment from './signed-payment';
import SettlementCurrency from './settlement-currency';
import PurchaseOrder from './purchase-order';
import PaymentInvoice from './payment-invoice';
import Settlement from './settlement';
import AgencyNotice from './agency-notice';
import DepreciationMethod from './depreciation-method';
import AssetCategory from './asset-category';
import BankBranchCode from './bank-branch-code';
import OutletStatus from './outlet-status';
import OutletType from './outlet-type';
import CountyCode from './county-code';
import ServiceOutlet from './service-outlet';
import BusinessStamp from './business-stamp';
import DeliveryNote from './delivery-note';
import JobSheet from './job-sheet';
import CreditNote from './credit-note';
import CustomerIDDocumentType from './customer-id-document-type';
import InstitutionCode from './institution-code';
import MfbBranchCode from './mfb-branch-code';
import IsoCountryCode from './iso-country-code';
import SubCountyCode from './sub-county-code';
import AssetRegistration from './asset-registration';
import WorkInProgressRegistration from './work-in-progress-registration';
import WorkInProgressTransfer from './work-in-progress-transfer';
import WorkProjectRegister from './work-project-register';
import TransactionAccount from './transaction-account';
import PrepaymentAccount from './prepayment-account';
import PrepaymentMarshalling from './prepayment-marshalling';
import PrepaymentAmortization from './prepayment-amortization';
import ReportTemplate from './report-template';
import PdfReportRequisition from './pdf-report-requisition';
import XlsxReportRequisition from './xlsx-report-requisition';
import UniversallyUniqueMapping from './universally-unique-mapping';
import ReportRequisition from './report-requisition';
import SystemContentType from './system-content-type';
import ReportContentType from './report-content-type';
import ExcelReportExport from './excel-report-export';
import ProcessStatus from './process-status';
import ReportStatus from './report-status';
import Algorithm from './algorithm';
import SecurityClearance from './security-clearance';
import ApplicationUser from './application-user';
import ReportDesign from './report-design';
import SystemModule from './system-module';
import PrepaymentMapping from './prepayment-mapping';
import AmortizationSequence from './amortization-sequence';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="amortization-recurrence/*" element={<AmortizationRecurrence />} />
        <Route path="fixed-asset-acquisition/*" element={<FixedAssetAcquisition />} />
        <Route path="fixed-asset-net-book-value/*" element={<FixedAssetNetBookValue />} />
        <Route path="fixed-asset-depreciation/*" element={<FixedAssetDepreciation />} />
        <Route path="file-type/*" element={<FileType />} />
        <Route path="file-upload/*" element={<FileUpload />} />
        <Route path="message-token/*" element={<MessageToken />} />
        <Route path="invoice/*" element={<Invoice />} />
        <Route path="payment/*" element={<Payment />} />
        <Route path="dealer/*" element={<Dealer />} />
        <Route path="payment-calculation/*" element={<PaymentCalculation />} />
        <Route path="payment-requisition/*" element={<PaymentRequisition />} />
        <Route path="tax-reference/*" element={<TaxReference />} />
        <Route path="tax-rule/*" element={<TaxRule />} />
        <Route path="payment-category/*" element={<PaymentCategory />} />
        <Route path="placeholder/*" element={<Placeholder />} />
        <Route path="payment-label/*" element={<PaymentLabel />} />
        <Route path="signed-payment/*" element={<SignedPayment />} />
        <Route path="settlement-currency/*" element={<SettlementCurrency />} />
        <Route path="purchase-order/*" element={<PurchaseOrder />} />
        <Route path="payment-invoice/*" element={<PaymentInvoice />} />
        <Route path="settlement/*" element={<Settlement />} />
        <Route path="agency-notice/*" element={<AgencyNotice />} />
        <Route path="depreciation-method/*" element={<DepreciationMethod />} />
        <Route path="asset-category/*" element={<AssetCategory />} />
        <Route path="bank-branch-code/*" element={<BankBranchCode />} />
        <Route path="outlet-status/*" element={<OutletStatus />} />
        <Route path="outlet-type/*" element={<OutletType />} />
        <Route path="county-code/*" element={<CountyCode />} />
        <Route path="service-outlet/*" element={<ServiceOutlet />} />
        <Route path="business-stamp/*" element={<BusinessStamp />} />
        <Route path="delivery-note/*" element={<DeliveryNote />} />
        <Route path="job-sheet/*" element={<JobSheet />} />
        <Route path="credit-note/*" element={<CreditNote />} />
        <Route path="customer-id-document-type/*" element={<CustomerIDDocumentType />} />
        <Route path="institution-code/*" element={<InstitutionCode />} />
        <Route path="mfb-branch-code/*" element={<MfbBranchCode />} />
        <Route path="iso-country-code/*" element={<IsoCountryCode />} />
        <Route path="sub-county-code/*" element={<SubCountyCode />} />
        <Route path="asset-registration/*" element={<AssetRegistration />} />
        <Route path="work-in-progress-registration/*" element={<WorkInProgressRegistration />} />
        <Route path="work-in-progress-transfer/*" element={<WorkInProgressTransfer />} />
        <Route path="work-project-register/*" element={<WorkProjectRegister />} />
        <Route path="transaction-account/*" element={<TransactionAccount />} />
        <Route path="prepayment-account/*" element={<PrepaymentAccount />} />
        <Route path="prepayment-marshalling/*" element={<PrepaymentMarshalling />} />
        <Route path="prepayment-amortization/*" element={<PrepaymentAmortization />} />
        <Route path="report-template/*" element={<ReportTemplate />} />
        <Route path="pdf-report-requisition/*" element={<PdfReportRequisition />} />
        <Route path="xlsx-report-requisition/*" element={<XlsxReportRequisition />} />
        <Route path="universally-unique-mapping/*" element={<UniversallyUniqueMapping />} />
        <Route path="report-requisition/*" element={<ReportRequisition />} />
        <Route path="system-content-type/*" element={<SystemContentType />} />
        <Route path="report-content-type/*" element={<ReportContentType />} />
        <Route path="excel-report-export/*" element={<ExcelReportExport />} />
        <Route path="process-status/*" element={<ProcessStatus />} />
        <Route path="report-status/*" element={<ReportStatus />} />
        <Route path="algorithm/*" element={<Algorithm />} />
        <Route path="security-clearance/*" element={<SecurityClearance />} />
        <Route path="application-user/*" element={<ApplicationUser />} />
        <Route path="report-design/*" element={<ReportDesign />} />
        <Route path="system-module/*" element={<SystemModule />} />
        <Route path="prepayment-mapping/*" element={<PrepaymentMapping />} />
        <Route path="amortization-sequence/*" element={<AmortizationSequence />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
