'use client';

import { useState, useEffect } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import { Placeholder } from '@/components/ui/Placeholder';
import { BookButton } from '@/components/ui/BookButton';

type Tone = 'light' | 'mid' | 'dark' | 'warm';
type Kind = 'portrait' | 'scissors' | 'comb' | 'razor' | 'studio' | 'beard';

const SVC_KINDS: Kind[] = ['scissors', 'beard', 'razor', 'comb', 'razor', 'studio'];
const SVC_TONES: Tone[] = ['light', 'warm', 'mid', 'light', 'dark', 'warm'];

export type ServiceItem = {
  name: string;
  desc: string;
  price: string;
  duration: string;
  bookingUrl?: string;
};

export type Category = {
  id: string;
  label: string;
  items: ServiceItem[];
};

type Props = {
  categories: Category[];
  bookThis: string;
};

export function ServicesTabs({ categories, bookThis }: Props) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? '');

  useEffect(() => {
    if (categories.length && !categories.find(c => c.id === activeId)) {
      setActiveId(categories[0].id);
    }
  }, [categories, activeId]);

  const current = categories.find(c => c.id === activeId) ?? categories[0];
  if (!current) return null;

  return (
    <div className="svc__tabbed">
      <div className="svc__tabs" role="tablist">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === current.id}
            data-on={c.id === current.id ? '1' : '0'}
            className="svc__tab"
            onClick={() => setActiveId(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="svc__grid svc__grid--photo">
        {current.items.map((svc, i) => (
          <article key={i} className="svc-card svc-card--photo">
            <div className="svc-card__media">
              <Placeholder
                kind={SVC_KINDS[i % SVC_KINDS.length]}
                tone={SVC_TONES[i % SVC_TONES.length]}
                caption={`Service · ${String(i + 1).padStart(2, '0')}`}
                style={{ width: '100%', aspectRatio: '4/3' }}
              />
            </div>
            <div className="svc-card__body">
              <div className="svc-card__topline">
                <h3 className="h3">{svc.name}</h3>
                <span className="svc-card__price">{svc.price}</span>
              </div>
              <div className="svc-card__meta"><RiTimeLine size={12} /> {svc.duration}</div>
              <p className="svc-card__desc">{svc.desc}</p>
              <BookButton type="button" className="btn btn--outline" url={svc.bookingUrl}>
                {bookThis}
              </BookButton>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
