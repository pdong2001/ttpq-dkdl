import { Gender } from "../Enums/Gender.enum";
import { SkillForRegisterDto } from "../SkillForRegisters/SkillForRegisterDto.model";
import { EventExp } from "../Enums/EventExp.enum";
import { PhanLoaiThanhNien } from "../Enums/PhanLoaiThanhNien.enum";
import { AddressDto } from "~/dtos/Addresses/AddressDto.model";

export type MemberDto = {
	id: string;
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
	permanentAddress?: AddressDto;
	temporaryAddress?: AddressDto;
	organizationStructureId?: number;
	strongPoints?: SkillForRegisterDto[];
}