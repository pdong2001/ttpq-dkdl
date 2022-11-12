import { ScopeType } from "../Enums/ScopeType.enum";
import { DepartmentDto } from "../Departments/DepartmentDto.model";

export type EventRegistryPageDto = {
	eventId?: number;
	id?: string;
	name?: string;
	end?: string;
	start?: string;
	type?: ScopeType;
	ctnId?: number;
	pageContentId?: number;
	departments?: DepartmentDto[];
	departmentIds?: number[];
}