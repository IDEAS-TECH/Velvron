'use client'

import React from 'react'

const TECH_LOGOS = [
  {
    name: 'React',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="3.5" fill="#61DAFB"/>
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/>
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="white"/>
        <path d="M11 28.5L24.5 11H27.5V29H25V14.5L12.5 31L11 28.5Z" fill="black"/>
        <path d="M25.5 24L13 11H10V29H13V15L25.5 27.5V24Z" fill="black"/>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="4" fill="#3178C6"/>
        <path d="M22.5 21.5H26V19H15V21.5H18.5V31H22.5V21.5Z" fill="white"/>
        <path d="M27 25.5C27 26.8 27.9 27.5 29.5 27.5C31 27.5 32 26.8 32 25.7C32 24.7 31.3 24.1 29.8 23.7L29 23.5C28.2 23.3 27.9 23.1 27.9 22.7C27.9 22.2 28.4 21.9 29.1 21.9C29.9 21.9 30.4 22.2 30.5 22.9H32C31.9 21.3 30.8 20.5 29.1 20.5C27.5 20.5 26.4 21.3 26.4 22.6C26.4 23.6 27 24.2 28.4 24.6L29.3 24.8C30.2 25 30.5 25.3 30.5 25.7C30.5 26.3 29.9 26.6 29.1 26.6C28.2 26.6 27.6 26.2 27.5 25.5H27Z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" fill="#539E43"/>
        <path d="M18.5 23.5V16.5L20 15.5L21.5 16.5V20L24 18.5V23.5L20 26L16 23.5V18.5L18.5 20V23.5Z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path d="M20 4C20 4 13 12 13 20C13 24.4 16.1 28 20 29C23.9 28 27 24.4 27 20C27 12 20 4 20 4Z" fill="#4CAF50"/>
        <line x1="20" y1="4" x2="20" y2="29" stroke="#A5D6A7" strokeWidth="1.5"/>
        <rect x="19" y="29" width="2" height="7" fill="#4CAF50"/>
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path d="M9 16C10.3 11 13.3 8.5 18 8.5C25 8.5 25.8 13.5 29.2 14.5C30.5 14.9 32.2 14.4 33 13.5C31.7 18.5 28.7 21 24 21C17 21 16.2 16 12.8 15C11.5 14.6 9.8 15.1 9 16ZM3 24.5C4.3 19.5 7.3 17 12 17C19 17 19.8 22 23.2 23C24.5 23.4 26.2 22.9 27 22C25.7 27 22.7 29.5 18 29.5C11 29.5 10.2 24.5 6.8 23.5C5.5 23.1 3.8 23.6 3 24.5Z" fill="#38BDF8"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path d="M20 4C13.4 4 14 6.9 14 6.9L14 9.9H20.1V10.8H11.2C11.2 10.8 8 10.4 8 17.1C8 23.8 10.8 23.6 10.8 23.6H12.5V20.5C12.5 20.5 12.4 17.7 15.3 17.7H21.2C21.2 17.7 24 17.8 24 15C24 12.3 24 9.1 24 9.1C24 9.1 24.5 4 20 4Z" fill="#3572A5"/>
        <path d="M20 36C26.6 36 26 33.1 26 33.1L26 30.1H19.9V29.2H28.8C28.8 29.2 32 29.6 32 22.9C32 16.2 29.2 16.4 29.2 16.4H27.5V19.5C27.5 19.5 27.6 22.3 24.7 22.3H18.8C18.8 22.3 16 22.2 16 25C16 27.7 16 30.9 16 30.9C16 30.9 15.5 36 20 36Z" fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect x="11" y="5" width="9" height="9" rx="4.5" fill="#F24E1E"/>
        <rect x="20" y="5" width="9" height="9" rx="4.5" fill="#FF7262"/>
        <rect x="11" y="14" width="9" height="9" rx="4.5" fill="#A259FF"/>
        <rect x="11" y="23" width="9" height="9" rx="4.5" fill="#0ACF83"/>
        <circle cx="24.5" cy="18.5" r="4.5" fill="#1ABCFE"/>
      </svg>
    ),
  },
  {
    name: 'Docker',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path d="M14 20H17V23H14V20ZM18 20H21V23H18V20ZM22 20H25V23H22V20ZM22 17H25V20H22V17ZM18 17H21V20H18V17ZM14 17H17V20H14V17ZM18 14H21V17H18V14Z" fill="#2496ED"/>
        <path d="M33 21C33 21 32 19 29.5 19C29.5 19 29 16 26 16H25.5V20H26C27.1 20 27.5 21 27.5 21H33Z" fill="#2496ED"/>
        <path d="M8 21C8 21 8 26 14 26H28C30 26 32 24.5 33 21H8Z" fill="#2496ED"/>
      </svg>
    ),
  },
  {
    name: 'AWS',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path d="M12 22L9 14H11L13 20L15 14H17L19 20L21 14H23L20 22H18L16 16.5L14 22H12Z" fill="#FF9900"/>
        <path d="M8 26C10.7 28 14.2 29.5 20 29.5C24.5 29.5 28.5 28.3 31 26.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M28 26L31 24.5L32 27.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    svg: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="8" r="3" fill="#E535AB"/>
        <circle cx="32" cy="15" r="3" fill="#E535AB"/>
        <circle cx="32" cy="25" r="3" fill="#E535AB"/>
        <circle cx="20" cy="32" r="3" fill="#E535AB"/>
        <circle cx="8" cy="25" r="3" fill="#E535AB"/>
        <circle cx="8" cy="15" r="3" fill="#E535AB"/>
        <polygon points="20,8 32,15 32,25 20,32 8,25 8,15" stroke="#E535AB" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
]

const STATS = [
  { number: '100+', label: 'Projects Delivered' },
  { number: '50+',  label: 'Happy Clients'      },
  { number: '5+',   label: 'Years Experience'   },
  { number: '99%',  label: 'Client Satisfaction'},
  { number: '20+',  label: 'Technologies'       },
  { number: '3×',   label: 'Avg. ROI Delivered' },
]

// ─── Logo row (scrolls LEFT) ──────────────────────────────────────────────────
function LogoRow() {
  const items = [...TECH_LOGOS, ...TECH_LOGOS]
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="marquee-track-left">
        {items.map((logo, i) => (
          <div key={i} className="marquee-logo-item">
            {logo.svg}
            <span className="marquee-logo-name">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stat row (scrolls RIGHT) ─────────────────────────────────────────────────
function StatRow() {
  const items = [...STATS, ...STATS]
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="marquee-track-right">
        {items.map((stat, i) => (
          <div key={i} className="marquee-stat-pill">
            <span className="marquee-stat-number">{stat.number}</span>
            <span className="marquee-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function Marquee() {
  return (
    <div className="marquee-root">
      {/* Gradient masks */}
      <div className="marquee-fade-left"  />
      <div className="marquee-fade-right" />

      <div className="marquee-rows">
        <LogoRow />
        <StatRow />
      </div>
    </div>
  )
}
