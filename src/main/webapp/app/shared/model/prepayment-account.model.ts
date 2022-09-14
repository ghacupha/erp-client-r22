import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { ISettlement } from 'app/shared/model/settlement.model';
import { IServiceOutlet } from 'app/shared/model/service-outlet.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { ITransactionAccount } from 'app/shared/model/transaction-account.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/universally-unique-mapping.model';
import { IPrepaymentMapping } from 'app/shared/model/prepayment-mapping.model';

export interface IPrepaymentAccount {
  id?: number;
  catalogueNumber?: string;
  particulars?: string;
  notes?: string | null;
  prepaymentAmount?: number | null;
  prepaymentGuid?: string | null;
  settlementCurrency?: ISettlementCurrency | null;
  prepaymentTransaction?: ISettlement | null;
  serviceOutlet?: IServiceOutlet | null;
  dealer?: IDealer | null;
  debitAccount?: ITransactionAccount | null;
  transferAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
  generalParameters?: IUniversallyUniqueMapping[] | null;
  prepaymentParameters?: IPrepaymentMapping[] | null;
}

export const defaultValue: Readonly<IPrepaymentAccount> = {};
