import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { smoothScrollTo } from '../utils/useSmoothScroll';

export const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      if (bgRef.current) bgRef.current.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0) scale(1.04)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) {
      smoothScrollTo(id);
    }
  };

  const tickerItems = [
    'KANCHIPURAM, one saree at a time',
    'TRY THE LOOK Eight Kanjivaram looks, styled head to toe',
    'PURE ZARI Silver-core zari woven into every temple border',
    'THE RACK Browse the full rail of silks',
    'BRIDAL Heirlooms for the sacred wedding fire',
    'THE MUSE Six moods, timeless drapes',
    'DIVINE WEAVE Master artisans with 40+ years on handloom pits',
  ];

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#1f050b]">
      {/* Background Grand Showroom with Mouse Parallax & Cinematic Subtle Zoom */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        style={{ transform: 'scale(1.04)', transition: 'transform 0.5s ease-out' }}
      >
        <img
          src="/assets/crops/hero_full.jpg"
          alt="SUPRIYA Divine Temple Silk Showroom"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />
        {/* Cinematic Vignette and Warm Temple Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0307] via-transparent to-[#1b0307]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b0307]/70 via-transparent to-[#1b0307]/30" />
      </div>

      {/* Main Hero Content (Reference Page 1 exact typography & arrangement) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-36 md:pt-44 pb-16 flex-1 flex flex-col justify-end">
        <div className="max-w-3xl">
          
          {/* Badge (Reference Page 1: ◆ KANCHIPURAM • PURE ZARI • HANDWOVEN SILK) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3d0610]/80 border border-[#c59b27]/40 text-[#f5e6c8] text-xs font-medium tracking-wider mb-5 shadow-lg animate-fade-in">
            <span className="text-[#e5c365] text-xs">◆</span>
            <span className="uppercase text-[11px] tracking-[0.2em] font-semibold">
              Kanchipuram • Pure Zari • Handwoven Silk
            </span>
          </div>

          {/* Headline (Reference Page 1: Woven for the Divine.) */}
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4 drop-shadow-xl">
            Woven for the <span className="italic font-normal text-[#f4e0aa]">Divine.</span>
          </h1>

          {/* Subtitle (Reference Page 1) */}
          <p className="text-base sm:text-lg md:text-xl text-[#f5ede2]/90 font-light leading-relaxed mb-8 max-w-2xl drop-shadow-md">
            <strong className="font-semibold text-white">SUPRIYA</strong> brings the temple looms of Kanchipuram home: 
            Kanjivaram silk in heritage colours, bordered in real zari and finished by hand.
          </p>

          {/* Dual Action Buttons (Reference Page 1) */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Try the Look Button (Maroon Pill) */}
            <button
              onClick={() => scrollTo('try-the-look')}
              className="group flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#670d1e] hover:bg-[#831227] text-white font-medium text-sm shadow-2xl border border-[#c59b27]/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <span className="tracking-wide">Try the Look</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#670d1e] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            {/* Browse the Rack Button (White / Ivory Translucent Pill) */}
            <button
              onClick={() => scrollTo('the-rack')}
              className="group flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#29050d] font-semibold text-sm shadow-2xl backdrop-blur-md border border-[#c59b27]/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <span className="tracking-wide">Browse the Rack</span>
              <span className="w-8 h-8 rounded-full bg-[#29050d] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            {/* Subtle Divine Artisan Indicator */}
            <div className="hidden sm:flex items-center gap-2 pl-4 text-xs text-[#eedcb0]/80">
              <Sparkles className="w-3.5 h-3.5 text-[#e5c365] animate-pulse" />
              <span>Certified Silk Mark Heritage Looms</span>
            </div>
          </div>

        </div>
      </div>

      {/* Maroon Bottom Ticker Strip (Reference Page 1) */}
      <div className="relative z-20 w-full bg-[#420611] border-t border-[#c59b27]/40 py-2.5 overflow-hidden shadow-2xl">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 mx-6 text-xs font-medium tracking-[0.16em] uppercase">
              <span className="text-[#f7e7c4]">{item}</span>
              <span className="text-[#c59b27] text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 38s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
