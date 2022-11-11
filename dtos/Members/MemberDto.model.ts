import { Gender } from "../Enums/Gender.enum";
import { SkillForRegisterDto } from "../SkillForRegisters/SkillForRegisterDto.model";
import { EventExp } from "../Enums/EventExp.enum";
import { PhanLoaiThanhNien } from "../Enums/PhanLoaiThanhNien.enum";
import { UpSertAddressDto } from "dtos/UpSertAddressDto.model";

export type MemberDto = {
	id : string;
	work : string | undefined;
	email : string | undefined;
	gender : Gender;
	fullName : string | undefined;
	avatarPath : string | undefined;
	phoneNumber : string | undefined;
	identityCard : string | undefined;
	religiousName : string | undefined;
	facebookAddress : string | undefined;
	identityCardImagePath : string | undefined;
	exps : EventExp;
	ctnType : PhanLoaiThanhNien | undefined;
	dateOfBirth : Date | undefined;
	permanentAddress : UpSertAddressDto | undefined;
	temporaryAddress : UpSertAddressDto | undefined;
	organizationStructureId : number | undefined;
	strongPoints : SkillForRegisterDto[] | undefined;
}