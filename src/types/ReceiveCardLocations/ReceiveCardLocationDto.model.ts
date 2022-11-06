import { GreatCeremonyDto } from '../GreatCeremonyDto.dto';
import { AddressResponse } from '../AddressResponse.dto';

export class ReceiveCardLocationDto {
  id = 0;
  name: string | null = null;
  address: string | null = null;
  addressCode: string | null = null;
  diaChiXa: AddressResponse | null = null;
  diaChiTinh: AddressResponse | null = null;
  diaChiHuyen: AddressResponse | null = null;
  greatCeremony: GreatCeremonyDto | null = null;
}
