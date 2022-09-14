import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/universally-unique-mapping.model';
import { SystemContentTypeAvailability } from 'app/shared/model/enumerations/system-content-type-availability.model';

export interface ISystemContentType {
  id?: number;
  contentTypeName?: string;
  contentTypeHeader?: string;
  comments?: string | null;
  availability?: SystemContentTypeAvailability;
  placeholders?: IPlaceholder[] | null;
  sysMaps?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<ISystemContentType> = {};
