import { JoinCTN } from './../Enums/JoinCTNType.enum';
import { Gender } from '../Enums/Gender.enum';
import { UpSertAddressDto } from '../UpSertAddressDto.model';
import { EventExp } from '../Enums/EventExp.enum';
import { PhanLoaiThanhNien } from '../Enums/PhanLoaiThanhNien.enum';
import { UpSertEventRegistryDto } from '../EventRegistries/UpSertEventRegistryDto.model';

export type UpSertMemberDto = {
  work?: string;
  email?: string;
  gender?: Gender;
  fullName?: string;
  avatarPath?: string;
  phoneNumber: string;
  identityCard: string;
  religiousName?: string;
  facebookAddress?: string;
  identityCardImagePath?: string;
  exps?: EventExp;
  ctnType?: PhanLoaiThanhNien;
  dateOfBirth?: string;
  ctnId?: number;
  JoinedCtn: JoinCTN;
  strongPointIds?: number[];
  permanentAddress?: UpSertAddressDto;
  temporaryAddress?: UpSertAddressDto;
  register: UpSertEventRegistryDto;
};
