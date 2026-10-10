import type { CSSProperties } from "react";
import type { ImageAsset } from "@/lib/images";

type Props = {
  img: ImageAsset;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Pass "" for purely decorative use next to an equivalent text description. */
  alt?: string;
  /** Motion role(s), see app/motion.css (e.g. "zoom"). */
  motion?: string;
  style?: CSSProperties;
};

/** Responsive <img> with intrinsic dimensions to prevent layout shift. */
export function Pic({ img, sizes, className, priority = false, alt, motion, style }: Props) {
  const srcSet = img.widths.map((w) => `${img.base}-${w}.webp ${w}w`).join(", ");
  const largest = img.widths[img.widths.length - 1];
  return (
    <img
      className={className}
      data-m={motion}
      style={style}
      src={`${img.base}-${largest}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt ?? img.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
    />
  );
}
