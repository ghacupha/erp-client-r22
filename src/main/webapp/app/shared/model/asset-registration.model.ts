import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IPaymentInvoice } from 'app/shared/model/payment-invoice.model';
import { IServiceOutlet } from 'app/shared/model/service-outlet.model';
import { ISettlement } from 'app/shared/model/settlement.model';
import { IAssetCategory } from 'app/shared/model/asset-category.model';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { IDeliveryNote } from 'app/shared/model/delivery-note.model';
import { IJobSheet } from 'app/shared/model/job-sheet.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';

export interface IAssetRegistration {
  id?: number;
  assetNumber?: string;
  assetTag?: string;
  assetDetails?: string | null;
  assetCost?: number;
  commentsContentType?: string | null;
  comments?: string | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  serviceOutlets?: IServiceOutlet[];
  settlements?: ISettlement[];
  assetCategory?: IAssetCategory;
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer;
  designatedUsers?: IDealer[] | null;
  settlementCurrency?: ISettlementCurrency | null;
}

export const defaultValue: Readonly<IAssetRegistration> = {};
