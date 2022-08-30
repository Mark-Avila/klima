/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KLIMA: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
