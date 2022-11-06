import { AddressResponse } from '../AddressResponse.dto';
import { GreatCeremonyDto } from '../GreatCeremonyDto.dto';

export class TimeToStartDto {
  id = 0;
  greatCeremonyId = 0;
  name: string | null = null;
  address: string | null = null;
  time: string | null = null;
  diaChiXa: AddressResponse | null = null;
  diaChiTinh: AddressResponse | null = null;
  diaChiHuyen: AddressResponse | null = null;
  greatCeremony: GreatCeremonyDto | null = null;
}
