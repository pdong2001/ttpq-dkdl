export type LoginDTO = {
  Code: number;
  Permission: Array<{ Ma: string }>;
  Token: string;
  Message: string;
  Success: boolean;
};
