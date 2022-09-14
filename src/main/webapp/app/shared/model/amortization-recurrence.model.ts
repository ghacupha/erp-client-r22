import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IPrepaymentMapping } from 'app/shared/model/prepayment-mapping.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/universally-unique-mapping.model';
import { IDepreciationMethod } from 'app/shared/model/depreciation-method.model';
import { IPrepaymentAccount } from 'app/shared/model/prepayment-account.model';
import { recurrenceFrequency } from 'app/shared/model/enumerations/recurrence-frequency.model';

export interface IAmortizationRecurrence {
  id?: number;
  firstAmortizationDate?: string;
  amortizationFrequency?: recurrenceFrequency;
  numberOfRecurrences?: number;
  notesContentType?: string | null;
  notes?: string | null;
  particulars?: string | null;
  isActive?: boolean | null;
  isOverWritten?: boolean | null;
  timeOfInstallation?: string;
  recurrenceGuid?: string;
  prepaymentAccountGuid?: string;
  placeholders?: IPlaceholder[] | null;
  parameters?: IPrepaymentMapping[] | null;
  applicationParameters?: IUniversallyUniqueMapping[] | null;
  depreciationMethod?: IDepreciationMethod;
  prepaymentAccount?: IPrepaymentAccount;
}

export const defaultValue: Readonly<IAmortizationRecurrence> = {
  isActive: false,
  isOverWritten: false,
};
