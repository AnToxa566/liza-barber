'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiTimeLine } from 'react-icons/ri';
import { BookButton } from '@/components/ui/BookButton';

export type ServiceItem = {
  name: string;
  desc: string;
  price: string;
  duration: string;
  thumbnail?: string;
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

// 1×1 light-gray GIF — shown while service images are loading on first visit
const BLUR_DATA_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export function ServicesTabs({ categories, bookThis }: Props) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? '');

  useEffect(() => {
    if (categories.length && !categories.find(c => c.id === activeId)) {
      setActiveId(categories[0].id);
    }
  }, [categories, activeId]);

  if (!categories.length) return null;

  return (
    <div className="svc__tabbed">
      <div className="svc__tabs" role="tablist">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            id={`tab-${c.id}`}
            className="svc__tab"
            aria-controls={`panel-${c.id}`}
            aria-selected={c.id === activeId}
            data-on={c.id === activeId ? '1' : '0'}
            onClick={() => setActiveId(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {categories.map((c) => (
        <div
          key={c.id}
          id={`panel-${c.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${c.id}`}
          className="svc__grid svc__grid--photo"
          hidden={c.id !== activeId}
        >
          {c.items.map((svc, i) => (
            <article key={i} className="svc-card svc-card--photo">
              <div className="svc-card__media">
                {svc.thumbnail && (
                  <Image
                    width={600}
                    height={450}
                    alt={svc.name}
                    src={svc.thumbnail}
                    loading="eager"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
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
      ))}
    </div>
  );
}
