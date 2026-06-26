'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiExpandLeftRightLine, RiInstagramLine } from 'react-icons/ri';

import { Placeholder } from '@/components/ui/Placeholder';
import { INSTAGRAM_URL } from '@/config/socials';

type Tone = 'light' | 'mid' | 'dark' | 'warm';
type Kind = 'portrait' | 'scissors' | 'comb' | 'razor' | 'studio' | 'beard';

interface GalItem {
  id: number;
  kind: Kind;
  image: string;
  span: 'tall' | 'wide' | 'sq';
}

const BA_PAIRS = [
  { id: 1, label: 'Cut + beard combo' },
  { id: 2, label: 'Signature haircut' },
  { id: 3, label: 'Full reset' },
];

const GAL_ITEMS: GalItem[] = [
  { id: 1, kind: 'portrait', span: 'tall', image: '/images/gallery/04.jpeg' },
  { id: 2, kind: 'beard', span: 'wide', image: '/images/gallery/02.jpeg' },
  { id: 3, kind: 'scissors', span: 'sq', image: '/images/gallery/08.png' },
  { id: 4, kind: 'portrait', span: 'sq', image: '/images/gallery/05.png' },
  { id: 5, kind: 'portrait', span: 'tall', image: '/images/gallery/01.jpg' },
  { id: 8, kind: 'comb', span: 'sq', image: '/images/gallery/06.jpg' },
  { id: 6, kind: 'studio', span: 'wide', image: '/images/gallery/09.jpg' },
  { id: 7, kind: 'portrait', span: 'sq', image: '/images/gallery/07.jpg' },
];

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
        <span className="ba__handle-knob"><RiExpandLeftRightLine size={16} /></span>
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
        <RiArrowLeftSLine size={20} />
      </button>
      <button type="button" className="lb__nav lb__nav--r"
        onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <RiArrowRightSLine size={20} />
      </button>
      <figure className="lb__fig" onClick={(e) => e.stopPropagation()}>
        <Image fill sizes="100vw" src={g.image} alt='Gallery image' style={{ 'objectFit': 'cover' }} />
      </figure>
      <div className="lb__cap"><span>{index + 1} / {items.length}</span></div>
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
        {/* <header className="sec__head">
          <span className="kicker">{t('kicker')}</span>
          <h2 className="h2">{t('title')}</h2>
          <p className="sec__sub">{t('sub')}</p>
        </header>

        <div className="ba">
          {BA_PAIRS.map((pair, i) => (
            <BeforeAfterSlider key={pair.id} pair={pair} index={i} />
          ))}
        </div> */}

        {/* TODO: add sec__head--mt when before/afters are back */}
        <header className="sec__head">
          <span className="kicker">{t('galleryKicker')}</span>
          <h2 className="h2">{t('galleryTitle')}</h2>
        </header>

        <div className="gal">
          {GAL_ITEMS.map((g, i) => (
            <button
              key={g.id}
              type="button"
              aria-label="Open photo"
              className={`gal__item gal__item--${g.span}`}
              onClick={() => { if (window.innerWidth >= 640) setLightboxIndex(i); }}
            >
              <Image fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" src={g.image} alt="Gallery image" style={{ 'objectFit': 'cover' }} />
            </button>
          ))}
        </div>

        <div className="gal__more">
          <a className="gal__link" href={INSTAGRAM_URL}
             target="_blank" rel="noopener noreferrer">
            <RiInstagramLine /> <span>{t('moreOnInstagram')}</span>
          </a>
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
