'use client';

import { useEffect, useState } from 'react';
import { track } from '@/lib/track';

type Props = {
  links: { googlePlay: string; appStore: string | null };
  section: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * "Get the app" that goes straight to the right store on Android and iOS,
 * and to the download section everywhere else (and before hydration, and on
 * iOS until the App Store link exists, where the badge says "coming soon").
 */
export function GetAppLink({ links, section, className, children }: Props) {
  const [target, setTarget] = useState<{ href: string; store: 'google_play' | 'app_store' | null }>({
    href: '#download',
    store: null,
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setTarget({ href: links.googlePlay, store: 'google_play' });
    else if (links.appStore && /iphone|ipad|ipod/i.test(ua)) setTarget({ href: links.appStore!, store: 'app_store' });
  }, [links.googlePlay, links.appStore]);

  return (
    <a
      className={className}
      href={target.href}
      {...(target.store ? { target: '_blank', rel: 'noopener' } : {})}
      onClick={() => {
        if (target.store) track({ event: 'download_click', store: target.store, section });
      }}
    >
      {children}
    </a>
  );
}
