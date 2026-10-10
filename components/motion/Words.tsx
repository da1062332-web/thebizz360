import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * Splits a phrase into word masks for staggered reveals.
 * Real spaces are kept between words, so copy, search and screen readers see normal text.
 * Pass `render` to decorate a specific word (e.g. a hand-drawn underline).
 */
export function Words({
  text,
  offset = 0,
  render,
}: {
  text: string;
  offset?: number;
  render?: (word: string, i: number) => ReactNode;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="w">
            <span style={{ "--i": i + offset } as CSSProperties}>{render ? render(w, i) : w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** Inline style helper for motion delays and custom properties. */
export const m = (vars: Record<string, string | number>) => vars as CSSProperties;
