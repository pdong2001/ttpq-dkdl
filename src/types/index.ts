export type AllKeys<T> = T extends any ? keyof T : never;
export type CommonKeys<T extends object> = keyof T;
export type Subtract<A, C> = A extends C ? never : A;
export type NonCommonKeys<T extends object> = Subtract<AllKeys<T>, CommonKeys<T>>;
