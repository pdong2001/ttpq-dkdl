import { MoveType } from '../Enums/MoveType.enum';
import { PositionType } from '../Enums/PositionType.enum';
import { RegisterType } from '../Enums/RegisterType.enum';
import { TransitType } from '../Enums/TransitType.enum';

export type UpSertEventRegistryDto = {
  memberId?: string;
  eventId?: number;
  note?: string;
  startPlaneCode?: string;
  returnPlaneCode?: string;
  eventRegistryPageId?: string;
  moveType?: MoveType;
  endDate?: string;
  position?: PositionType;
  leaderId?: string;
  startDate?: string;
  startAddressId?: number;
  startTimeId?: number;
  leaveAddressId?: number;
  leaveTimeId?: number;
  otherStartTime?: string;
  otherLeaveTime?: string;
  receiveCardAddressId?: number;
  registerType?: RegisterType;
  expDepartmentIds?: number[];
  wishDepartmentId?: number[];
  otherStartAddress?: string;
  otherLeaveAddress?: string;
  type?: string;
  ctnId?: string;
  // thêm field
  transitType?: TransitType;
  shirtSizeId?: number;
};
