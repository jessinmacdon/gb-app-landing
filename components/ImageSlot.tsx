'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string | null;
  alt: string;
  /** Sizing/shape of the slot (width, height, radius, layout). */
  className: string;
  /**
   * What to show when there is no image, or it fails to load: a stand-in such
   * as a store monogram, or nothing (null), which collapses the slot entirely.
   */
  fallback: React.ReactNode;
  /** Passed to next/image for responsive srcset selection. */
  sizes: string;
  priority?: boolean;
};

/**
 * Every photo on the page goes through this. Without a real image the layout
 * never shows an empty frame: it renders the fallback or nothing at all.
 */
export function ImageSlot({ src, alt, className, fallback, sizes, priority }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

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

/** Text stand-in for a missing image, e.g. a store monogram. */
export function Monogram({ text, className }: { text: string; className: string }) {
  return (
    <span className={`monogram ${className}`} aria-hidden="true">
      {text}
    </span>
  );
}
