/* eslint-disable @typescript-eslint/no-namespace */
export enum CarBookingType {
  Go = '0',
  Return = '1',
  Both = '2',
  ByYourSelf = '3',
}

export namespace CarBookingType {
  export function toString(type: string): string {
    switch (type) {
      case CarBookingType.Go:
        return 'Chiều đi';
      case CarBookingType.Return:
        return 'Chiều về';
      case CarBookingType.Both:
        return 'Cả 2 chiều';
      case CarBookingType.ByYourSelf:
        return 'Tự túc';
      default:
        return '';
    }
  }
  export function getList() {
    const types = Object.keys(CarBookingType).map((item) => item as CarBookingType);
    const result = types.map((i) => {
      return {
        value: i,
        label: toString(i),
      };
    });
    return result;
  }
}
