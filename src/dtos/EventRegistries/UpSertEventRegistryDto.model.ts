import { UpsertAddressDto } from '~/dtos/Addresses/UpsertAddressDto.model';
import { MoveType } from '../Enums/MoveType.enum';
import { PositionType } from '../Enums/PositionType.enum';
import { RegisterType } from '../Enums/RegisterType.enum';

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
  startTimeId?: number;
  leaveTimeId?: number;
  otherStartTime?: string;
  otherLeaveTime?: string;
  receiveCardAddressId?: number;
  registerType?: RegisterType;
  expDepartmentIds?: number[];
  wishDepartmentIds?: number;
  otherStartAddress?: UpsertAddressDto;
  otherLeaveAddress?: UpsertAddressDto;
};
