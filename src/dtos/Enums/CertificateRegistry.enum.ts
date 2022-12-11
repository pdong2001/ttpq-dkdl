// /* eslint-disable @typescript-eslint/no-namespace */
export enum CertificateRegistry {
  NO = '0',
  YES = '1',
}

export namespace CertificateRegistry {
  export function toBoolean(type: CertificateRegistry): boolean {
    if (type == CertificateRegistry.YES) {
      return true;
    }
    return false;
  }

  export function toEnumString(type: boolean): CertificateRegistry {
    if (type) {
      return CertificateRegistry.YES;
    }
    return CertificateRegistry.NO;
  }
}
