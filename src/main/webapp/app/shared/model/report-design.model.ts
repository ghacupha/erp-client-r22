import { IUniversallyUniqueMapping } from 'app/shared/model/universally-unique-mapping.model';
import { ISecurityClearance } from 'app/shared/model/security-clearance.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { IDealer } from 'app/shared/model/dealers/dealer.model';
import { IPlaceholder } from 'app/shared/model/erpService/placeholder.model';
import { ISystemModule } from 'app/shared/model/system-module.model';
import { IAlgorithm } from 'app/shared/model/algorithm.model';

export interface IReportDesign {
  id?: number;
  catalogueNumber?: string;
  designation?: string;
  description?: string | null;
  notesContentType?: string | null;
  notes?: string | null;
  reportFileContentType?: string | null;
  reportFile?: string | null;
  reportFileChecksum?: string | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  securityClearance?: ISecurityClearance;
  reportDesigner?: IApplicationUser;
  organization?: IDealer;
  department?: IDealer;
  placeholders?: IPlaceholder[] | null;
  systemModule?: ISystemModule;
  fileCheckSumAlgorithm?: IAlgorithm;
}

export const defaultValue: Readonly<IReportDesign> = {};
