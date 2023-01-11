import { EventType } from './event/EventType.enum';
import { NamedTimeDto } from './NamedTimes/NamedTimeDto.model';
export type EventDto = {
  id: number;
  wardId: number;
  provinceId: number;
  districtId: number;
  name?: string;
  place?: string;
  endDate?: string;
  startDate?: string;
  days?: NamedTimeDto[];
  type: EventType;
};
