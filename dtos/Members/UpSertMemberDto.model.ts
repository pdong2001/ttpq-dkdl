import { Gender } from "../Enums/Gender.enum";
import { UpSertAddressDto } from "../UpSertAddressDto.model";
import { EventExp } from "../Enums/EventExp.enum";
import { PhanLoaiThanhNien } from "../Enums/PhanLoaiThanhNien.enum";
import { UpSertEventRegistryDto } from "../EventRegistries/UpSertEventRegistryDto.model";

export type UpSertMemberDto = {
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
	dateOfBirth : string | undefined;
	organizationStructureId : number | undefined;
	strongPointIds : number[];
	permanentAddress : UpSertAddressDto | undefined;
	temporaryAddress : UpSertAddressDto | undefined;
	register : UpSertEventRegistryDto | undefined;
}