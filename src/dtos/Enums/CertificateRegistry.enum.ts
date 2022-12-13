/* eslint-disable @typescript-eslint/no-namespace */
export enum CertificateRegistry {
  NO = '0',
  YES = '1',
}

export namespace CertificateRegistry {
  export function toBoolean(value: string) {
    return value === CertificateRegistry.YES;
  }
  export function toEnum(value: boolean) {
    return value ? CertificateRegistry.YES : CertificateRegistry.NO;
  }
  export function toString(value: boolean): string {
    return value ? 'Có' : 'Không';
  }
}
