import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { SareeItem, LookPiece, ReelItem } from '../data/sarees';
import { soundManager } from '../utils/audio';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size?: string;
  quantity: number;
  category?: string;
  bundleItem?: boolean;
}

interface ShopContextType {
  cart: CartProduct[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isStoreModalOpen: boolean;
  setIsStoreModalOpen: (open: boolean) => void;
  activeRackItem: SareeItem | null;
  setActiveRackItem: (item: SareeItem | null) => void;
  activeReel: ReelItem | null;
  setActiveReel: (reel: ReelItem | null) => void;
  addToCart: (item: Partial<CartProduct> & { id: string; name: string; price: number; image: string }, size?: string) => void;
  addBundleToCart: (pieces: LookPiece[], lookTitle: string, bundlePrice: number) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  discountTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    try {
      const saved = localStorage.getItem('supriya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('supriya_wishlist');
      return saved ? JSON.parse(saved) : ['pick-1', 'rack-1'];
    } catch {
      return ['pick-1', 'rack-1'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [activeRackItem, setActiveRackItem] = useState<SareeItem | null>(null);
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('supriya_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('supriya_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToCart = (
    item: Partial<CartProduct> & { id: string; name: string; price: number; image: string },
    size = '38'
  ) => {
    soundManager.playBagSuccess();

    setCart((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === item.id && p.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          category: item.category || 'Silk Collection',
          size,
          quantity: 1,
        },
      ];
    });

    // Trigger subtle golden celebration confetti
    try {
      confetti({
        particleCount: 28,
        spread: 55,
        origin: { y: 0.85, x: 0.9 },
        colors: ['#c59b27', '#670d1e', '#e5c365', '#ffffff'],
        ticks: 200,
        gravity: 1.2,
      });
    } catch {
      // ignore
    }

    setIsCartOpen(true);
  };

  const addBundleToCart = (pieces: LookPiece[], lookTitle: string, bundlePrice: number) => {
    soundManager.playBagSuccess();

    const bundleItem: CartProduct = {
      id: `bundle-${Date.now()}`,
      name: `Full Look: ${lookTitle} (6 Pieces Complete Set)`,
      price: bundlePrice,
      originalPrice: Math.round(bundlePrice / 0.9),
      image: pieces[0]?.image || '/assets/crops/try_look_stage.jpg',
      category: 'Curated 6-Piece Look Bundle',
      size: 'Custom Tailored',
      quantity: 1,
      bundleItem: true,
    };

    setCart((prev) => [bundleItem, ...prev]);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7, x: 0.75 },
        colors: ['#c59b27', '#670d1e', '#e5c365'],
      });
    } catch {
      // ignore
    }

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size?: string) => {
    soundManager.playClick();
    setCart((prev) => prev.filter((item) => !(item.id === id && (size ? item.size === size : true))));
  };

  const updateQuantity = (id: string, quantity: number, size?: string) => {
    soundManager.playClick();
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && (size ? item.size === size : true)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const toggleWishlist = (id: string) => {
    soundManager.playClick();
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountTotal = cart.reduce((acc, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return acc + (item.originalPrice - item.price) * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isStoreModalOpen,
        setIsStoreModalOpen,
        activeRackItem,
        setActiveRackItem,
        activeReel,
        setActiveReel,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        cartTotal,
        cartCount,
        discountTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
