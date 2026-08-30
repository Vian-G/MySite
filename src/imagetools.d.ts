declare module '*.jpg?format=webp&w=1280&quality=82' {
  const src: string;
  export default src;
}

declare module '*.jpg?format=webp&w=640;960;1280&quality=82&as=srcset' {
  const srcSet: string;
  export default srcSet;
}
