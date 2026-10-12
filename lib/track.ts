/**
 * Analytics hook for the events the handoff recommends tracking. Pushes to
 * window.dataLayer (Google Tag Manager convention) and emits a DOM event, so
 * any analytics tool can subscribe without touching components.
 */
export type TrackEvent =
  | { event: 'download_click'; store: 'google_play' | 'app_store'; section: string }
  | { event: 'category_select'; categoryId: string }
  | { event: 'ranking_select'; mode: string; categoryId: string }
  | { event: 'quote_select'; quoteId: string }
  | { event: 'faq_open'; faqId: string }
  | { event: 'language_switch'; to: string }
  | { event: 'demo_quote'; store: string | null; sample: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(e: TrackEvent) {
  if (typeof window === 'undefined') return;
  (window.dataLayer ??= []).push(e);
  window.dispatchEvent(new CustomEvent('globalbuy:track', { detail: e }));
}
