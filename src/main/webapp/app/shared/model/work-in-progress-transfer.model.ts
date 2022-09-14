import { IWorkInProgressRegistration } from 'app/shared/model/work-in-progress-registration.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';

export interface IWorkInProgressTransfer {
  id?: number;
  description?: string | null;
  targetAssetNumber?: string | null;
  workInProgressRegistrations?: IWorkInProgressRegistration[] | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IWorkInProgressTransfer> = {};
