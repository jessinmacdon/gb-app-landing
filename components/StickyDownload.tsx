'use client';

import { useEffect, useState } from 'react';
import { GetAppLink } from '@/components/GetAppLink';

type Props = { links: { googlePlay: string; appStore: string }; label: string; hint: string };

/**
 * Phone-only download bar within thumb reach. It appears once the hero's own
 * badges have scrolled away and steps aside when the download section arrives.
 */
export function StickyDownload({ links, label, hint }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById('top');
      const download = document.getElementById('download');
      const heroGone = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const reachedEnd = download ? download.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(heroGone && !reachedEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="sticky-dl" data-visible={visible} inert={!visible}>
      <span className="sticky-dl__hint">{hint}</span>
      <GetAppLink className="sticky-dl__btn" links={links} section="sticky-bar">
        {label}
      </GetAppLink>
    </div>
  );
}
