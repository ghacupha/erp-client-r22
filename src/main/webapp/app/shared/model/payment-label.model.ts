import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';

export interface IPaymentLabel {
  id?: number;
  description?: string;
  comments?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  containingPaymentLabel?: IPaymentLabel | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPaymentLabel> = {};
