import { EventDto } from './../EventDto.model';

export interface NamedTimeDto {
  id: number;
  name?: string;
  description?: string;
  time: Date;
  event?: EventDto;
  eventId?: number;
}
