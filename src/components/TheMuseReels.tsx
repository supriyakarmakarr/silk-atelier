import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, ChevronLeft, ChevronRight, X, Heart, Share2, Volume2, VolumeX } from 'lucide-react';
import { MUSE_REELS } from '../data/sarees';
import type { ReelItem } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { soundManager } from '../utils/audio';

export const TheMuseReels: React.FC = () => {
  const { activeReel, setActiveReel } = useShop();
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const centerVideoRef = useRef<HTMLVideoElement>(null);
  const centerBarRef = useRef<HTMLDivElement>(null);
  const modalBarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const videoOf = (reel: ReelItem) => reel.image.replace('/crops/', '/videos/').replace('.jpg', '.mp4');
  const onTime = (bar: React.RefObject<HTMLDivElement | null>) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (bar.current && v.duration) bar.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = centerVideoRef.current;
    if (!v) return;
    if (isPlaying && inView && !activeReel) v.play().catch(() => {});
    else v.pause();
  }, [isPlaying, inView, activeReel, activeReelIdx]);
  const [modalAudio, setModalAudio] = useState(false);
  const [likedReels, setLikedReels] = useState<{ [key: string]: boolean }>({});

  const handleNext = () => {
    soundManager.playClick();
    setActiveReelIdx((prev) => (prev + 1) % MUSE_REELS.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setActiveReelIdx((prev) => (prev - 1 + MUSE_REELS.length) % MUSE_REELS.length);
  };

  const togglePlay = () => {
    soundManager.playClick();
    setIsPlaying(!isPlaying);
  };

  const openFullscreen = (reel: ReelItem) => {
    soundManager.playClick();
    setActiveReel(reel);
    setModalAudio(true);
    soundManager.startAmbience();
  };

  const closeFullscreen = () => {
    setActiveReel(null);
    if (modalAudio) {
      soundManager.stopAmbience();
      setModalAudio(false);
    }
  };

  const toggleLike = (reelId: string) => {
    soundManager.playClick();
    setLikedReels((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  return (
    <section ref={sectionRef} id="muse-reels" className="relative w-full py-24 md:py-32 bg-white overflow-hidden border-t border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header and Controls (Reference Page 9) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#891b2e] font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#891b2e]" />
              THE MUSE REELS
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1617] tracking-tight">
              Silk, <span className="gold-gradient-text italic font-medium">in motion.</span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <p className="max-w-md text-xs sm:text-sm text-[#5a5255] md:text-right font-light leading-relaxed">
              Five drapes filmed the way they are lived in — lamp rooms, temple lanes, a morning by the sea. Tap the centre reel to watch it full screen, with sound.
            </p>

            {/* Top Right Controls (Prev, Pause/Play, Next) (Reference Page 9) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-[#d6cbc0] hover:border-[#891b2e] flex items-center justify-center text-[#29050d] hover:bg-[#faf7f2] transition-colors cursor-pointer"
                aria-label="Previous reel"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-[#1a1617] hover:bg-[#891b2e] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-[#d6cbc0] hover:border-[#891b2e] flex items-center justify-center text-[#29050d] hover:bg-[#faf7f2] transition-colors cursor-pointer"
                aria-label="Next reel"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Curved Arc Reels Arrangement (Reference Page 9) */}
        <div className="relative w-full py-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start lg:justify-center gap-4 sm:gap-6 min-w-[1020px] px-6 perspective-1500">
            {MUSE_REELS.map((reel, idx) => {
              const offset = idx - activeReelIdx;
              const isCenter = idx === activeReelIdx;

              // Arc perspective calculation
              const rotateY = offset * -14;
              const scale = isCenter ? 1.08 : 0.88;
              const translateY = Math.abs(offset) * 14;

              return (
                <div
                  key={reel.id}
                  onClick={() => {
                    if (isCenter) {
                      openFullscreen(reel);
                    } else {
                      soundManager.playClick();
                      setActiveReelIdx(idx);
                    }
                  }}
                  className="relative group w-48 sm:w-56 h-[340px] sm:h-[390px] rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-700 ease-out shadow-2xl flex-shrink-0 bg-[#1f070d]"
                  style={{
                    transform: `translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                  }}
                >
                  {/* Reel Background Image */}
                  <img loading="lazy" decoding="async"
                    src={reel.image}
                    alt={reel.title}
                    className="w-full h-full object-cover filter brightness-[0.92] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                  />

                  {isCenter && (
                    <video
                      key={reel.id}
                      ref={centerVideoRef}
                      src={videoOf(reel)}
                      poster={reel.image}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onTimeUpdate={onTime(centerBarRef)}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  )}

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

                  {/* Top Bar: Category Pill & Duration (Reference Page 9) */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[11px] font-semibold text-white/90">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/55 border border-white/20">
                      • {reel.reelNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/55 text-[10px]">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Centre Play Button for Active Center Reel (Reference Page 9) */}
                  {isCenter && !isPlaying && (
                    <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/30 border border-white/60 text-white flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                      <Play className="w-5 h-5 ml-0.5 fill-white" />
                    </div>
                  )}

                  {/* Bottom Text Information (Reference Page 9) */}
                  <div className="absolute bottom-4 inset-x-4 text-left">
                    <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#e5c365] mb-0.5">
                      {reel.fabricType}
                    </div>
                    <div className="font-serif-luxury text-base font-bold text-white tracking-wide leading-tight">
                      {reel.title}
                    </div>
                    <div className="text-[11px] text-white/70 font-light mt-0.5">
                      {reel.location}
                    </div>

                    {/* Animated Gold Progress Bar for Center Reel (Reference Page 9) */}
                    {isCenter && (
                      <div className="w-full h-1 bg-white/30 rounded-full mt-3 overflow-hidden">
                        <div
                          ref={centerBarRef}
                          className="h-full bg-gradient-to-r from-[#c59b27] via-[#f7e7c4] to-[#c59b27]"
                          style={{ width: '0%' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Delicate Gold Border Accent */}
                  <div className={`absolute inset-0 rounded-3xl border transition-colors pointer-events-none ${
                    isCenter ? 'border-[#c59b27]/80 shadow-[0_0_15px_rgba(197,155,39,0.3)]' : 'border-white/20'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Fullscreen Reel Player Modal (Reference Page 9: "Tap centre reel to watch full screen, with sound") */}
      {activeReel && (
        createPortal(
        <div 
          onClick={closeFullscreen}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md h-[80vh] sm:h-[85vh] rounded-3xl overflow-hidden bg-black border-2 border-[#c59b27]/60 shadow-2xl flex flex-col justify-between"
          >
            {/* Top Reel Controls */}
            <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2 text-xs text-[#faf5e8]">
                <span className="font-bold text-[#c59b27]">{activeReel.reelNumber}</span>
                <span>·</span>
                <span className="font-light">{activeReel.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const active = soundManager.toggleAmbience();
                    setModalAudio(active);
                  }}
                  className="p-2 rounded-full bg-black/50 text-white border border-white/20 hover:scale-110"
                >
                  {modalAudio ? <Volume2 className="w-4 h-4 text-[#e5c365]" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={closeFullscreen}
                  className="p-2 rounded-full bg-black/50 text-white border border-white/20 hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reel Video Simulation Background */}
            <div className="absolute inset-0 z-0">
              <video
                key={activeReel.id}
                src={videoOf(activeReel)}
                poster={activeReel.image}
                autoPlay
                muted
                loop
                playsInline
                onTimeUpdate={onTime(modalBarRef)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
            </div>

            {/* Right Action Stack: Like, Share, Audio */}
            <div className="relative z-20 self-end mr-4 mb-20 flex flex-col items-center gap-4">
              <button
                onClick={() => toggleLike(activeReel.id)}
                className={`p-3 rounded-full backdrop-blur-md transition-all ${
                  likedReels[activeReel.id] ? 'bg-[#891b2e] text-white' : 'bg-black/40 text-white hover:bg-black/60'
                }`}
              >
                <Heart className="w-5 h-5" fill={likedReels[activeReel.id] ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  navigator.clipboard?.writeText(window.location.href);
                }}
                className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Details & Progress Bar */}
            <div className="relative z-20 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#c59b27] font-bold">
                {activeReel.fabricType}
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-1">
                {activeReel.title}
              </h3>
              <p className="text-xs text-[#eedcb0]/80 font-light mb-4">
                Filmed on location at {activeReel.location}. Handcrafted temple silk in fluid motion.
              </p>

              {/* Gold Progress Bar */}
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div ref={modalBarRef} className="h-full bg-[#c59b27]" style={{ width: '0%' }} />
              </div>
            </div>

          </div>
        </div>, document.body)
      )}
    </section>
  );
};
