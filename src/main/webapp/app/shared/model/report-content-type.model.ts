import { ISystemContentType } from 'app/shared/model/system-content-type.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';

export interface IReportContentType {
  id?: number;
  reportTypeName?: string;
  reportFileExtension?: string;
  systemContentType?: ISystemContentType;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IReportContentType> = {};
