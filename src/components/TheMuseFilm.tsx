import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { smoothScrollTo } from '../utils/useSmoothScroll';

export const TheMuseFilm: React.FC = () => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [inView, setInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Only decode the film while it is on screen
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlayingVideo && inView) v.play().catch(() => {});
    else v.pause();
  }, [isPlayingVideo, inView]);

  const toggleSound = () => {
    const active = soundManager.toggleAmbience();
    setIsPlayingSound(active);
  };

  const scrollToRack = () => {
    soundManager.playClick();
    smoothScrollTo('the-rack');
  };

  const leftPhotos = [
    '/assets/crops/muse_left_1.jpg',
    '/assets/crops/muse_left_2.jpg',
    '/assets/crops/muse_left_3.jpg',
  ];

  const rightPhotos = [
    '/assets/crops/muse_right_1.jpg',
    '/assets/crops/muse_right_2.jpg',
    '/assets/crops/muse_right_3.jpg',
  ];

  return (
    <section id="the-muse" className="relative w-full py-24 md:py-32 bg-[#faf8f5] overflow-hidden border-t border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header (Reference Page 8) */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#891b2e] font-semibold mb-2 inline-flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-[#891b2e]" />
            THE MUSE FILM
            <span className="w-6 h-[1.5px] bg-[#891b2e]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="gold-gradient-text italic font-medium">Feel the drape</span>
          </h2>
        </div>

        {/* 3-Column Theatre Composition: Left Column, Center 16:9 Film, Right Column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Vertical Image Column (Reference Page 8: 3 lifestyle photos scrolling) */}
          <div className="hidden md:flex md:col-span-2 flex-col gap-4 relative max-h-[460px] overflow-hidden">
            {/* Top Fade Gradient Mask */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#faf8f5] to-transparent z-10 pointer-events-none" />
            
            {leftPhotos.map((src, i) => (
              <div
                key={i}
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#e8dfd5] group cursor-pointer"
              >
                <img loading="lazy" decoding="async"
                  src={src}
                  alt={`Muse lifestyle ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}

            {/* Bottom Fade Gradient Mask */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#faf8f5] to-transparent z-10 pointer-events-none" />
          </div>

          {/* Center 16:9 Brand Film in Gold Frame with Corner Brackets (Reference Page 8) */}
          <div className="col-span-1 md:col-span-8 flex flex-col items-center">
            
            {/* Gold Frame with Traditional Corner Brackets */}
            <div ref={frameRef} className="relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-[#c59b27]/80 shadow-2xl p-1 bg-[#1a050a] group">
              
              {/* Traditional Gold Corner Brackets */}
              <div className="absolute top-3 left-3 z-20 w-5 h-5 border-t-2 border-l-2 border-[#f4e0aa] pointer-events-none" />
              <div className="absolute top-3 right-3 z-20 w-5 h-5 border-t-2 border-r-2 border-[#f4e0aa] pointer-events-none" />
              <div className="absolute bottom-3 left-3 z-20 w-5 h-5 border-b-2 border-l-2 border-[#f4e0aa] pointer-events-none" />
              <div className="absolute bottom-3 right-3 z-20 w-5 h-5 border-b-2 border-r-2 border-[#f4e0aa] pointer-events-none" />

              {/* Central Film Image / Video Presentation */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <video
                  ref={videoRef}
                  src="/assets/videos/muse_film.mp4"
                  poster="/assets/crops/muse_film_center.jpg"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="w-full h-full object-cover object-center cursor-pointer"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                {/* Sound On / Off Floating Pill (Reference Page 8) */}
                <button
                  onClick={toggleSound}
                  className="absolute bottom-6 left-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-[#f7e7c4] border border-[#c59b27]/50 shadow-lg text-xs font-medium cursor-pointer transition-all transform hover:scale-105"
                >
                  {isPlayingSound ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#e5c365] animate-pulse" />
                      <span>Sound on · Temple Drone</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-[#f7e7c4]" />
                      <span>Sound off</span>
                    </>
                  )}
                </button>

                {/* Live Ambience Indicator when sound is active */}
                {isPlayingSound && (
                  <div className="absolute top-6 right-6 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#891b2e]/85 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#e5c365]" />
                    <span>Indian Raga Soundscape Active</span>
                  </div>
                )}

                {/* Central Film Play / Pause Watermark */}
                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className={`absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/25 hover:bg-white/35 border border-white/50 text-white flex items-center justify-center shadow-2xl transition-all duration-500 cursor-pointer ${isPlayingVideo ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}
                  aria-label="Play or pause film"
                >
                  <Play className="w-6 h-6 ml-1 fill-white" />
                </button>
              </div>

            </div>

            {/* Purchase the Collection Maroon Button (Reference Page 8) */}
            <button
              onClick={scrollToRack}
              className="mt-8 group flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#670d1e] hover:bg-[#831227] text-white font-medium text-xs sm:text-sm shadow-xl border border-[#c59b27]/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <span className="tracking-wider uppercase">Purchase the Collection</span>
              <span className="w-7 h-7 rounded-full bg-white text-[#670d1e] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>

          </div>

          {/* Right Vertical Image Column (Reference Page 8: 3 lifestyle photos scrolling) */}
          <div className="hidden md:flex md:col-span-2 flex-col gap-4 relative max-h-[460px] overflow-hidden">
            {/* Top Fade Gradient Mask */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#faf8f5] to-transparent z-10 pointer-events-none" />
            
            {rightPhotos.map((src, i) => (
              <div
                key={i}
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#e8dfd5] group cursor-pointer"
              >
                <img loading="lazy" decoding="async"
                  src={src}
                  alt={`Muse lifestyle right ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}

            {/* Bottom Fade Gradient Mask */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#faf8f5] to-transparent z-10 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
