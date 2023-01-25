/* eslint-disable @typescript-eslint/no-namespace */
export enum InfoStatus {
  NotChecked = 0,
  IncorrectInfo = 1,
  Verified = 2,
}

export namespace InfoStatus {
  export function toString(status: InfoStatus) {
    switch (status) {
      case InfoStatus.NotChecked:
        return 'Chưa kiểm tra';
      case InfoStatus.IncorrectInfo:
        return 'Sai thông tin';
      case InfoStatus.Verified:
        return 'Đã kiểm tra';
      default:
        return 'Chưa kiểm tra';
    }
  }

  export function toList() {
    const types = Object.keys(InfoStatus)
      .map((k) => Number(k))
      .filter((i) => !isNaN(i));

    return types.map((i) => {
      return {
        value: i,
        label: InfoStatus.toString(i),
      };
    });
  }
}
