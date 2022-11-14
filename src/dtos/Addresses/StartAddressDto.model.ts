import { StartTimeDto } from '../StartTimes/StartTimeDto.model';

export type StartAddressDto = {
  id: number;
  wardId: number;
  eventId: number;
  provinceId: number;
  districtId: number;
  name: string | undefined;
  address: string | undefined;
  description: string | undefined;
  times: StartTimeDto[] | undefined;
};
