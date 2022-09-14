import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { IPaymentLabel } from 'app/shared/model/payment-label.model';
import { IPaymentCategory } from 'app/shared/model/payments/payment-category.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { IPaymentInvoice } from 'app/shared/model/payment-invoice.model';

export interface ISettlement {
  id?: number;
  paymentNumber?: string | null;
  paymentDate?: string | null;
  paymentAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  calculationFileContentType?: string | null;
  calculationFile?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  placeholders?: IPlaceholder[] | null;
  settlementCurrency?: ISettlementCurrency;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory;
  groupSettlement?: ISettlement | null;
  biller?: IDealer;
  paymentInvoices?: IPaymentInvoice[] | null;
  signatories?: IDealer[] | null;
}

export const defaultValue: Readonly<ISettlement> = {};
