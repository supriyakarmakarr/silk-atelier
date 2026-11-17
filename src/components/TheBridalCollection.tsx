import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { BRIDAL_COLLECTION } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { soundManager } from '../utils/audio';

export const TheBridalCollection: React.FC = () => {
  const [activeBridalIdx, setActiveBridalIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const currentBridal = BRIDAL_COLLECTION[activeBridalIdx];
  const inWish = isInWishlist(currentBridal.id);

  const handleNext = () => {
    soundManager.playClick();
    setActiveBridalIdx((prev) => (prev + 1) % BRIDAL_COLLECTION.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setActiveBridalIdx((prev) => (prev - 1 + BRIDAL_COLLECTION.length) % BRIDAL_COLLECTION.length);
  };

  const handleAddToCart = () => {
    addToCart({
      id: currentBridal.id,
      name: `SUPRIYA BRIDAL: ${currentBridal.name}`,
      price: currentBridal.price,
      originalPrice: currentBridal.originalPrice,
      image: currentBridal.image,
      category: 'Bridal Kanjivaram Collection',
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section id="bridal-collection" className="relative w-full py-24 md:py-32 bg-[#faf8f5] overflow-hidden border-t border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header (Reference Page 10) */}
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#891b2e] font-semibold mb-2 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            SACRED WEDDING HEIRLOOMS
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1617] tracking-tight">
            The Bridal <span className="text-[#891b2e]">Collection</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#665e61] mt-2 font-light">
            For the muhurtham and every vow after
          </p>
        </div>

        {/* 3D Curved Temple Arch Carousel (Reference Page 10) */}
        <div className="relative w-full py-10 flex flex-col items-center">
          
          <div className="relative w-full max-w-5xl h-[390px] sm:h-[450px] flex items-center justify-center overflow-hidden">
            {BRIDAL_COLLECTION.map((bridal, idx) => {
              const offset = idx - activeBridalIdx;
              const isCenter = idx === activeBridalIdx;

              // 3D Curved Carousel math
              const translateX = offset * 140;
              const rotateY = offset * -18;
              const scale = isCenter ? 1.08 : 0.82;
              const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.65 : Math.abs(offset) === 2 ? 0.35 : 0;
              const translateY = Math.abs(offset) * 16;

              return (
                <div
                  key={bridal.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveBridalIdx(idx);
                  }}
                  className="absolute cursor-pointer transition-all duration-700 ease-out select-none flex flex-col items-center"
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                  }}
                >
                  {/* Gopuram Temple-Arch Shaped Card */}
                  <div className={`relative w-48 sm:w-56 h-[320px] sm:h-[370px] rounded-t-full overflow-hidden shadow-2xl transition-all duration-500 bg-[#1f050b] ${
                    isCenter
                      ? 'border-2 border-[#c59b27] shadow-[0_15px_30px_rgba(197,155,39,0.35)]'
                      : 'border border-[#d6cbc0] opacity-85'
                  }`}>
                    
                    {/* Saree Image */}
                    <img loading="lazy" decoding="async"
                      src={bridal.image}
                      alt={bridal.name}
                      className="w-full h-full object-cover object-top filter contrast-[1.04] transition-transform duration-700 hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Discount Badge (Reference Page 10: "-10%") */}
                    {bridal.discount && (
                      <div className="absolute top-4 right-4 z-20 bg-[#891b2e] text-[#faf5e8] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-[#c59b27]/40">
                        {bridal.discount}
                      </div>
                    )}

                    {/* Temple Arch Inner Gold Border */}
                    <div className={`absolute inset-1.5 rounded-t-full pointer-events-none ${
                      isCenter ? 'border border-[#c59b27]/50' : 'border border-white/20'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Card Information (Reference Page 10) */}
          <div className="mt-4 flex flex-col items-center text-center max-w-md w-full">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1a1617] mb-0.5">
              {currentBridal.name}
            </h3>
            <p className="text-xs text-[#706467] font-light mb-1">
              {currentBridal.fabric} · {currentBridal.pallu}
            </p>
            <div className="text-base font-bold text-[#c59b27] tracking-wide mb-6">
              ₹{currentBridal.price.toLocaleString('en-IN')}
              {currentBridal.originalPrice && (
                <span className="text-xs text-[#9a8e91] line-through ml-2 font-normal">
                  ₹{currentBridal.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Prev/Next Navigation, Add to Cart & Heart Controls (Reference Page 10) */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#d6cbc0] hover:border-[#891b2e] hover:bg-[#891b2e] hover:text-white flex items-center justify-center text-[#29050d] transition-all cursor-pointer shadow-sm"
                aria-label="Previous bridal saree"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleAddToCart}
                className={`py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#670d1e] hover:bg-[#831227] text-white border border-[#c59b27]/40'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(currentBridal.id)}
                className={`w-10 h-10 rounded-full border border-[#d6cbc0] flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                  inWish
                    ? 'bg-[#891b2e] text-white border-[#891b2e]'
                    : 'text-[#453c3f] hover:text-[#891b2e] hover:border-[#891b2e]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" fill={inWish ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#d6cbc0] hover:border-[#891b2e] hover:bg-[#891b2e] hover:text-white flex items-center justify-center text-[#29050d] transition-all cursor-pointer shadow-sm"
                aria-label="Next bridal saree"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
