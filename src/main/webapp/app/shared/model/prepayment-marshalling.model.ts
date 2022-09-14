import dayjs from 'dayjs';
import { IPrepaymentAccount } from 'app/shared/model/prepayment-account.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';

export interface IPrepaymentMarshalling {
  id?: number;
  inactive?: boolean;
  amortizationCommencementDate?: string | null;
  amortizationPeriods?: number | null;
  prepaymentAccount?: IPrepaymentAccount;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPrepaymentMarshalling> = {
  inactive: false,
};
