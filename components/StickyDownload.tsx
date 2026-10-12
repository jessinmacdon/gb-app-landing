'use client';

import { useEffect, useState } from 'react';
import { GetAppLink } from '@/components/GetAppLink';

type Props = { links: { googlePlay: string; appStore: string | null }; label: string; hint: string };

/**
 * Phone-only download bar within thumb reach. It appears once the hero's own
 * badges have scrolled away. It steps aside over the pricing demo (whose
 * receipt has its own button and must not be covered), while the menu is
 * open, and when the download section arrives.
 */
export function StickyDownload({ links, label, hint }: Props) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onMenu = (e: Event) => setMenuOpen((e as CustomEvent<boolean>).detail);
    window.addEventListener('gb:menu', onMenu);
    return () => window.removeEventListener('gb:menu', onMenu);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById('top');
      const download = document.getElementById('download');
      const pricing = document.getElementById('pricing')?.getBoundingClientRect();
      const overPricing = pricing ? pricing.top < window.innerHeight && pricing.bottom > 0 : false;
      const heroGone = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const reachedEnd = download ? download.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(heroGone && !reachedEnd && !overPricing);
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

  const shown = visible && !menuOpen;
  return (
    <div className="sticky-dl" data-visible={shown} inert={!shown}>
      <span className="sticky-dl__hint">{hint}</span>
      <GetAppLink className="sticky-dl__btn" links={links} section="sticky-bar">
        {label}
      </GetAppLink>
    </div>
  );
}
