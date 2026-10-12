/** `href` defaults to the top of the current page; other pages link home. */
export function Logo({ href = '#top' }: { href?: string }) {
  return (
    <a href={href} className="logo" aria-label="GlobalBuy">
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__word">GlobalBuy</span>
    </a>
  );
}
