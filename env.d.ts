/// <reference types="vite/client" />
interface ImportMetaEnv extends ImportMetaEnv {
  // more env variables...
  TTPQ_BASE_URL: string;
  TTPQ_NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
