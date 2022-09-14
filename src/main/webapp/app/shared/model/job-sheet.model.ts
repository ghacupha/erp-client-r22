import dayjs from 'dayjs';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { IBusinessStamp } from 'app/shared/model/business-stamp.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IPaymentLabel } from 'app/shared/model/payment-label.model';

export interface IJobSheet {
  id?: number;
  serialNumber?: string;
  jobSheetDate?: string | null;
  details?: string | null;
  remarks?: string | null;
  biller?: IDealer;
  signatories?: IDealer[] | null;
  contactPerson?: IDealer | null;
  businessStamps?: IBusinessStamp[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentLabels?: IPaymentLabel[] | null;
}

export const defaultValue: Readonly<IJobSheet> = {};
