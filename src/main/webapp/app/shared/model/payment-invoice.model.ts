import dayjs from 'dayjs';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IPaymentLabel } from 'app/shared/model/payment-label.model';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { IDeliveryNote } from 'app/shared/model/delivery-note.model';
import { IJobSheet } from 'app/shared/model/job-sheet.model';

export interface IPaymentInvoice {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: string | null;
  invoiceAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  purchaseOrders?: IPurchaseOrder[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentLabels?: IPaymentLabel[] | null;
  settlementCurrency?: ISettlementCurrency;
  biller?: IDealer;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
}

export const defaultValue: Readonly<IPaymentInvoice> = {};
