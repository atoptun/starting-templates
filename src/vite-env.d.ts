/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'postcss-sort-media-queries';

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module 'virtual:svg-sprite' {
  const content: string;
  export default content;
}

declare module 'virtual:icons-sprite' {
  const content: string;
  export default content;
}

declare module 'virtual:file-icons-sprite' {
  const content: string;
  export default content;
}

