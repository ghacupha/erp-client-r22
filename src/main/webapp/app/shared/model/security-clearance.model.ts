import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';

export interface ISecurityClearance {
  id?: number;
  clearanceLevel?: string;
  grantedClearances?: ISecurityClearance[] | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<ISecurityClearance> = {};
