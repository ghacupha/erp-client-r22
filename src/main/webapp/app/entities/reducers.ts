import amortizationRecurrence from 'app/entities/amortization-recurrence/amortization-recurrence.reducer';
import fixedAssetAcquisition from 'app/entities/assets/fixed-asset-acquisition/fixed-asset-acquisition.reducer';
import fixedAssetNetBookValue from 'app/entities/assets/fixed-asset-net-book-value/fixed-asset-net-book-value.reducer';
import fixedAssetDepreciation from 'app/entities/assets/fixed-asset-depreciation/fixed-asset-depreciation.reducer';
import fileType from 'app/entities/files/file-type/file-type.reducer';
import fileUpload from 'app/entities/files/file-upload/file-upload.reducer';
import messageToken from 'app/entities/files/message-token/message-token.reducer';
import invoice from 'app/entities/payments/invoice/invoice.reducer';
import payment from 'app/entities/payments/payment/payment.reducer';
import dealer from 'app/entities/dealers/dealer/dealer.reducer';
import paymentCalculation from 'app/entities/payments/payment-calculation/payment-calculation.reducer';
import paymentRequisition from 'app/entities/payments/payment-requisition/payment-requisition.reducer';
import taxReference from 'app/entities/payments/tax-reference/tax-reference.reducer';
import taxRule from 'app/entities/payments/tax-rule/tax-rule.reducer';
import paymentCategory from 'app/entities/payments/payment-category/payment-category.reducer';
import placeholder from 'app/entities/erpService/placeholder/placeholder.reducer';
import paymentLabel from 'app/entities/payment-label/payment-label.reducer';
import signedPayment from 'app/entities/signed-payment/signed-payment.reducer';
import settlementCurrency from 'app/entities/settlement-currency/settlement-currency.reducer';
import purchaseOrder from 'app/entities/purchase-order/purchase-order.reducer';
import paymentInvoice from 'app/entities/payment-invoice/payment-invoice.reducer';
import settlement from 'app/entities/settlement/settlement.reducer';
import agencyNotice from 'app/entities/agency-notice/agency-notice.reducer';
import depreciationMethod from 'app/entities/depreciation-method/depreciation-method.reducer';
import assetCategory from 'app/entities/asset-category/asset-category.reducer';
import bankBranchCode from 'app/entities/bank-branch-code/bank-branch-code.reducer';
import outletStatus from 'app/entities/outlet-status/outlet-status.reducer';
import outletType from 'app/entities/outlet-type/outlet-type.reducer';
import countyCode from 'app/entities/county-code/county-code.reducer';
import serviceOutlet from 'app/entities/service-outlet/service-outlet.reducer';
import businessStamp from 'app/entities/business-stamp/business-stamp.reducer';
import deliveryNote from 'app/entities/delivery-note/delivery-note.reducer';
import jobSheet from 'app/entities/job-sheet/job-sheet.reducer';
import creditNote from 'app/entities/credit-note/credit-note.reducer';
import customerIDDocumentType from 'app/entities/customer-id-document-type/customer-id-document-type.reducer';
import institutionCode from 'app/entities/institution-code/institution-code.reducer';
import mfbBranchCode from 'app/entities/mfb-branch-code/mfb-branch-code.reducer';
import isoCountryCode from 'app/entities/iso-country-code/iso-country-code.reducer';
import subCountyCode from 'app/entities/sub-county-code/sub-county-code.reducer';
import assetRegistration from 'app/entities/asset-registration/asset-registration.reducer';
import workInProgressRegistration from 'app/entities/work-in-progress-registration/work-in-progress-registration.reducer';
import workInProgressTransfer from 'app/entities/work-in-progress-transfer/work-in-progress-transfer.reducer';
import workProjectRegister from 'app/entities/work-project-register/work-project-register.reducer';
import transactionAccount from 'app/entities/transaction-account/transaction-account.reducer';
import prepaymentAccount from 'app/entities/prepayment-account/prepayment-account.reducer';
import prepaymentMarshalling from 'app/entities/prepayment-marshalling/prepayment-marshalling.reducer';
import prepaymentAmortization from 'app/entities/prepayment-amortization/prepayment-amortization.reducer';
import reportTemplate from 'app/entities/report-template/report-template.reducer';
import pdfReportRequisition from 'app/entities/pdf-report-requisition/pdf-report-requisition.reducer';
import xlsxReportRequisition from 'app/entities/xlsx-report-requisition/xlsx-report-requisition.reducer';
import universallyUniqueMapping from 'app/entities/universally-unique-mapping/universally-unique-mapping.reducer';
import reportRequisition from 'app/entities/report-requisition/report-requisition.reducer';
import systemContentType from 'app/entities/system-content-type/system-content-type.reducer';
import reportContentType from 'app/entities/report-content-type/report-content-type.reducer';
import excelReportExport from 'app/entities/excel-report-export/excel-report-export.reducer';
import processStatus from 'app/entities/process-status/process-status.reducer';
import reportStatus from 'app/entities/report-status/report-status.reducer';
import algorithm from 'app/entities/algorithm/algorithm.reducer';
import securityClearance from 'app/entities/security-clearance/security-clearance.reducer';
import applicationUser from 'app/entities/application-user/application-user.reducer';
import reportDesign from 'app/entities/report-design/report-design.reducer';
import systemModule from 'app/entities/system-module/system-module.reducer';
import prepaymentMapping from 'app/entities/prepayment-mapping/prepayment-mapping.reducer';
import amortizationSequence from 'app/entities/amortization-sequence/amortization-sequence.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  amortizationRecurrence,
  fixedAssetAcquisition,
  fixedAssetNetBookValue,
  fixedAssetDepreciation,
  fileType,
  fileUpload,
  messageToken,
  invoice,
  payment,
  dealer,
  paymentCalculation,
  paymentRequisition,
  taxReference,
  taxRule,
  paymentCategory,
  placeholder,
  paymentLabel,
  signedPayment,
  settlementCurrency,
  purchaseOrder,
  paymentInvoice,
  settlement,
  agencyNotice,
  depreciationMethod,
  assetCategory,
  bankBranchCode,
  outletStatus,
  outletType,
  countyCode,
  serviceOutlet,
  businessStamp,
  deliveryNote,
  jobSheet,
  creditNote,
  customerIDDocumentType,
  institutionCode,
  mfbBranchCode,
  isoCountryCode,
  subCountyCode,
  assetRegistration,
  workInProgressRegistration,
  workInProgressTransfer,
  workProjectRegister,
  transactionAccount,
  prepaymentAccount,
  prepaymentMarshalling,
  prepaymentAmortization,
  reportTemplate,
  pdfReportRequisition,
  xlsxReportRequisition,
  universallyUniqueMapping,
  reportRequisition,
  systemContentType,
  reportContentType,
  excelReportExport,
  processStatus,
  reportStatus,
  algorithm,
  securityClearance,
  applicationUser,
  reportDesign,
  systemModule,
  prepaymentMapping,
  amortizationSequence,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
