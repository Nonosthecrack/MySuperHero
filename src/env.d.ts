/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPERHERO_API_KEY?: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
