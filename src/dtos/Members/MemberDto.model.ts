import { Gender } from '../Enums/Gender.enum';
import { SkillForRegisterDto } from '../SkillForRegisters/SkillForRegisterDto.model';
import { EventExp } from '../Enums/EventExp.enum';
import { PhanLoaiThanhNien } from '../Enums/PhanLoaiThanhNien.enum';
import { UpsertAddressDto } from '~/dtos/Addresses/UpsertAddressDto.model';
import { UpSertEventRegistryDto } from '../EventRegistries/UpSertEventRegistryDto.model';
import { AddressDto } from '../Addresses/AddressDto.model';
import { CustomDate } from '../Date/CustomDate';



export type MemberDto = {
  id?: string;
  work?: string;
  email?: string;
  gender: Gender;
  fullName: string;
  avatarPath?: string;
  phoneNumber: string;
  identityCard: string;
  religiousName?: string;
  facebookAddress?: string;
  identityCardImagePath?: string;
  exps?: EventExp;
  ctnType?: PhanLoaiThanhNien;
  dateOfBirth?: Date;
  permanentWard?: AddressDto;
  temporaryWard?: AddressDto;
  permanentProvince?: AddressDto;
  permanentDistrict?: AddressDto;
  temporaryProvince?: AddressDto;
  temporaryDistrict?: AddressDto;
  strongPoints?: SkillForRegisterDto[];

  dob?: CustomDate;
  organizationStructureId?: number;
  strongPointIds?: number[];
  permanentAddress?: UpsertAddressDto;
  temporaryAddress?: UpsertAddressDto;
  register: UpSertEventRegistryDto;
};
