import { RegisterRole } from "../Enums/RegisterRole.enum";

export type ShortRegisterDto = {
	id : string;
	fullName : string | undefined;
	avatarPath : string | undefined;
	phoneNumber : string | undefined;
	religiousName : string | undefined;
	leaderId : string | undefined;
	role : RegisterRole;
}