import { AddressDto } from '../AddressDto.model';

export type ReceiveCardAddressDto = {
  id: number;
  eventId: number;
  name: string | undefined;
  address: string | undefined;
  description: string | undefined;
  province: AddressDto;
  district: AddressDto;
  ward: AddressDto;
};
