import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RACK_ITEMS } from '../data/sarees';
import type { SareeItem } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { RackDetailModal } from './RackDetailModal';
import { soundManager } from '../utils/audio';

export const TheRack: React.FC = () => {
  const { activeRackItem, setActiveRackItem } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('silk-sarees');
  const [hoveredHangerId, setHoveredHangerId] = useState<string | null>(null);

  // Premium 3D glide: the rail slides with the cursor and hangers swing toward it in perspective
  const [interactive] = useState(
    () => typeof window !== 'undefined'
      && window.matchMedia('(pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const mouse = useRef({ target: 0.5, x: 0.5, inside: false, s: 0, visible: false });

  useEffect(() => {
    if (!interactive) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => { mouse.current.visible = e.isIntersecting; }, { rootMargin: '100px' });
    if (wrapRef.current) io.observe(wrapRef.current);
    const loop = (t: number) => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (wrap && track && mouse.current.visible) {
        const m = mouse.current;
        m.x += (m.target - m.x) * 0.07;
        m.s += ((m.inside ? 1 : 0) - m.s) * 0.06;
        const W = wrap.clientWidth;
        const total = track.scrollWidth;
        const over = Math.max(0, total - W);
        const tx = -over * m.x;
        track.style.transform = `translate3d(${tx}px,0,0)`;
        if (thumbRef.current) {
          const frac = over > 0 ? W / total : 0;
          thumbRef.current.style.width = `${frac * 100}%`;
          thumbRef.current.style.left = `${m.x * (1 - frac) * 100}%`;
        }
        const cursorPx = m.x * W;
        itemRefs.current.forEach((el) => {
          const outer = el.parentElement as HTMLElement | null;
          if (!outer) return;
          const cx = outer.offsetLeft + outer.offsetWidth / 2 + tx;
          const d = (cx - cursorPx) / (W * 0.45);
          const near = 1 - Math.min(Math.abs(d), 1);
          const ry = Math.max(-1, Math.min(1, d)) * -16 * m.s;
          const tz = near * 70 * m.s;
          const sway = Math.sin(t / 1100 + outer.offsetLeft / 170) * 1.6;
          el.style.transform = `perspective(1100px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${sway}deg) scale(${1 + near * 0.05 * m.s})`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [interactive]);

  const handleRailMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mouse.current.target = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    mouse.current.inside = true;
  };

  const countOf = (id: string) =>
    id === 'all'
      ? RACK_ITEMS.length
      : RACK_ITEMS.filter((it) => it.category === id || (id === 'silk-sarees' && it.category === 'zari-brocade')).length;

  const filterChips = [
    { id: 'all', label: 'All pieces', count: countOf('all') },
    { id: 'silk-sarees', label: 'Silk Sarees', count: countOf('silk-sarees') },
    { id: 'half-sarees', label: 'Half Sarees', count: countOf('half-sarees') },
    { id: 'full-blouse', label: 'Full-Sleeve Blouses', count: countOf('full-blouse') },
    { id: 'half-blouse', label: 'Half-Sleeve Blouses', count: countOf('half-blouse') },
    { id: 'checked-sarees', label: 'Checked Sarees', count: countOf('checked-sarees') },
    { id: 'zari-brocade', label: 'Zari & Brocade', count: countOf('zari-brocade') },
  ];

  const filteredItems = activeCategory === 'all'
    ? RACK_ITEMS
    : RACK_ITEMS.filter((item) => item.category === activeCategory || (activeCategory === 'silk-sarees' && item.category === 'zari-brocade'));

  const handleFilterClick = (catId: string) => {
    soundManager.playClick();
    setActiveCategory(catId);
    mouse.current.target = 0.5;
  };

  const handleHangerClick = (item: SareeItem) => {
    soundManager.playClick();
    setActiveRackItem(item);
  };

  const handleNavigateDetail = (direction: 'prev' | 'next') => {
    if (!activeRackItem) return;
    const currentIndex = RACK_ITEMS.findIndex((it) => it.id === activeRackItem.id);
    if (currentIndex === -1) return;

    if (direction === 'prev') {
      const prevIdx = (currentIndex - 1 + RACK_ITEMS.length) % RACK_ITEMS.length;
      setActiveRackItem(RACK_ITEMS[prevIdx]);
    } else {
      const nextIdx = (currentIndex + 1) % RACK_ITEMS.length;
      setActiveRackItem(RACK_ITEMS[nextIdx]);
    }
  };

  return (
    <section id="the-rack" className="relative w-full py-24 md:py-32 bg-white overflow-hidden border-t border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header (Reference Page 5) */}
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#891b2e] font-semibold mb-2 inline-flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-[#891b2e]" />
            THE COLLECTION
            <span className="w-6 h-[1.5px] bg-[#891b2e]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1617] tracking-tight">
            Every silk, <span className="gold-gradient-text italic font-medium">on the rail.</span>
          </h2>
        </div>

        {/* Filter Chips Bar (Reference Page 5) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-14 no-scrollbar">
          {filterChips.map((chip) => {
            const isActive = activeCategory === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => handleFilterClick(chip.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#891b2e] text-white shadow-lg border border-[#c59b27]/40 scale-105'
                    : 'bg-[#faf7f2] text-[#4a4245] hover:bg-[#f0e9df] border border-[#e8dfd5]'
                }`}
              >
                <span>{chip.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white text-[#891b2e]' : 'bg-[#e5ddd3] text-[#4a4245]'
                }`}>
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Rail System (Reference Page 5) */}
        <div
          ref={wrapRef}
          onMouseMove={handleRailMove}
          onMouseLeave={() => { mouse.current.inside = false; }}
          className={`relative w-full pt-16 pb-6 no-scrollbar ${interactive ? 'overflow-hidden' : 'overflow-x-auto'}`}
        >
          <div ref={trackRef} className="relative w-max min-w-full will-change-transform">

            {/* Polished Chrome Rod with Metallic Sheen */}
            <div className="absolute left-0 right-0 top-0 h-3 bg-gradient-to-b from-[#e0e0e0] via-[#ffffff] to-[#999999] rounded-full shadow-md border-t border-b border-[#bbbbbb]">
              <div className="absolute -top-3 left-4 w-4 h-9 bg-gradient-to-r from-[#999] via-[#eee] to-[#888] rounded-xs shadow-md" />
              <div className="absolute -top-3 right-4 w-4 h-9 bg-gradient-to-r from-[#999] via-[#eee] to-[#888] rounded-xs shadow-md" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-9 bg-gradient-to-r from-[#999] via-[#eee] to-[#888] rounded-xs shadow-md" />
            </div>

            {/* Hangers Row Hanging from Chrome Rod */}
            <div className="flex items-start justify-center gap-3 sm:gap-6 px-10 pt-4 min-h-[22rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredItems.map((item, idx) => {
                  const isHovered = hoveredHangerId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -60 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -60, scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 140, damping: 20, delay: Math.min(idx, 10) * 0.04 }}
                      className="relative flex-shrink-0"
                    >
                      <div
                        ref={(el) => {
                          if (el) itemRefs.current.set(item.id, el);
                          else itemRefs.current.delete(item.id);
                        }}
                        style={{ transformOrigin: '50% 0%' }}
                      >
                        <div
                          onMouseEnter={() => setHoveredHangerId(item.id)}
                          onMouseLeave={() => setHoveredHangerId(null)}
                          onClick={() => handleHangerClick(item)}
                          className="group relative cursor-pointer flex flex-col items-center transition-all duration-500"
                          style={{
                            transform: isHovered ? 'translateY(12px) scale(1.08)' : 'translateY(0) scale(1)',
                            zIndex: isHovered ? 30 : 10,
                          }}
                        >
                          {/* Wooden Hanger Hook Attached to Chrome Rod */}
                          <div className="w-8 h-8 flex items-center justify-center -mb-2 z-10 transition-transform duration-300 group-hover:rotate-6">
                            <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#5c3a21]" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M20 5 C20 0, 26 0, 26 6 C26 12, 20 14, 20 20" />
                            </svg>
                          </div>

                          {/* Garment on Wooden Hanger */}
                          <div className="relative w-28 sm:w-36 h-64 sm:h-72 flex items-center justify-center p-1">
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              draggable={false}
                              className="max-h-full max-w-full object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-105"
                            />
                            {item.badge && (
                              <span className="absolute top-2 right-1 bg-[#891b2e] text-[#faf5e8] text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-md">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Floating Tooltip Label Below Rail on Hover */}
                          <div
                            className={`mt-2 text-center transition-all duration-300 max-w-[140px] ${
                              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                            }`}
                          >
                            <div className="text-[11px] font-serif-luxury font-bold text-[#1a1617] line-clamp-1">{item.name}</div>
                            <div className="text-xs font-semibold text-[#891b2e]">₹{item.price.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Gold glide indicator + hint */}
        {interactive && (
          <div className="mt-2">
            <div className="relative h-[3px] w-full rounded-full bg-[#efe6d8] overflow-hidden">
              <div ref={thumbRef} className="absolute top-0 h-full rounded-full bg-gradient-to-r from-[#b38728] via-[#e5c365] to-[#b38728]" />
            </div>
            <div className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-[#93878b]">
              Move your cursor along the rail to glide
            </div>
          </div>
        )}

        {/* Captions Below Rail (Reference Page 5: "Explore the collection · 9 pieces") */}
        <div className="mt-8 flex items-center justify-between text-xs text-[#786d70] border-t border-[#f0e8de] pt-4">
          <div className="font-medium text-[#29050d]">
            Explore the collection · {filteredItems.length} pieces on rail
          </div>
          <div className="italic text-[#93878b]">
            Handcrafted heritage pit loom weaves · Click any hanger to inspect
          </div>
        </div>

      </div>

      {/* Rack Detail Modal */}
      <RackDetailModal
        item={activeRackItem}
        onClose={() => setActiveRackItem(null)}
        onNavigate={handleNavigateDetail}
      />
    </section>
  );
};
