/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STUDENT_EMAIL_DOMAIN: string;
  readonly VITE_TEACHER_EMAIL_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
