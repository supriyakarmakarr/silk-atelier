import React, { useState } from 'react';
import { X, MapPin, Phone, Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { soundManager } from '../utils/audio';

export const StoreModal: React.FC = () => {
  const { isStoreModalOpen, setIsStoreModalOpen } = useShop();
  const [selectedBoutique, setSelectedBoutique] = useState('kanchipuram');
  const [booked, setBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '2026-11-20',
    time: '11:00 AM',
    occasion: 'Muhurtham Wedding Saree Consultation',
  });

  if (!isStoreModalOpen) return null;

  const boutiques = [
    {
      id: 'kanchipuram',
      city: 'Kanchipuram Heritage Flagship',
      address: '108 Temple Car Street, Opp. Sri Varadaraja Perumal Temple',
      phone: '+91 44 2722 8900',
      timing: '9:30 AM – 8:30 PM (All 7 Days)',
      features: 'Full handloom pit demonstration, heirloom raw silk vaults, private bridal salon.',
    },
    {
      id: 'chennai',
      city: 'Chennai Luxury Flagship',
      address: '42 Khader Nawaz Khan Road, Nungambakkam, Chennai',
      phone: '+91 44 4899 7722',
      timing: '10:00 AM – 9:00 PM',
      features: 'High-jewelry matching room, personal draping stylists, custom blouse atelier.',
    },
    {
      id: 'bangalore',
      city: 'Bangalore Heritage Lounge',
      address: '12 Lavelle Road, Shanthala Nagar, Bengaluru',
      phone: '+91 80 4120 4455',
      timing: '10:30 AM – 8:30 PM',
      features: 'Curated South Indian wedding collections, Champagne styling consultations.',
    },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playBagSuccess();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div
        onClick={() => setIsStoreModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#faf8f5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c59b27]/60 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            setIsStoreModalOpen(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#5e5357]"
        >
          <X className="w-5 h-5" />
        </button>

        {booked ? (
          <div className="py-12 text-center flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-4 animate-bounce" />
            <h3 className="font-serif-luxury text-2xl font-bold text-[#29050d] mb-2">
              Private Bridal Consultation Confirmed
            </h3>
            <p className="text-sm text-[#5a5255] max-w-md mb-6 leading-relaxed">
              We look forward to welcoming you, <strong className="text-[#1a1617]">{formData.name || 'Respected Patron'}</strong>, at our {boutiques.find(b => b.id === selectedBoutique)?.city} on {formData.date} at {formData.time}. A senior handloom drape master will be reserved exclusively for your session.
            </p>
            <button
              onClick={() => {
                setBooked(false);
                setIsStoreModalOpen(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#670d1e] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#891b2e] font-bold mb-2">
              <Sparkles className="w-4 h-4 text-[#c59b27]" />
              VISIT THE STORE · HERITAGE BOUTIQUES
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1a1617] mb-2">
              Step Into the Divine Showroom
            </h3>
            <p className="text-xs sm:text-sm text-[#665e61] font-light mb-6">
              Experience the tactile weight of pure 3-ply zari, custom bridal blouse tailoring, and heirloom consultation.
            </p>

            {/* Boutique Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {boutiques.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedBoutique(b.id);
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedBoutique === b.id
                      ? 'border-[#891b2e] bg-[#670d1e] text-white shadow-md'
                      : 'border-[#e8dfd5] bg-white text-[#4a4245] hover:border-[#c59b27]'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{b.city.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-80 truncate">Flagship</div>
                </button>
              ))}
            </div>

            {/* Selected Boutique Details Card */}
            {(() => {
              const current = boutiques.find((b) => b.id === selectedBoutique)!;
              return (
                <div className="p-4 rounded-2xl bg-white border border-[#e8dfd5] mb-6 space-y-2 text-xs text-[#4a4245]">
                  <div className="font-semibold text-sm text-[#1a1617] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#891b2e]" />
                    <span>{current.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#665e61]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
                      {current.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
                      {current.timing}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#891b2e] bg-[#faf7f2] p-2 rounded-xl border border-[#f0e8de]">
                    ★ {current.features}
                  </div>
                </div>
              );
            })()}

            {/* Quick Consultation Booking Form */}
            <form onSubmit={handleBooking} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Bride or Patron's Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-[#d6cbc0] bg-white text-xs focus:outline-none focus:border-[#891b2e]"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-[#d6cbc0] bg-white text-xs focus:outline-none focus:border-[#891b2e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#d6cbc0] bg-white">
                  <Calendar className="w-4 h-4 text-[#c59b27]" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full text-xs text-[#29050d] focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#d6cbc0] bg-white">
                  <Clock className="w-4 h-4 text-[#c59b27]" />
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full text-xs text-[#29050d] focus:outline-none bg-transparent"
                  >
                    <option>10:30 AM (Morning Loom Slot)</option>
                    <option>02:00 PM (Afternoon Drape Slot)</option>
                    <option>05:30 PM (Evening Candlelight Slot)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#670d1e] hover:bg-[#831227] text-white text-xs font-bold uppercase tracking-widest shadow-xl transition-all cursor-pointer border border-[#c59b27]/40 mt-2"
              >
                Confirm Private VIP Consultation
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
