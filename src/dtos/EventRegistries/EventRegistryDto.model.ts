import { NamedTimeDto } from './../NamedTimes/NamedTimeDto.model';
import { StartTimeDto } from '../StartTimes/StartTimeDto.model';
import { LeaveTimeDto } from '../TimeToLeaves/LeaveTimeDto.model';
import { ReceiveCardAddressDto } from '../ReceiveCardLocations/ReceiveCardAddressDto.model';
import { PrintStatus } from '../Enums/PrintStatus.enum';
import { ReceiveCardStatus } from '../Enums/ReceiveCardStatus.enum';
import { PositionType } from '../Enums/PositionType.enum';
import { RegisterRole } from '../Enums/RegisterRole.enum';
import { ContactStatusType } from '../Enums/ContactStatusType.enum';
import { MoveType } from '../Enums/MoveType.enum';
import { DepartmentDto } from '../Departments/DepartmentDto.model';
import { RegisterType } from '../Enums/RegisterType.enum';
import { EventRegistryPageDto } from '../EventRegistryPages/EventRegistryPageDto.model';
import { MemberDto } from '../Members/MemberDto.model';
import { DepartmentDetailDto } from '../DepartmentDetails/DepartmentDetailDto.model';
import { AreaDto } from '../Areas/AreaDto.model';
import { EventDto } from '../EventDto.model';
import { GroupDto } from '../Groups/GroupDto.model';
import { CarBookingType } from '../Enums/CarBookingType.enum';
import { StatusType } from '../Enums/StatusType.enum';
import { ClothingSize } from '../Enums/ClothingSize.enum';

export type EventRegistryDto = {
  registerGroup?: string;
  id: string;
  memberId: string;
  eventId: number;
  code?: string;
  note?: string;
  question?: string;
  companyNameEN?: string;
  startPlaneCode?: string;
  companyNameVIE?: string;
  returnPlaneCode?: string;
  otherStartAddress?: string;
  otherLeaveAddress?: string;
  eventRegistryPageId?: string;
  area?: AreaDto;
  isArrived: boolean;
  certificateRegistry: boolean;
  event?: EventDto;
  group?: GroupDto;
  moveType: MoveType;
  returnMoveType: MoveType;
  member?: MemberDto;
  areaId?: number;
  endDate?: string;
  groupId?: number;
  position?: PositionType;
  leaderId?: string;
  startDate?: string;
  arrivedAt?: string;
  startTimeId?: number;
  leaveTimeId?: number;
  printStatus?: PrintStatus;
  registerRole?: RegisterRole;
  assignStatus?: StatusType;
  clothingSize?: ClothingSize;
  otherStartTime?: string;
  otherLeaveTime?: string;
  carBookingType?: CarBookingType;
  receiveCardStatus?: ReceiveCardStatus;
  departmentDetailId?: number;
  receiveCardAddressId?: number;
  startTime?: StartTimeDto;
  leaveTime?: LeaveTimeDto;
  registerType: RegisterType;
  expDepartments: DepartmentDto[];
  wishDepartment?: DepartmentDto;
  leader?: EventRegistryDto;
  contactStatus: ContactStatusType;
  departmentDetail?: DepartmentDetailDto;
  eventRegistryPage?: EventRegistryPageDto;
  receiveCardAddress?: ReceiveCardAddressDto;
  registeredDays?: NamedTimeDto[];
  registeredDayIds?: number[];
};
