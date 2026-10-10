type Props = { className?: string; inverse?: boolean };

/**
 * Pre-rendered heights of the brand mark (see scripts/build-images.mjs), mapped to their widths.
 * Each height ships at 1x/2x/3x so the browser never rescales the artwork, which keeps it sharp.
 */
const MARK_HEIGHTS = { 44: 36, 56: 45 } as const;

/** Brand mark: the "b" with buildings and growth arrow (built from assets/brand/logo-source.png). */
export function Mark({ height = 44 }: { height?: keyof typeof MARK_HEIGHTS }) {
  const src = (d: number) => `/brand/logo-mark-${height * d}.png`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="logo__mark"
      src={src(1)}
      srcSet={`${src(1)} 1x, ${src(2)} 2x, ${src(3)} 3x`}
      width={MARK_HEIGHTS[height]}
      height={height}
      // Exact pixel box: overrides the global `img { height: auto }` so the artwork is never resampled.
      style={{ width: MARK_HEIGHTS[height], height }}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}

export function Logo({ className, inverse }: Props) {
  return (
    <span className={`logo ${inverse ? "logo--inverse" : ""} ${className ?? ""}`}>
      <Mark height={inverse ? 56 : 44} />
      <span className="logo__word">
        thebizz<span className="logo__num">360</span>
      </span>
    </span>
  );
}
