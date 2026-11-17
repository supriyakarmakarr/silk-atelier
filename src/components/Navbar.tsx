import { smoothScrollTo } from '../utils/useSmoothScroll';
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, ArrowRight, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { soundManager } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, setIsStoreModalOpen } = useShop();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'six-moods', 'try-the-look', 'pick-a-silk', 'the-rack', 'the-muse', 'bridal-collection'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      smoothScrollTo(id);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'try-the-look', label: 'Try the Look' },
    { id: 'pick-a-silk', label: 'Pick a Silk' },
    { id: 'the-rack', label: 'The Rack' },
    { id: 'the-muse', label: 'The Muse' },
    { id: 'bridal-collection', label: 'Bridal' },
    { id: 'six-moods', label: 'The Weave' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 px-4 md:px-8 ${
      scrolled ? 'bg-[#1f050b]/95 shadow-2xl py-2.5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Medallion Logo (Reference Page 1) */}
        <div 
          onClick={() => scrollTo('home')}
          className="cursor-pointer group flex items-center"
        >
          <div className="bg-[#520917]/95 hover:bg-[#670d1e] text-[#f7e7c4] px-4 py-2 rounded-2xl border border-[#c59b27]/40 shadow-xl transition-all duration-300 transform group-hover:scale-105 flex flex-col items-center">
            {/* Traditional Gold Emblem */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <svg className="w-4 h-4 text-[#e5c365]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" />
              </svg>
            </div>
            <span className="font-serif-luxury text-base md:text-lg font-bold tracking-[0.22em] text-[#faf5e8]">
              SUPRIYA
            </span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#c59b27] font-medium -mt-0.5">
              SILK & HERITAGE
            </span>
          </div>
        </div>

        {/* Center Glass Pill Navigation (Reference Page 1) */}
        <nav className="hidden lg:flex items-center bg-[#29050d]/92 px-3 py-1.5 rounded-full border border-[#c59b27]/30 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#c59b27] text-[#29050d] font-semibold shadow-md'
                    : 'text-[#f5ede2]/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Visit Store (Reference Page 1) */}
        <div className="flex items-center gap-3">
          {/* Wishlist Icon */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsWishlistOpen(true);
            }}
            className="relative p-2.5 rounded-full bg-[#29050d]/90 text-[#f7e7c4] border border-[#c59b27]/30 hover:border-[#c59b27] hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c59b27] text-[#29050d] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Bag Icon */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsCartOpen(true);
            }}
            className="relative p-2.5 rounded-full bg-[#29050d]/90 text-[#f7e7c4] border border-[#c59b27]/30 hover:border-[#c59b27] hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#891b2e] border border-[#c59b27] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Visit the Store Pill Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsStoreModalOpen(true);
            }}
            className="hidden sm:flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#520917]/95 hover:bg-[#6c0f21] text-[#faf5e8] border border-[#c59b27]/50 shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer text-xs font-medium"
          >
            <span>Visit the Store</span>
            <span className="w-6 h-6 rounded-full bg-white text-[#520917] flex items-center justify-center shadow-inner">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-[#29050d]/80 text-[#f7e7c4] border border-[#c59b27]/30"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#29050d]/95 backdrop-blur-xl border border-[#c59b27]/40 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-[#c59b27] text-[#29050d] font-semibold'
                    : 'text-[#f5ede2] hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsStoreModalOpen(true);
              }}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#c59b27] text-[#29050d] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Visit the Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
