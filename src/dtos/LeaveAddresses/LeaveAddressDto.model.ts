import { LeaveTimeDto } from '../TimeToLeaves/LeaveTimeDto.model';

export type LeaveAddressDto = {
  id: number;
  wardId: number;
  eventId: number;
  provinceId: number;
  districtId: number;
  name?: string;
  address?: string;
  description?: string;
  times?: LeaveTimeDto[];
};
