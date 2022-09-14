import { IDepreciationMethod } from 'app/shared/model/depreciation-method.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';

export interface IAssetCategory {
  id?: number;
  assetCategoryName?: string;
  description?: string | null;
  notes?: string | null;
  remarks?: string | null;
  depreciationMethod?: IDepreciationMethod;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IAssetCategory> = {};
