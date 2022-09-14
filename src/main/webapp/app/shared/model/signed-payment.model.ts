import dayjs from 'dayjs';
import { IPaymentLabel } from 'app/shared/model/payment-label.model';
import { IPaymentCategory } from 'app/shared/model/payments/payment-category.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { CurrencyTypes } from 'app/shared/model/enumerations/currency-types.model';

export interface ISignedPayment {
  id?: number;
  transactionNumber?: string;
  transactionDate?: string;
  transactionCurrency?: CurrencyTypes;
  transactionAmount?: number;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory | null;
  placeholders?: IPlaceholder[] | null;
  signedPaymentGroup?: ISignedPayment | null;
}

export const defaultValue: Readonly<ISignedPayment> = {};
