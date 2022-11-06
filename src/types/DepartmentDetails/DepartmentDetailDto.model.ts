import { StatusType } from '../Enums/StatusType.enum';
import { DepartmentResponse } from '../Departments/DepartmentResponse.model';
import { GreatCeremonyDto } from '../GreatCeremonyDto.dto';
import { AreaDto } from '../Areas/AreaDto.model';
import { GroupDto } from '../Groups/Group.dto';

export class DepartmentDetailDto {
  id = 0;
  actualQuantity = 0;
  greatCeremonyId = 0;
  note: string | null = null;
  description: string | null = null;
  statusId: StatusType = 0;
  departmentId: number | null = null;
  requireQuantity: number | null = null;
  areas: AreaDto[] | null = [];
  groups: GroupDto[] | null = [];
  greatCeremony: GreatCeremonyDto | null = null;
  department: DepartmentResponse | null = null;
}
