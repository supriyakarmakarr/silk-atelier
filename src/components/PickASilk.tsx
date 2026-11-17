import React, { useState } from 'react';
import { Heart, Plus, Sparkles, Check } from 'lucide-react';
import { PICK_A_SILK_CARDS } from '../data/sarees';
import type { PickSilkCard } from '../data/sarees';
import { useShop } from '../context/ShopContext';

export const PickASilk: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${py * -24}deg`);
    el.style.setProperty('--ry', `${px * 24}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCardId(null);
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  const handleAddCard = (card: PickSilkCard) => {
    addToCart({
      id: card.id,
      name: `SUPRIYA ${card.title} SILK SAREE`,
      price: card.price,
      image: card.image,
      category: card.silkType,
    });
    setAddedIds((prev) => ({ ...prev, [card.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [card.id]: false }));
    }, 1800);
  };

  return (
    <section id="pick-a-silk" className="relative w-full py-24 md:py-32 bg-white overflow-hidden border-t border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header & Hint Line (Reference Page 4) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#891b2e] font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#891b2e]" />
              THE CURATED PALETTE
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1617] tracking-tight">
              Pick a <span className="text-[#891b2e]">Silk</span>
            </h2>
          </div>

          {/* Hint Line (Reference Page 4: "Tilt a card, press it, poke the silk. Hit + to drop a saree into your bag.") */}
          <div className="text-xs sm:text-sm text-[#5d5457] md:text-right font-light max-w-sm flex items-center md:justify-end gap-2">
            <span>Tilt a card, press it, poke the silk. Hit</span>
            <span className="w-5 h-5 rounded-full bg-[#1a1617] text-white inline-flex items-center justify-center text-[11px] font-bold">
              +
            </span>
            <span>to drop a saree into your bag.</span>
          </div>
        </div>

        {/* Fanned 3D Curved Arc Cards Arrangement (Reference Page 4) */}
        <div className="relative w-full overflow-x-auto pb-10 pt-6 no-scrollbar">
          <div className="flex items-center justify-start lg:justify-center gap-4 sm:gap-6 min-w-[1020px] px-4 perspective-1000">
            {PICK_A_SILK_CARDS.map((card, idx) => {
              const inWish = isInWishlist(card.id);
              const isHovered = hoveredCardId === card.id;
              const justAdded = addedIds[card.id];

              // Natural arc curve angle calculation
              const totalCards = PICK_A_SILK_CARDS.length;
              const mid = (totalCards - 1) / 2;
              const curveAngle = (idx - mid) * 3.5; // slight rotation angle along curve
              const curveTranslateY = Math.abs(idx - mid) * 8; // arc dip

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative group w-48 sm:w-56 h-[390px] sm:h-[430px] rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out shadow-xl hover:shadow-2xl flex-shrink-0"
                  style={{
                    backgroundColor: card.cardColor,
                    transform: isHovered
                      ? `translateY(-16px) rotate(0deg) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(1.04)`
                      : `translateY(${curveTranslateY}px) rotate(${curveAngle}deg) scale(1)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card Subtle Gradient and Light Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/35 pointer-events-none" />

                  {/* Huge Condensed Typography Behind Model (Reference Page 4) */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-start pt-8 px-2 overflow-hidden pointer-events-none z-0"
                    style={{
                      transform: 'translateZ(10px)',
                    }}
                  >
                    <span 
                      className="font-serif-luxury font-black text-center text-4xl sm:text-5xl tracking-tighter leading-none opacity-90 uppercase break-words"
                      style={{ color: card.textColor }}
                    >
                      {card.title}
                    </span>
                    <span 
                      className="text-[9px] uppercase tracking-[0.25em] font-semibold mt-1 opacity-70"
                      style={{ color: card.textColor }}
                    >
                      {card.silkType}
                    </span>
                  </div>

                  {/* Heart Wishlist Button at Top Right (Reference Page 4) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(card.id);
                    }}
                    className={`absolute top-4 right-4 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      inWish
                        ? 'bg-white text-[#891b2e] shadow-md'
                        : 'bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-[#891b2e]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className="w-4 h-4" fill={inWish ? 'currentColor' : 'none'} />
                  </button>

                  {/* Full Model standing in front with Soft Shadow (Reference Page 4) */}
                  <div 
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden"
                    style={{
                      transform: isHovered ? 'translateZ(30px) scale(1.05)' : 'translateZ(15px)',
                      transition: 'transform 0.4s ease-out',
                    }}
                  >
                    <img decoding="async"
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center filter contrast-[1.03] drop-shadow-2xl"
                    />
                  </div>

                  {/* Bottom Bar: Price on Left, Black Round Plus Button on Right (Reference Page 4) */}
                  <div 
                    className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    {/* Price */}
                    <div className="bg-black/45 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold text-xs sm:text-sm shadow-md border border-white/20">
                      ₹{card.price.toLocaleString('en-IN')}
                    </div>

                    {/* Round Black Plus Button (Reference Page 4) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddCard(card);
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-90 shadow-xl cursor-pointer ${
                        justAdded
                          ? 'bg-emerald-600 text-white scale-110'
                          : 'bg-[#1a1617] hover:bg-white hover:text-[#1a1617] text-white border border-white/30'
                      }`}
                      aria-label="Add saree to bag"
                    >
                      {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Interactive Tactile Edge */}
                  <div className="absolute inset-0 rounded-3xl border border-white/25 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Silk Guarantee Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#807478]">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          <span>Pure Mulberry Silks · Certified Real Silver-Core Zari · Direct from Kanchipuram Pit Looms</span>
        </div>

      </div>
    </section>
  );
};
