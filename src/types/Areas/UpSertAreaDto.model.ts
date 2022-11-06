import { GroupDto } from '../Groups/Group.dto';

export class UpSertAreaDto {
  departmentDetailId = 0;
  name: string | null = null;
  requiredQuantity: number | null = null;
  groups: GroupDto[] | null = [];
}
