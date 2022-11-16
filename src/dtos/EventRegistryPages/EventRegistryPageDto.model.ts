import { ScopeType } from '../Enums/ScopeType.enum';
import { DepartmentDto } from '../Departments/DepartmentDto.model';
import { EventDto } from '../EventDto.model';

export type EventRegistryPageDto = {
  eventId?: number;
  event: EventDto;
  id?: string;
  name?: string;
  end?: string;
  start?: string;
  type?: ScopeType;
  ctnId?: number;
  pageContentId?: number;
  departments?: DepartmentDto[];
  departmentIds?: number[];
};
