import { EventRegistryPageContentDto } from './../EventRegistryPageContents/EventRegistryPageContentDto.model';
import { StartAddressDto } from './../Addresses/StartAddressDto.model';
import { LeaveAddressDto } from './../LeaveAddresses/LeaveAddressDto.model';
import { ScopeType } from '../Enums/ScopeType.enum';
import { DepartmentDto } from '../Departments/DepartmentDto.model';
import { EventDto } from '../EventDto.model';

export type EventRegistryPageDto = {
  eventId: number;
  id?: string;
  name?: string;
  end: string;
  start: string;
  event?: EventDto;
  type: ScopeType;
  ctnId?: number;
  pageContentId?: number;
  departments?: DepartmentDto[];
  departmentIds: number[];
  startAddresses?: StartAddressDto[];
  leaveAddresses?: LeaveAddressDto[];
  pageContent?: EventRegistryPageContentDto;
};
