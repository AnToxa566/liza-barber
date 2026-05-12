import React from 'react';

type Tone = 'light' | 'mid' | 'dark' | 'warm';
type Kind = 'portrait' | 'scissors' | 'comb' | 'razor' | 'studio' | 'beard';

interface PlaceholderProps {
  kind?: Kind;
  tone?: Tone;
  caption?: string;
  tag?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ICONS: Record<Kind, React.ReactNode> = {
  portrait: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="38" r="18" stroke="currentColor" strokeWidth="3" />
      <path d="M18 85c0-17.7 14.3-32 32-32s32 14.3 32 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  scissors: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="32" r="10" stroke="currentColor" strokeWidth="3" />
      <circle cx="28" cy="68" r="10" stroke="currentColor" strokeWidth="3" />
      <line x1="36" y1="38" x2="78" y2="72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="62" x2="78" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  comb: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="42" width="60" height="16" rx="3" stroke="currentColor" strokeWidth="3" />
      {[28, 38, 48, 58, 68].map((x) => (
        <line key={x} x1={x} y1="42" x2={x} y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  ),
  razor: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="15" width="30" height="50" rx="4" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="65" x2="50" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="42" y1="85" x2="58" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  studio: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="30" width="70" height="50" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M15 45h70" stroke="currentColor" strokeWidth="3" />
      <path d="M35 20l15 10 15-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  beard: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="16" stroke="currentColor" strokeWidth="3" />
      <path d="M34 45c0 0-8 10-8 25h48c0-15-8-25-8-25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 70c0 0 2 8 8 8s8-8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export function Placeholder({
  kind = 'portrait',
  tone = 'light',
  caption,
  tag,
  className = '',
  style,
}: PlaceholderProps) {
  return (
    <div className={`ph ${className}`} data-tone={tone} style={style}>
      <div className="ph__big">{ICONS[kind]}</div>
      {caption && <span className="ph__cap">{caption}</span>}
      {tag && <span className="ph__corner">{tag}</span>}
    </div>
  );
}
