import { StatusType } from '../Enums/StatusType.enum';

export type DepartmentDetailDto = {
  id: number;
  eventId: number;
  actualQuantity: number;
  note: string | undefined;
  description: string | undefined;
  statusId: StatusType;
  departmentId: number | undefined;
  requiredQuantity: number | undefined;
};
