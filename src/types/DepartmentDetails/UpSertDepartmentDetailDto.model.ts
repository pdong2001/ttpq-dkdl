import { StatusType } from "../Enums/StatusType.enum";

export class UpSertDepartmentDetailDto {
	actualQuantity : number = 0;
	greatCeremonyId : number = 0;
	note : string | null = null;
	description : string | null = null;
	statusId : StatusType = 0;
	departmentId : number | null = null;
	requireQuantity : number | null = null;
}