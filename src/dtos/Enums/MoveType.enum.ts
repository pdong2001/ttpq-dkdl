/* eslint-disable @typescript-eslint/no-namespace */
export enum MoveType {
  WithCTN = '0',
  ByPlane = '1',
  Other = '2',
}

export namespace MoveType {
  export function toString(moveType: string) {
    switch (moveType) {
      case MoveType.WithCTN:
        return 'Đi cùng xe CTN';
      case MoveType.ByPlane:
        return 'Máy bay';
      case MoveType.Other:
        return 'Tự túc';
      default:
        return '';
    }
  }
}
