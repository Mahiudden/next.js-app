type ProgressiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

export default function ProgressiveImage({ 
  src, 
  alt, 
  className, 
  sizes,
  priority = false,
  onError 
}: ProgressiveImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      sizes={sizes}
      onError={onError}
    />
  );
}
