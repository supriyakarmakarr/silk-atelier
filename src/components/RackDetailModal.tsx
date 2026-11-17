import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, MapPin, Check } from 'lucide-react';
import type { SareeItem } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { soundManager } from '../utils/audio';

interface RackDetailModalProps {
  item: SareeItem | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const RackDetailModal: React.FC<RackDetailModalProps> = ({ item, onClose, onNavigate }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState('38');
  const [viewMode, setViewMode] = useState<'FRONT' | 'BACK'>('FRONT');
  const [justAdded, setJustAdded] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  if (!item) return null;

  const inWish = isInWishlist(item.id);
  const sizes = ['34', '36', '38', '40', '42'];

  const handleAdd = () => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.fabric,
      },
      selectedSize
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const currentDisplayImage = viewMode === 'BACK' && item.backImage ? item.backImage : item.image;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Blurred Depth-of-Field Backdrop (Reference Page 6 & 7) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-white/75 backdrop-blur-md transition-opacity"
      />

      {/* Main Rack Detail Stage Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl border border-[#c59b27]/30 shadow-2xl p-6 sm:p-10 flex flex-col items-center">
        
        {/* Top Close Button (Reference Page 6 & 7: "CLOSE ×") */}
        <div className="w-full flex justify-end mb-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#665d60] hover:text-[#891b2e] transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-black/5"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Hanger Presentation Area with Prev/Next Navigation */}
        <div className="relative w-full flex items-center justify-between my-2">
          
          {/* Previous Arrow Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('prev');
            }}
            className="w-10 h-10 rounded-full border border-[#d6cbc0] hover:border-[#891b2e] hover:bg-[#891b2e] hover:text-white text-[#29050d] flex items-center justify-center shadow-md transition-all transform hover:scale-110 cursor-pointer"
            aria-label="Previous rail piece"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Lifted Center Hanger with Saree/Blouse (Reference Page 6 & 7) */}
          <div className="flex flex-col items-center py-4 relative group">
            
            {/* Wooden Hanger Hook Element */}
            <div className="w-12 h-10 flex items-center justify-center -mb-2 z-10 drop-shadow-sm">
              <svg viewBox="0 0 60 50" className="w-10 h-10 text-[#4a2e18]" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M30 10 C30 2, 40 2, 40 10 C40 18, 30 20, 30 28" />
              </svg>
            </div>

            {/* Saree/Blouse Hanging on Crafted Wooden Hanger */}
            <div className="relative w-64 sm:w-80 h-72 sm:h-96 flex items-center justify-center">
              <img loading="lazy" decoding="async"
                src={currentDisplayImage}
                alt={item.name}
                className="max-h-full max-w-full object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.22)] transition-all duration-500 transform group-hover:scale-105"
              />
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('next');
            }}
            className="w-10 h-10 rounded-full border border-[#d6cbc0] hover:border-[#891b2e] hover:bg-[#891b2e] hover:text-white text-[#29050d] flex items-center justify-center shadow-md transition-all transform hover:scale-110 cursor-pointer"
            aria-label="Next rail piece"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Product Details Section (Reference Page 6 & 7) */}
        <div className="flex flex-col items-center text-center mt-2 max-w-xl w-full">
          
          {/* Spaced Capital Title */}
          <h3 className="font-serif-luxury text-base sm:text-xl font-bold tracking-[0.2em] text-[#1a1617] uppercase mb-1">
            {item.name}
          </h3>

          {/* Price */}
          <div className="text-sm font-semibold text-[#891b2e] tracking-wider mb-4">
            ₹{item.price.toLocaleString('en-IN')}.00
          </div>

          {/* Front / Back Toggle Pill (Reference Page 6 & 7) */}
          <div className="inline-flex items-center bg-[#f0e9e1] rounded-full p-1 mb-5 border border-[#dfd4c8]">
            <button
              onClick={() => {
                soundManager.playClick();
                setViewMode('FRONT');
              }}
              className={`px-4 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                viewMode === 'FRONT'
                  ? 'bg-[#1a1617] text-white shadow-sm'
                  : 'text-[#6e6366] hover:text-[#1a1617]'
              }`}
            >
              FRONT
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setViewMode('BACK');
              }}
              className={`px-4 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                viewMode === 'BACK'
                  ? 'bg-[#1a1617] text-white shadow-sm'
                  : 'text-[#6e6366] hover:text-[#1a1617]'
              }`}
            >
              BACK
            </button>
          </div>

          {/* Size Selection Chips 34–42 (Reference Page 6 & 7) */}
          <div className="flex items-center gap-2 mb-6">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSize(s);
                }}
                className={`w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center border transition-all cursor-pointer ${
                  selectedSize === s
                    ? 'border-[#891b2e] bg-[#891b2e] text-white shadow-md'
                    : 'border-[#d8cfc5] bg-white text-[#383033] hover:border-[#891b2e]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Action Row: SELECT A SIZE / ADD TO BAG & Wishlist Heart */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <button
              onClick={handleAdd}
              className={`flex-1 py-3 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#1a1617] hover:bg-[#670d1e] text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG · {selectedSize}</span>
                </>
              )}
            </button>

            {/* Heart Wishlist Toggle Button */}
            <button
              onClick={() => toggleWishlist(item.id)}
              className={`p-3 rounded-full border border-[#d8cfc5] transition-all cursor-pointer ${
                inWish
                  ? 'bg-[#891b2e] text-white border-[#891b2e]'
                  : 'bg-white text-[#453c3f] hover:text-[#891b2e] hover:border-[#891b2e]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" fill={inWish ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* See Availability Link (Reference Page 6 & 7) */}
          <button
            onClick={() => setShowAvailability(!showAvailability)}
            className="mt-4 text-xs text-[#706467] hover:text-[#891b2e] underline underline-offset-4 font-light cursor-pointer transition-colors"
          >
            {showAvailability ? 'Hide boutique stock' : 'See availability'}
          </button>

          {/* Availability Details Drawer */}
          {showAvailability && (
            <div className="mt-4 p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dfd5] w-full text-left animate-in fade-in">
              <div className="text-[11px] font-bold text-[#891b2e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Boutique Inventory (Real-Time)</span>
              </div>
              <div className="space-y-1.5 text-xs text-[#4a4245]">
                <div className="flex justify-between">
                  <span>Kanchipuram Temple Road Flagship:</span>
                  <span className="text-emerald-700 font-semibold">In Stock (2 pieces ready)</span>
                </div>
                <div className="flex justify-between">
                  <span>Chennai T. Nagar Boutique:</span>
                  <span className="text-emerald-700 font-semibold">In Stock (Size {selectedSize})</span>
                </div>
                <div className="flex justify-between">
                  <span>Bangalore Indiranagar Lounge:</span>
                  <span className="text-amber-700 font-medium">Ships in 24 hours</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>,
    document.body
  );
};
