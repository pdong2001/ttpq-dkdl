import { Gender } from "../Enums/Gender.enum";
import { EventExp } from "../Enums/EventExp.enum";
import { PhanLoaiThanhNien } from "../Enums/PhanLoaiThanhNien.enum";
import { UpSertEventRegistryDto } from "../EventRegistries/UpSertEventRegistryDto.model";
import { AddressDto } from '~/dtos/Addresses/AddressDto.model';

export type UpSertMemberDto = {
	work?: string;
	email: string;
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
	dateOfBirth?: string;
	organizationStructureId?: number;
	strongPointIds?: number[];
	permanentAddress?: AddressDto;
	temporaryAddress?: AddressDto;
	register: UpSertEventRegistryDto;
}