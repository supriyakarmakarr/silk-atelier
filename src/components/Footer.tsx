import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { smoothScrollTo } from '../utils/useSmoothScroll';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playBagSuccess();
    setSubscribed(true);
    setEmail('');
  };

  const scrollTo = (id: string) => {
    soundManager.playClick();
    smoothScrollTo(id);
  };

  return (
    <footer className="relative bg-[#1e040a] text-[#f7e7c4] overflow-hidden border-t-2 border-[#c59b27]/40 pt-20 pb-12">
      {/* Background Subtle Mandala Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-[#e5c365]" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 5 L55 35 L85 20 L65 45 L95 50 L65 55 L85 80 L55 65 L50 95 L45 65 L15 80 L35 55 L5 50 L35 45 L15 20 L45 35 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Heritage Callout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#c59b27]/30">
          
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-5 text-[#e5c365]">🪷</span>
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.25em] text-[#faf5e8]">
                SUPRIYA
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c59b27] font-semibold mb-4">
              SILK & HERITAGE • KANCHIPURAM
            </div>
            <p className="text-xs text-[#eedcb0]/85 font-light leading-relaxed max-w-sm mb-6">
              Born from the sacred temple town of Kanchipuram, SUPRIYA preserves the ancient pit loom tradition. Each drape is woven with pure mulberry silk and electroplated real silver-core zari, consecrated for celebrations that endure across lifetimes.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#c59b27]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-wider">Silk Mark India Certified • 100% Handloom Guarantee</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c365] mb-4">
              The Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#eedcb0]/80">
              <li>
                <button onClick={() => scrollTo('six-moods')} className="hover:text-white transition-colors cursor-pointer">
                  The SUPRIYA Archive (Six Moods)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('try-the-look')} className="hover:text-white transition-colors cursor-pointer">
                  Try the Look (Runway Edit)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pick-a-silk')} className="hover:text-white transition-colors cursor-pointer">
                  Pick a Silk (Curated Palette)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('the-rack')} className="hover:text-white transition-colors cursor-pointer">
                  The Clothes Rail (Every Silk)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('the-muse')} className="hover:text-white transition-colors cursor-pointer">
                  The Muse Film & Soundscape
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('muse-reels')} className="hover:text-white transition-colors cursor-pointer">
                  Silk in Motion Reels
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('bridal-collection')} className="hover:text-white transition-colors cursor-pointer">
                  The Bridal Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Bespoke Gazette Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c365] mb-2">
              The Silk Loom Gazette
            </h4>
            <p className="text-xs text-[#eedcb0]/70 font-light mb-4">
              Receive private invitations to seasonal loom cuts, temple zari debuts, and private showroom viewings.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#420611] border border-[#c59b27]/40 text-xs text-[#faf5e8]">
                ✨ Welcome to the Patrons Circle. Your inaugural invitation has been dispatched.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-[#c59b27]/40 text-xs text-[#faf5e8] placeholder-[#eedcb0]/50 focus:outline-none focus:border-[#c59b27]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#c59b27] hover:bg-[#e5c365] text-[#29050d] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center gap-4 text-xs text-[#eedcb0]/60">
              <span>Instagram</span>
              <span>•</span>
              <span>Pinterest</span>
              <span>•</span>
              <span>YouTube Reels</span>
              <span>•</span>
              <span>Flagship Appointments</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#eedcb0]/50 gap-4">
          <div>
            © {new Date().getFullYear()} SUPRIYA Silk & Heritage Private Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with devotion for</span>
            <span className="font-serif-luxury font-bold text-[#e5c365]">SUPRIYA</span>
            <Heart className="w-3 h-3 text-[#c59b27] fill-[#c59b27] ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
};
