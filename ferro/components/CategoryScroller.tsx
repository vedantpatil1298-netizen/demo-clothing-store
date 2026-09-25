'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { categories } from '@/lib/products';
import FaultyTerminal from './FaultyTerminal';

export default function CategoryScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: [0.6] }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    const onScroll = () => setHasScrolled(container.scrollTop > 20);
    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      container.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-[100svh]">
      {/* Fixed shared background — the digital texture sits behind every category */}
      <div className="absolute inset-0 z-0">
        <FaultyTerminal
          scale={1.6}
          gridMul={[2, 1]}
          digitSize={1.1}
          timeScale={0.45}
          scanlineIntensity={0.25}
          glitchAmount={1}
          flickerAmount={0.6}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0.4}
          curvature={0}
          tint="#111111"
          mouseReact
          mouseStrength={0.35}
          pageLoadAnimation
          brightness={1}
          lightMode
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-paper/55" />
      </div>

      <div
        ref={containerRef}
        className="snap-container relative z-10 h-full w-full overflow-y-scroll"
      >
        {categories.map((cat, i) => (
          <section
            key={cat.slug}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            data-index={i}
            className="snap-section relative h-[100svh] w-full flex items-center justify-center"
          >
            <Link
              href={`/collections/${cat.slug}`}
              className="group relative block w-[78vw] max-w-[560px] aspect-[4/5] md:w-[46vw]"
            >
              <div className="relative w-full h-full overflow-hidden shadow-[0_30px_60px_-25px_rgba(17,17,17,0.35)]">
                <Image
                  src={cat.heroImage}
                  alt={cat.label}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 46vw, 78vw"
                  className="object-cover transition-transform duration-[900ms] ease-cinematic group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute -bottom-10 left-0 right-0 flex items-baseline justify-between">
                <span className="font-display text-2xl md:text-3xl tracking-wide2">
                  {cat.label}
                </span>
                <span className="text-xs text-graphite">
                  {String(cat.order).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                </span>
              </div>
            </Link>
          </section>
        ))}
      </div>

      {!hasScrolled && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[11px] tracking-wide2 text-ink/70 transition-opacity duration-700">
          Scroll to explore
        </div>
      )}

      <div className="pointer-events-none absolute bottom-8 right-6 md:right-10 z-20 text-xs text-ink/60">
        {String(activeIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
      </div>
    </div>
  );
}
