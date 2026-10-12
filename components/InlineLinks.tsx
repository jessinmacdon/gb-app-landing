import { Fragment } from 'react';

const LINK = /\[([^\]]+)\]\(((?:https?:\/\/|\/|#|mailto:|tel:)[^\s)]+)\)/g;

/**
 * Renders plain text, turning [label](url) into links. Lets CMS editors add
 * links to FAQ answers without allowing arbitrary HTML.
 */
export function InlineLinks({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    const external = /^https?:/.test(href);
    parts.push(
      <a key={i} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
        {label}
      </a>,
    );
    last = i + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
