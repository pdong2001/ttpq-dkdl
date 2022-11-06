import { AreaDto } from '../Areas/AreaDto.model';
import { DepartmentDetailDto } from '../DepartmentDetails/DepartmentDetailDto.model';
import { GreatCeremonyDto } from '../GreatCeremonyDto.dto';
import { MemberResponseDto } from '../Members/MemberResponse.dto';

export class GroupDto {
  id = 0;
  greatCeremonyId = 0;
  name: string | null = null;
  code: string | null = null;
  note: string | null = null;
  description: string | null = null;
  area: AreaDto | null = null;
  leader: MemberResponseDto | null = null;
  areaId: number | null = null;
  departmentDetailId: number | null = null;
  members: MemberResponseDto[] | null = [];
  greatCeremony: GreatCeremonyDto | null = null;
  departmentDetail: DepartmentDetailDto | null = null;
}
