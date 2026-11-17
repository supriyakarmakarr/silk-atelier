import React, { useState } from 'react';
import { Heart, Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { TRY_THE_LOOKS } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { soundManager } from '../utils/audio';

export const TryTheLook: React.FC = () => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});
  const { addToCart, addBundleToCart, toggleWishlist, isInWishlist } = useShop();

  const currentLook = TRY_THE_LOOKS[activeLookIndex];

  const handleNext = () => {
    soundManager.playClick();
    setActiveLookIndex((prev) => (prev + 1) % TRY_THE_LOOKS.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setActiveLookIndex((prev) => (prev - 1 + TRY_THE_LOOKS.length) % TRY_THE_LOOKS.length);
  };

  const handleAddSinglePiece = (piece: { id: string; name: string; price: number; image: string; category: string }) => {
    addToCart({
      id: piece.id,
      name: piece.name,
      price: piece.price,
      image: piece.image,
      category: piece.category,
    });
    setAddedItemIds((prev) => ({ ...prev, [piece.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [piece.id]: false }));
    }, 1800);
  };

  const handleAddBundle = () => {
    addBundleToCart(currentLook.pieces, currentLook.title, currentLook.bundlePrice);
  };

  return (
    <section id="try-the-look" className="relative w-full py-24 md:py-32 bg-[#faf8f5] overflow-hidden border-t border-[#c59b27]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header (Reference Page 3) */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#891b2e] font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-[#891b2e]" />
            STYLED HEAD TO TOE
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1617] tracking-tight">
            Try the <span className="text-[#891b2e]">Look.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#665e61] mt-2 font-light">
            Eight looks, styled head to toe. Tap a look to see the pieces.
          </p>
        </div>

        {/* Main Grid: Runway Stage on Left, Styled Pieces Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Runway Interactive Stage (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Model Carousel Stage */}
            <div className="relative w-full h-[520px] sm:h-[580px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-white/90 via-[#fcfbf9] to-[#ece5dd]/60 p-4 border border-[#e8dfd5] shadow-sm">
              
              {/* Runway Pedestal Gradient */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/10 rounded-full blur-xl pointer-events-none" />

              {/* Multi-model perspective layout (Center model active, side models blurred) */}
              <div className="relative w-full h-full flex items-center justify-center">
                {TRY_THE_LOOKS.map((look, idx) => {
                  const offset = idx - activeLookIndex;
                  const isActive = idx === activeLookIndex;
                  
                  // Position models on a curved runway stage
                  const translateX = offset * 180;
                  const scale = isActive ? 1.05 : 0.78;
                  const opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.38 : 0;
                  const zIndex = isActive ? 30 : 20 - Math.abs(offset);
                  const blur = isActive ? '0px' : '3.5px';

                  return (
                    <div
                      key={look.id}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveLookIndex(idx);
                      }}
                      className="absolute bottom-4 cursor-pointer transition-all duration-700 ease-out flex flex-col items-center select-none"
                      style={{
                        transform: `translateX(${translateX}px) scale(${scale})`,
                        opacity,
                        zIndex,
                        filter: `blur(${blur})`,
                      }}
                    >
                      <img decoding="async"
                        src={look.modelImage}
                        alt={look.title}
                        className="h-[430px] sm:h-[510px] w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-105"
                      />
                      
                      {isActive && (
                        <div className="mt-2 text-center bg-[#29050d]/80 text-[#faf5e8] px-4 py-1.5 rounded-full text-xs font-medium tracking-wider backdrop-blur-md border border-[#c59b27]/40 shadow-lg">
                          {look.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Prev / Next Stage Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#29050d] shadow-lg flex items-center justify-center border border-[#c59b27]/30 transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous look"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#29050d] shadow-lg flex items-center justify-center border border-[#c59b27]/30 transition-all hover:scale-110 cursor-pointer"
                aria-label="Next look"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Look Counter and Controls (Reference Page 3: "7 of 8 · Ivory Elephant") */}
            <div className="mt-4 flex items-center justify-between w-full px-2 text-xs text-[#6e6467]">
              <div className="font-medium text-[#29050d] flex items-center gap-2">
                <span className="font-bold text-[#891b2e]">{activeLookIndex + 1} of {TRY_THE_LOOKS.length}</span>
                <span>·</span>
                <span className="font-serif-luxury font-semibold text-sm">{currentLook.title}</span>
              </div>
              <span className="text-[11px] text-[#93878b] tracking-wider italic">
                Scroll or drag to switch looks
              </span>
            </div>

          </div>

          {/* Right "In this look" Panel (Reference Page 3) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#891b2e] font-bold mb-4 pb-2 border-b border-[#f0e8de] flex items-center justify-between">
                <span>IN THIS LOOK</span>
                <span className="text-[11px] text-[#94898c] lowercase font-normal">6 curated pieces</span>
              </div>

              {/* Pieces List */}
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {currentLook.pieces.map((piece) => {
                  const inWish = isInWishlist(piece.id);
                  const justAdded = addedItemIds[piece.id];

                  return (
                    <div
                      key={piece.id}
                      className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#faf7f2] transition-colors border border-transparent hover:border-[#f0e8de]"
                    >
                      {/* Thumbnail & Title */}
                      <div className="flex items-center gap-3">
                        <img decoding="async"
                          src={piece.image}
                          alt={piece.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#e8dfd5] shadow-xs"
                        />
                        <div>
                          <div className="text-[10px] uppercase tracking-wider font-semibold text-[#891b2e]">
                            {piece.category}
                          </div>
                          <div className="text-xs font-medium text-[#1a1617] line-clamp-1 max-w-[190px]">
                            {piece.name}
                          </div>
                          <div className="text-xs font-bold text-[#29050d] mt-0.5">
                            ₹{piece.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: Heart + Plus */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleWishlist(piece.id)}
                          className={`p-1.5 rounded-full transition-colors ${
                            inWish ? 'text-[#891b2e] bg-[#891b2e]/10' : 'text-[#8c8285] hover:text-[#891b2e]'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className="w-4 h-4" fill={inWish ? 'currentColor' : 'none'} />
                        </button>

                        <button
                          onClick={() => handleAddSinglePiece(piece)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            justAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#29050d] hover:bg-[#891b2e] text-white shadow-sm'
                          }`}
                          aria-label="Add piece to bag"
                        >
                          {justAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Bundle Offer & Add Full Look Button (Reference Page 3) */}
            <div className="mt-6 pt-5 border-t border-[#f0e8de]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-[#1a1617]">Complete the look</div>
                  <div className="text-[11px] text-[#891b2e] font-medium">
                    Bundle all 6 pieces · save {currentLook.discountPercent}%
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-[#93878b] line-through">
                    ₹{currentLook.originalTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-base font-bold text-[#29050d]">
                    ₹{currentLook.bundlePrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Add Full Look to Bag Button */}
              <button
                onClick={handleAddBundle}
                className="w-full py-3 px-6 rounded-full bg-[#670d1e] hover:bg-[#831227] text-white font-semibold text-xs uppercase tracking-widest shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer border border-[#c59b27]/40"
              >
                <span>Add full look to bag</span>
                <span className="text-[#c59b27] font-bold">(-10%)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
