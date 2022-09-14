import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { ISecurityClearance } from 'app/shared/model/security-clearance.model';
import { IUser } from 'app/shared/model/user.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/universally-unique-mapping.model';

export interface IApplicationUser {
  id?: number;
  designation?: string;
  applicationIdentity?: string;
  organization?: IDealer;
  department?: IDealer;
  securityClearance?: ISecurityClearance;
  systemIdentity?: IUser;
  userProperties?: IUniversallyUniqueMapping[] | null;
  dealerIdentity?: IDealer;
}

export const defaultValue: Readonly<IApplicationUser> = {};
