'use client';

import { AppleIcon, GooglePlayIcon } from '@/components/Icons';
import type { Dictionary } from '@/lib/content';
import { track } from '@/lib/track';

type Props = {
  links: { googlePlay: string; appStore: string | null };
  badge: Dictionary['badge'];
  /** Section id reported with download clicks. */
  section: string;
};

export function StoreBadges({ links, badge, section }: Props) {
  return (
    <div className="badges">
      <a
        className="badge"
        href={links.googlePlay}
        target="_blank"
        rel="noopener"
        onClick={() => track({ event: 'download_click', store: 'google_play', section })}
      >
        <GooglePlayIcon />
        <span className="badge__text">
          <span className="badge__top">{badge.gpTop}</span>
          <span className="badge__bottom">Google Play</span>
        </span>
      </a>
      {links.appStore ? (
        <a
          className="badge badge--apple"
          href={links.appStore}
          target="_blank"
          rel="noopener"
          onClick={() => track({ event: 'download_click', store: 'app_store', section })}
        >
          <AppleIcon />
          <span className="badge__text">
            <span className="badge__top">{badge.asTop}</span>
            <span className="badge__bottom">{badge.asBottom}</span>
          </span>
        </a>
      ) : (
        // Not a link until the iOS app is live.
        <span className="badge badge--apple badge--soon">
          <AppleIcon />
          <span className="badge__text">
            <span className="badge__top">{badge.asSoon}</span>
            <span className="badge__bottom">{badge.asBottom}</span>
          </span>
        </span>
      )}
    </div>
  );
}
