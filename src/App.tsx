import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SixMoods } from './components/SixMoods';
import { TryTheLook } from './components/TryTheLook';
import { PickASilk } from './components/PickASilk';
import { TheRack } from './components/TheRack';
import { TheMuseFilm } from './components/TheMuseFilm';
import { TheMuseReels } from './components/TheMuseReels';
import { TheBridalCollection } from './components/TheBridalCollection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StoreModal } from './components/StoreModal';
import { Section3D } from './components/Section3D';
import { useSmoothScroll } from './utils/useSmoothScroll';

export const AppContent: React.FC = () => {
  useSmoothScroll();
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1617] selection:bg-[#670d1e] selection:text-[#faf8f5] font-sans-clean">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Hero Section */}
      <Section3D variant="exit"><Hero /></Section3D>

      {/* 2. Six Moods (The SUPRIYA Archive) */}
      <Section3D><SixMoods /></Section3D>

      {/* 3. Try the Look */}
      <Section3D><TryTheLook /></Section3D>

      {/* 4. Pick a Silk */}
      <Section3D><PickASilk /></Section3D>

      {/* 5 & 6. The Rack & Rack Detail Modal */}
      <Section3D><TheRack /></Section3D>

      {/* 7. The Muse Film */}
      <Section3D><TheMuseFilm /></Section3D>

      {/* 8. The Muse Reels */}
      <Section3D><TheMuseReels /></Section3D>

      {/* 9. The Bridal Collection */}
      <Section3D><TheBridalCollection /></Section3D>

      {/* Global Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <StoreModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
