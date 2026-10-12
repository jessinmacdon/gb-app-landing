'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string | null;
  alt: string;
  /** Sizing/shape of the slot (width, height, radius, layout). */
  className: string;
  /** Striped placeholder style used when there is no image or it fails to load. */
  placeholder: 'stripes-dark' | 'stripes-light' | 'stripes-thumb' | 'stripes-avatar';
  /** Explainer text drawn on the placeholder, e.g. "photo". */
  label?: string;
  /** Passed to next/image for responsive srcset selection. */
  sizes: string;
  priority?: boolean;
};

/**
 * Every photo on the page goes through this: a real image when content
 * provides one, otherwise the design's striped placeholder.
 */
export function ImageSlot({ src, alt, className, placeholder, label, sizes, priority }: Props) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <div className={`slot ${className}`}>
        <Image
          className="slot__img"
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`slot ${className} ${placeholder}`}
      {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
    >
      {label ? (
        <span className="slot__label" aria-hidden="true">
          {label}
        </span>
      ) : null}
    </div>
  );
}
