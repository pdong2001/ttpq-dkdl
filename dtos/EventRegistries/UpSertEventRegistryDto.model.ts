import { UpSertAddressDto } from "../UpSertAddressDto.model";
import { MoveType } from "../Enums/MoveType.enum";
import { PositionType } from "../Enums/PositionType.enum";
import { RegisterRole } from "../Enums/RegisterRole.enum";
import { RegisterType } from "../Enums/RegisterType.enum";

export type UpSertEventRegistryDto = {
	memberId : string;
	eventId : number;
	note : string | undefined;
	startPlaneCode : string | undefined;
	returnPlaneCode : string | undefined;
	eventRegistryPageId : string | undefined;
	moveType : MoveType;
	endDate : string | undefined;
	position : PositionType | undefined;
	leaderId : string | undefined;
	startDate : string | undefined;
	startTimeId : number | undefined;
	leaveTimeId : number | undefined;
	registerRole : RegisterRole | undefined;
	otherStartTime : string | undefined;
	otherLeaveTime : string | undefined;
	receiveCardAddressId : number | undefined;
	registerType : RegisterType;
	expDepartmentIds : number[];
	wishDepartmentIds : number;
	otherStartAddress : UpSertAddressDto | undefined;
	otherLeaveAddress : UpSertAddressDto | undefined;
}