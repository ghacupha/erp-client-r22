import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';

export interface IWorkProjectRegister {
  id?: number;
  catalogueNumber?: string;
  description?: string;
  detailsContentType?: string | null;
  details?: string | null;
  totalProjectCost?: number | null;
  additionalNotesContentType?: string | null;
  additionalNotes?: string | null;
  dealers?: IDealer[];
  settlementCurrency?: ISettlementCurrency | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IWorkProjectRegister> = {};
