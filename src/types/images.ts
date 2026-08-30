export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}

export type ImageSource = string | ResponsiveImage;

export function imageAttributes(image: ImageSource) {
  return typeof image === 'string'
    ? { src: image }
    : { src: image.src, srcSet: image.srcSet, sizes: image.sizes };
}
