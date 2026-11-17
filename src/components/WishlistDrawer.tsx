import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { RACK_ITEMS, PICK_A_SILK_CARDS, BRIDAL_COLLECTION } from '../data/sarees';
import { soundManager } from '../utils/audio';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  if (!isWishlistOpen) return null;

  // Find all wishlisted items across catalogs
  const allItems = [
    ...RACK_ITEMS.map((i) => ({ id: i.id, name: i.name, price: i.price, image: i.image, category: 'Silk Collection' })),
    ...PICK_A_SILK_CARDS.map((c) => ({ id: c.id, name: `SUPRIYA ${c.title}`, price: c.price, image: c.image, category: c.silkType })),
    ...BRIDAL_COLLECTION.map((b) => ({ id: b.id, name: b.name, price: b.price, image: b.image, category: 'Bridal Heirloom' })),
  ];

  const wishlistedItems = allItems.filter((it) => wishlist.includes(it.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative z-10 w-full max-w-md bg-[#faf8f5] h-full shadow-2xl flex flex-col justify-between border-l border-[#c59b27]/30 animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-6 bg-white border-b border-[#e8dfd5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#891b2e]" fill="#891b2e" />
            <span className="font-serif-luxury text-lg font-bold text-[#1a1617] tracking-wider uppercase">
              Saved Heirlooms
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f0e8de] text-[#891b2e]">
              {wishlistedItems.length}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setIsWishlistOpen(false);
            }}
            className="p-2 rounded-full hover:bg-black/5 text-[#5e5357]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#f0e8de] flex items-center justify-center text-[#891b2e] mb-4">
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <p className="font-serif-luxury text-lg font-bold text-[#29050d] mb-1">
                Your Wishlist is Empty
              </p>
              <p className="text-xs text-[#706467] max-w-xs mb-6">
                Tap the heart on any saree, blouse, or jewellery piece to save it for your wedding trousseau.
              </p>
            </div>
          ) : (
            wishlistedItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-2xl border border-[#e8dfd5] shadow-xs hover:border-[#c59b27]/40 transition-all items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async"
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#e8dfd5]"
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#891b2e]">
                      {item.category}
                    </div>
                    <div className="text-xs font-semibold text-[#1a1617] line-clamp-1 max-w-[170px]">
                      {item.name}
                    </div>
                    <div className="text-xs font-bold text-[#29050d] mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        category: item.category,
                      });
                    }}
                    className="p-2.5 rounded-full bg-[#670d1e] text-white hover:bg-[#831227] shadow-sm cursor-pointer"
                    aria-label="Move to bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="p-2 text-[#94878a] hover:text-[#891b2e] cursor-pointer"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
