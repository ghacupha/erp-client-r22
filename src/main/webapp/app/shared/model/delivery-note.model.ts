import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { IBusinessStamp } from 'app/shared/model/business-stamp.model';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';

export interface IDeliveryNote {
  id?: number;
  deliveryNoteNumber?: string;
  documentDate?: string;
  description?: string | null;
  serialNumber?: string | null;
  quantity?: number | null;
  remarks?: string | null;
  placeholders?: IPlaceholder[] | null;
  receivedBy?: IDealer;
  deliveryStamps?: IBusinessStamp[] | null;
  purchaseOrder?: IPurchaseOrder | null;
  supplier?: IDealer;
  signatories?: IDealer[] | null;
  otherPurchaseOrders?: IPurchaseOrder[] | null;
}

export const defaultValue: Readonly<IDeliveryNote> = {};
