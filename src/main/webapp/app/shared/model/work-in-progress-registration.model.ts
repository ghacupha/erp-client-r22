import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IPaymentInvoice } from 'app/shared/model/payment-invoice.model';
import { IServiceOutlet } from 'app/shared/model/service-outlet.model';
import { ISettlement } from 'app/shared/model/settlement.model';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { IDeliveryNote } from 'app/shared/model/delivery-note.model';
import { IJobSheet } from 'app/shared/model/job-sheet.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { IWorkProjectRegister } from 'app/shared/model/work-project-register.model';

export interface IWorkInProgressRegistration {
  id?: number;
  sequenceNumber?: string;
  particulars?: string | null;
  instalmentAmount?: number | null;
  commentsContentType?: string | null;
  comments?: string | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  serviceOutlets?: IServiceOutlet[];
  settlements?: ISettlement[];
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer;
  workInProgressGroup?: IWorkInProgressRegistration | null;
  settlementCurrency?: ISettlementCurrency | null;
  workProjectRegister?: IWorkProjectRegister | null;
}

export const defaultValue: Readonly<IWorkInProgressRegistration> = {};
