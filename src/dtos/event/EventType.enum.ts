/* eslint-disable @typescript-eslint/no-namespace */
export enum EventType {
  DaiLe = 0,
  Tet = 1,
  CCHN = 2,
  KhoaThien = 3,
}
export namespace EventType {
  export function toString(type: number): string {
    switch (type) {
      case EventType.DaiLe:
        return 'Đại lễ';
      case EventType.Tet:
        return 'Tết';
      case EventType.CCHN:
        return 'Công quả hằng ngày';
      case EventType.KhoaThien:
        return 'Công quả khóa thiền';
      default:
        return '';
    }
  }

  export function toList() {
    const types = Object.keys(EventType)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));
    return types.map((i) => {
      return {
        value: i,
        label: EventType.toString(i),
      };
    });
  }
}
