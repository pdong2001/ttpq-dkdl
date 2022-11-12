import { UpSertAddressDto } from '../UpSertAddressDto.model';
import { UpSertStartTimeDto } from '../StartTimes/UpSertStartTimeDto.model';

export type UpSertStartAddressDto = {
  eventId: number;
  name: string | undefined;
  description: string | undefined;
  times: UpSertStartTimeDto[] | undefined;
  address: UpSertAddressDto | undefined;
};
