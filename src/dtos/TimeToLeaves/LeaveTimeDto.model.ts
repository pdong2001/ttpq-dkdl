import { LeaveAddressDto } from '../LeaveAddresses/LeaveAddressDto.model';

export type LeaveTimeDto = {
  id: number;
  addressId: number;
  note: string | undefined;
  name: string | undefined;
  time: Date;
  address: LeaveAddressDto | undefined;
};
