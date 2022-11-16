import { LeaveAddressDto } from '../LeaveAddresses/LeaveAddressDto.model';

export type LeaveTimeDto = {
  id: number;
  addressId: number;
  note: string | undefined;
  name: string | undefined;
  time: string;
  address: LeaveAddressDto | undefined;
};
