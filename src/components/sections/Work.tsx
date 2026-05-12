'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Placeholder } from '@/components/ui/Placeholder';

type Tone = 'light' | 'mid' | 'dark' | 'warm';
type Kind = 'portrait' | 'scissors' | 'comb' | 'razor' | 'studio' | 'beard';

interface GalItem {
  id: number;
  kind: Kind;
  tone: Tone;
  span: 'tall' | 'wide' | 'sq';
  caption: string;
}

const BA_PAIRS = [
  { id: 1, label: 'Cut + beard combo' },
  { id: 2, label: 'Signature haircut' },
  { id: 3, label: 'Full reset' },
];

const GAL_ITEMS: GalItem[] = [
  { id: 1, kind: 'portrait', tone: 'warm', span: 'tall', caption: 'Studio cut · 04' },
  { id: 2, kind: 'beard', tone: 'dark', span: 'wide', caption: 'Beard sculpt · 11' },
  { id: 3, kind: 'scissors', tone: 'light', span: 'sq', caption: 'Tools · 02' },
  { id: 4, kind: 'portrait', tone: 'mid', span: 'sq', caption: 'Fade · 07' },
  { id: 5, kind: 'portrait', tone: 'warm', span: 'tall', caption: 'Long layers · 09' },
  { id: 6, kind: 'studio', tone: 'light', span: 'wide', caption: 'Studio · interior' },
  { id: 7, kind: 'portrait', tone: 'dark', span: 'sq', caption: 'Crop · 13' },
  { id: 8, kind: 'comb', tone: 'mid', span: 'sq', caption: 'Detail · 06' },
  { id: 9, kind: 'portrait', tone: 'warm', span: 'tall', caption: 'Bob · 14' },
];

function IcoChevs() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
    </svg>
  );
}

function BeforeAfterSlider({ pair, index }: { pair: typeof BA_PAIRS[0]; index: number }) {
  const t = useTranslations('work');
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLElement>(null);
  const dragging = useRef(false);

  const onMove = useCallback((clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    onMove(e.clientX);
    const move = (ev: PointerEvent) => { if (dragging.current) onMove(ev.clientX); };
    const up = () => {
      dragging.current = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  return (
    <figure
      ref={ref}
      className="ba__pair ba__pair--slide"
      onPointerDown={onPointerDown}
    >
      <div className="ba__layer ba__layer--before">
        <Placeholder kind="portrait" tone="mid"
          caption={`Before · ${pair.label}`} tag={`0${index + 1} · A`}
          style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="ba__layer ba__layer--after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Placeholder kind="portrait" tone="warm"
          caption={`After · ${pair.label}`} tag={`0${index + 1} · B`}
          style={{ width: '100%', height: '100%' }} />
      </div>
      <span className="ba__lbl ba__lbl--l">{t('before')}</span>
      <span className="ba__lbl ba__lbl--r">{t('after')}</span>
      <div className="ba__handle" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="ba__handle-line" />
        <span className="ba__handle-knob"><IcoChevs /></span>
      </div>
    </figure>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext]);

  const g = items[index];

  return (
    <div className="lb" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="lb__x" onClick={onClose} aria-label="Close">✕</button>
      <button type="button" className="lb__nav lb__nav--l"
        onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button type="button" className="lb__nav lb__nav--r"
        onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
      <figure className="lb__fig" onClick={(e) => e.stopPropagation()}>
        <Placeholder kind={g.kind} tone={g.tone} caption={g.caption}
          tag={`0${index + 1} / ${items.length}`}
          style={{ width: '100%', height: '100%' }} />
      </figure>
      <div className="lb__cap">{g.caption} <span>· {index + 1} / {items.length}</span></div>
    </div>
  );
}

export function Work() {
  const t = useTranslations('work');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function prevItem() {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + GAL_ITEMS.length) % GAL_ITEMS.length));
  }

  function nextItem() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % GAL_ITEMS.length));
  }

  return (
    <section id="work" className="sec sec--work">
      <div className="container">
        <header className="sec__head">
          <span className="kicker">{t('kicker')}</span>
          <h2 className="h2">{t('title')}</h2>
          <p className="sec__sub">{t('sub')}</p>
        </header>

        <div className="ba">
          {BA_PAIRS.map((pair, i) => (
            <BeforeAfterSlider key={pair.id} pair={pair} index={i} />
          ))}
        </div>

        <header className="sec__head sec__head--mt">
          <span className="kicker">{t('galleryKicker')}</span>
          <h2 className="h2">{t('galleryTitle')}</h2>
        </header>

        <div className="gal">
          {GAL_ITEMS.map((g, i) => (
            <button
              key={g.id}
              type="button"
              className={`gal__item gal__item--${g.span}`}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open photo: ${g.caption}`}
            >
              <Placeholder kind={g.kind} tone={g.tone} caption={g.caption} tag={`0${i + 1}`}
                style={{ width: '100%', height: '100%' }} />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={GAL_ITEMS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  );
}
