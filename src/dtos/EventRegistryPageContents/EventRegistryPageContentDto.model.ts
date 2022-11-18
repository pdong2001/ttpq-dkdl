import { EventDto } from '../EventDto.model';

export type EventRegistryPageContentDto = {
  id: number;
  eventId: number;
  image?: string;
  header?: string;
  content?: string;
  shortContent?: string;
  isDefault: boolean;
  event?: EventDto;
  images?: any;
};
