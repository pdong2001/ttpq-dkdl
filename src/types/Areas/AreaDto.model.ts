import { DepartmentDetailDto } from '../DepartmentDetails/DepartmentDetailDto.model';
import { GroupDto } from '../Groups/Group.dto';

export class AreaDto {
  id = 0;
  actualQuantity = 0;
  departmentDetailId = 0;
  name: string | null = null;
  requiredQuantity: number | null = null;
  groups: GroupDto[] | null = [];
  departmentDetail: DepartmentDetailDto | null = null;
}
