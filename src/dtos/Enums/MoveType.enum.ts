/* eslint-disable @typescript-eslint/no-namespace */
export enum MoveType {
  WithCTN = '0',
  ByPlane = '1',
  Other = '2',
}

export namespace MoveType {
  export function toString(type: string): string {
    switch (type) {
      case MoveType.WithCTN:
        return 'Đi cùng CTN';
      case MoveType.ByPlane:
        return 'Máy Bay';
      case MoveType.Other:
        return 'Tự Túc';
      default:
        return '';
    }
  }
  export function getList() {
    const types = Object.keys(MoveType).map((item) => item as MoveType);
    const result = types.map((i) => {
      return {
        value: i,
        label: toString(i),
      };
    });
    return result;
  }
}
