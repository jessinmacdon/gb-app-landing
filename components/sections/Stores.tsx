import type { Dictionary } from '@/lib/content';

export function Stores({ t, stores }: { t: Dictionary; stores: string[] }) {
  return (
    <section className="stores" aria-label={t.storesLabel}>
      <div className="container stores__inner">
        <span className="stores__label">{t.storesLabel}</span>
        <ul className="stores__list">
          {stores.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
