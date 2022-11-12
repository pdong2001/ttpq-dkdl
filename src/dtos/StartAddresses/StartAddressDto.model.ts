import { AddressDto } from "../AddressDto.model";

export type StartAddressDto = {
	id : number;
	wardId : number;
	eventId : number;
	provinceId : number;
	districtId : number;
	name : string | undefined;
	address : string | undefined;
	description : string | undefined;
	ward : AddressDto | undefined;
	province : AddressDto | undefined;
	district : AddressDto | undefined;
}