import dayjs from 'dayjs';
import { IReportTemplate } from 'app/shared/model/report-template.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/universally-unique-mapping.model';
import { ReportStatusTypes } from 'app/shared/model/enumerations/report-status-types.model';

export interface IXlsxReportRequisition {
  id?: number;
  reportName?: string;
  reportDate?: string | null;
  userPassword?: string;
  reportFileChecksum?: string | null;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string;
  reportTemplate?: IReportTemplate;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IXlsxReportRequisition> = {};
