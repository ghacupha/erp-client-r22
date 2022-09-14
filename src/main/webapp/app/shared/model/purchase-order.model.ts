import dayjs from 'dayjs';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';

export interface IPurchaseOrder {
  id?: number;
  purchaseOrderNumber?: string;
  purchaseOrderDate?: string | null;
  purchaseOrderAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  settlementCurrency?: ISettlementCurrency | null;
  placeholders?: IPlaceholder[] | null;
  signatories?: IDealer[] | null;
  vendor?: IDealer;
}

export const defaultValue: Readonly<IPurchaseOrder> = {};
