import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SIX_MOODS } from '../data/sarees';
import type { MoodItem } from '../data/sarees';
import { soundManager } from '../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/useSmoothScroll';

export const SixMoods: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodItem | null>(null);

  const handleMoodClick = (mood: MoodItem) => {
    soundManager.playClick();
    setSelectedMood(mood);
  };

  return (
    <section id="six-moods" className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section (Reference Page 2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#891b2e] font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#891b2e]" />
              THE SUPRIYA ARCHIVE
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1617] tracking-tight">
              Six Moods. <span className="gold-gradient-text font-serif-luxury italic font-medium">Timeless Drapes</span>
            </h2>
          </div>

          <div className="max-w-xs text-xs sm:text-sm text-[#5a5255] md:text-right font-light leading-relaxed">
            Woven by hand, worn for a lifetime. Six silk stories, from quiet mornings to festive evenings.
          </div>
        </div>

        {/* 6 Gopuram Temple Arch Cards Grid (Reference Page 2) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {SIX_MOODS.map((mood) => {
            return (
              <div
                key={mood.id}
                onClick={() => handleMoodClick(mood)}
                className="group cursor-pointer flex flex-col items-center transition-transform duration-500 hover:-translate-y-2"
              >
                {/* Temple Arch (Gopuram) Frame with Finial */}
                <div className="relative w-full aspect-[1/2] rounded-t-full overflow-hidden border-2 border-[#c59b27]/60 group-hover:border-[#c59b27] shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-[#faf8f5]">
                  
                  {/* Decorative Temple Gopuram Finial (Kalasam) atop Arch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-4 h-4 text-[#c59b27] drop-shadow-md">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14 7H10L12 2ZM12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8Z" />
                    </svg>
                  </div>

                  {/* Saree Image with Zoom on Hover */}
                  <img loading="lazy" decoding="async"
                    src={mood.image}
                    alt={mood.title}
                    className="w-full h-full object-cover object-top filter contrast-[1.04] transition-all duration-700 transform group-hover:scale-110"
                  />

                  {/* Golden Sheen Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#36050e]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-[11px] text-[#f7e7c4] font-medium tracking-wider flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Golden Border Inset Accent */}
                  <div className="absolute inset-1.5 rounded-t-full border border-[#c59b27]/30 pointer-events-none group-hover:border-[#c59b27]/70 transition-colors" />
                </div>

                {/* Spaced Capital Label (Reference Page 2) */}
                <div className="mt-4 text-center">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-[#291e20] uppercase group-hover:text-[#891b2e] transition-colors">
                    {mood.title}
                  </h3>
                  <p className="text-[10px] text-[#786d70] mt-0.5 tracking-wider hidden sm:block">
                    {mood.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quick View Mood Modal */}
      {selectedMood && (
        createPortal(
        <div 
          onClick={() => setSelectedMood(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#faf8f5] max-w-md w-full rounded-3xl p-6 border-2 border-[#c59b27] shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#891b2e] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              THE ARCHIVE STORY
            </div>

            <div className="w-full h-56 rounded-2xl overflow-hidden mb-4 border border-[#c59b27]/40 shadow-inner">
              <img loading="lazy" decoding="async"
                src={selectedMood.image}
                alt={selectedMood.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <h3 className="font-serif-luxury text-2xl font-bold text-[#2b0811] mb-1">
              {selectedMood.title}
            </h3>
            <p className="text-sm font-medium text-[#c59b27] mb-3">
              {selectedMood.tagline}
            </p>
            <p className="text-sm text-[#4a4245] leading-relaxed mb-6">
              {selectedMood.description}
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedMood(null);
                  smoothScrollTo('the-rack');
                }}
                className="px-5 py-2.5 rounded-full bg-[#670d1e] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#831227] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Browse in Rail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSelectedMood(null)}
                className="px-4 py-2 rounded-full text-xs font-medium text-[#6b6366] hover:bg-black/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>, document.body)
      )}
    </section>
  );
};
