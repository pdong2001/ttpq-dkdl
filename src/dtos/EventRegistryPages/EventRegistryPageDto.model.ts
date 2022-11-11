import { ScopeType } from "../Enums/ScopeType.enum";
import { DepartmentDto } from "../Departments/DepartmentDto.model";

export type EventRegistryPageDto = {
	eventId : number;
	id : string | undefined;
	name : string | undefined;
	end : string;
	start : string;
	type : ScopeType;
	ctnId : number | undefined;
	pageContentId : number | undefined;
	departments : DepartmentDto[] | undefined;
	departmentIds : number[];
}