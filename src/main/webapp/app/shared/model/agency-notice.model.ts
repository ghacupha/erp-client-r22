import dayjs from 'dayjs';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/settlement-currency.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { AgencyStatusType } from 'app/shared/model/enumerations/agency-status-type.model';

export interface IAgencyNotice {
  id?: number;
  referenceNumber?: string;
  referenceDate?: string | null;
  assessmentAmount?: number;
  agencyStatus?: AgencyStatusType;
  assessmentNoticeContentType?: string | null;
  assessmentNotice?: string | null;
  correspondents?: IDealer[] | null;
  settlementCurrency?: ISettlementCurrency | null;
  assessor?: IDealer | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IAgencyNotice> = {};
