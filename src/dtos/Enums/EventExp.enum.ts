/* eslint-disable @typescript-eslint/no-namespace */
export enum EventExp {
  ChuaTungThamGia = '0',
  Duoi3Lan = '1',
  Tren3Lan = '2',
}

export namespace EventExp {
  export function toString(exps: string) {
    switch (exps) {
      case EventExp.ChuaTungThamGia:
        return 'Lần đầu tham gia';
      case EventExp.Duoi3Lan:
        return 'Dưới 3 lần';
      case EventExp.Tren3Lan:
        return 'Trên 3 lần';
      default:
        return 'Lần đầu tham gia';
    }
  }
}
