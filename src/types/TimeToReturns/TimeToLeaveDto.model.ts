import { GreatCeremonyDto } from '../GreatCeremonyDto.dto';
import { AddressResponse } from '../AddressResponse.dto';

export class TimeToLeaveDto {
  id = 0;
  greatCeremonyId = 0;
  name: string | null = null;
  time: string | null = null;
  diaChiXa: AddressResponse | null = null;
  diaChiTinh: AddressResponse | null = null;
  diaChiHuyen: AddressResponse | null = null;
  greatCeremony: GreatCeremonyDto | null = null;
}
