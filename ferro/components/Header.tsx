'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { href: '/collections/bottom-wear', label: 'Bottom Wear' },
  { href: '/collections/upper-wear', label: 'Upper Wear' },
  { href: '/collections/accessories', label: 'Accessories' },
  { href: '/about', label: 'About' }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="fixed top-8 left-0 right-0 z-40 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-10 h-16 text-paper">
        <Link href="/" className="font-display text-lg tracking-wide2" onClick={() => setMenuOpen(false)}>
          Ferro
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:opacity-70 transition-opacity">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-sm">
          <Link href="/search" aria-label="Search" className="hover:opacity-70 transition-opacity">
            Search
          </Link>
          <Link href="/account" aria-label="Account" className="hidden md:inline hover:opacity-70 transition-opacity">
            Account
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="hover:opacity-70 transition-opacity"
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            Cart ({count})
          </button>
          <button
            type="button"
            className="md:hidden hover:opacity-70 transition-opacity"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-ink text-paper px-6 pb-6 flex flex-col gap-4 text-base">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/account" onClick={() => setMenuOpen(false)}>
            Account
          </Link>
        </nav>
      )}
    </header>
  );
}
