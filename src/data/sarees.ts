export interface SareeItem {
  id: string;
  name: string;
  category: 'silk-sarees' | 'half-sarees' | 'full-blouse' | 'half-blouse' | 'checked-sarees' | 'zari-brocade';
  price: number;
  originalPrice?: number;
  image: string;
  backImage?: string;
  fabric: string;
  zari: string;
  color: string;
  origin: string;
  description: string;
  palluDetails?: string;
  badge?: string;
  discount?: string;
}

export interface LookPiece {
  id: string;
  category: string;
  name: string;
  price: number;
  image: string;
}

export interface CuratedLook {
  id: string;
  number: number;
  total: number;
  title: string;
  tagline: string;
  modelImage: string;
  pieces: LookPiece[];
  originalTotal: number;
  bundlePrice: number;
  discountPercent: number;
}

export interface MoodItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  accentColor: string;
}

export interface PickSilkCard {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  cardColor: string;
  textColor: string;
  silkType: string;
}

export interface ReelItem {
  id: string;
  reelNumber: string;
  duration: string;
  fabricType: string;
  title: string;
  location: string;
  image: string;
  aspect: string;
  videoUrl?: string;
}

export interface BridalItem {
  id: string;
  name: string;
  fabric: string;
  pallu: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  description: string;
}

// 1. SIX MOODS DATA
export const SIX_MOODS: MoodItem[] = [
  {
    id: 'wedding-edit',
    title: 'WEDDING EDIT',
    tagline: 'Bridal Kanjivaram Heirlooms',
    image: '/assets/crops/mood_wedding_edit.jpg',
    description: 'Woven with high-density gold zari on deep crimson silk, made for sacred muhurtham rituals.',
    accentColor: '#891b2e',
  },
  {
    id: 'kanchipuram-icons',
    title: 'KANCHIPURAM ICONS',
    tagline: 'Dual-tone Temple Classics',
    image: '/assets/crops/mood_kanchipuram_icons.jpg',
    description: 'Iconic korvai contrasts featuring emerald body and rani pink temple gopuram borders.',
    accentColor: '#0c5c3b',
  },
  {
    id: 'banarasi-heirlooms',
    title: 'BANARASI HEIRLOOMS',
    tagline: 'Royal Katan Brocade',
    image: '/assets/crops/mood_banarasi_heirlooms.jpg',
    description: 'Intricate kadhwa silver flora woven across deep aubergine pure mulberry silk.',
    accentColor: '#4a154b',
  },
  {
    id: 'festive-radiance',
    title: 'FESTIVE RADIANCE',
    tagline: 'Manjal Turmeric Silk',
    image: '/assets/crops/mood_festive_radiance.jpg',
    description: 'Auspicious turmeric yellow bathed in shimmering copper zari, celebrating dawn rituals.',
    accentColor: '#c59b27',
  },
  {
    id: 'zari-signatures',
    title: 'ZARI SIGNATURES',
    tagline: 'Pure 3-Ply Real Silver Zari',
    image: '/assets/crops/mood_zari_signatures.jpg',
    description: 'Certified 98.5% silver-core electroplated antique gold zari with timeless peacock chakras.',
    accentColor: '#9e7518',
  },
  {
    id: 'bridal-elan',
    title: 'BRIDAL ÉLAN',
    tagline: 'The Royal Sisterhood',
    image: '/assets/crops/mood_bridal_elan.jpg',
    description: 'Grand silk silhouettes designed for celebrations that span generations.',
    accentColor: '#670d1e',
  },
];

// 2. TRY THE LOOK DATA (8 STYLED LOOKS)
export const TRY_THE_LOOKS: CuratedLook[] = [
  {
    id: 'look-1',
    number: 1,
    total: 8,
    title: 'Ivory Elephant',
    tagline: 'Pure Kanjivaram with elephant motif gold temple border',
    modelImage: '/assets/crops/try_model_ivory_center.png',
    originalTotal: 69230,
    bundlePrice: 62100,
    discountPercent: 10,
    pieces: [
      {
        id: 'saree-ivory-elephant',
        category: 'SUPRIYA SAREE',
        name: 'Ivory Kanjivaram with Elephant Border',
        price: 32000,
        image: '/assets/crops/try_piece_saree.jpg',
      },
      {
        id: 'blouse-dusty-rose',
        category: 'SUPRIYA BLOUSE',
        name: 'Dusty Rose Silk Blouse',
        price: 4200,
        image: '/assets/crops/try_piece_blouse.jpg',
      },
      {
        id: 'choker-pink-stone',
        category: 'SUPRIYA CHOKER',
        name: 'Pink Stone Temple Choker',
        price: 9400,
        image: '/assets/crops/try_piece_choker.jpg',
      },
      {
        id: 'jhumkas-pearl-drops',
        category: 'SUPRIYA JHUMKAS',
        name: 'Jhumkas with Pearl Drops',
        price: 4800,
        image: '/assets/crops/try_piece_jhumkas.jpg',
      },
      {
        id: 'ottiyanam-elephant-motif',
        category: 'SUPRIYA OTTIYANAM',
        name: 'Elephant Motif Ottiyanam',
        price: 15000,
        image: '/assets/crops/try_piece_ottiyanam.jpg',
      },
      {
        id: 'bangles-dusty-rose-stack',
        category: 'SUPRIYA BANGLES',
        name: 'Gold and Dusty Rose Bangle Stack',
        price: 3830,
        image: '/assets/crops/try_piece_bangles.jpg',
      },
    ],
  },
  {
    id: 'look-2',
    number: 2,
    total: 8,
    title: 'Emerald Peacock',
    tagline: 'Deep forest green with shimmering real zari peacock chakras',
    modelImage: '/assets/crops/try_model_green_1.png',
    originalTotal: 76300,
    bundlePrice: 68670,
    discountPercent: 10,
    pieces: [
      {
        id: 'saree-emerald-peacock',
        category: 'SUPRIYA SAREE',
        name: 'Emerald Korvai Peacock Silk Saree',
        price: 36000,
        image: '/assets/crops/try_piece_saree.jpg',
      },
      {
        id: 'blouse-emerald-brocade',
        category: 'SUPRIYA BLOUSE',
        name: 'Bottle Green Raw Silk Blouse',
        price: 4500,
        image: '/assets/crops/try_piece_blouse.jpg',
      },
      {
        id: 'choker-kemp-peacock',
        category: 'SUPRIYA CHOKER',
        name: 'Navaratna Antique Gold Choker',
        price: 11200,
        image: '/assets/crops/try_piece_choker.jpg',
      },
      {
        id: 'jhumkas-peacock-bell',
        category: 'SUPRIYA JHUMKAS',
        name: 'Temple Peacock Jhumkas',
        price: 5400,
        image: '/assets/crops/try_piece_jhumkas.jpg',
      },
      {
        id: 'ottiyanam-peacock-belt',
        category: 'SUPRIYA OTTIYANAM',
        name: 'Carved Peacock Kamarbandh',
        price: 15200,
        image: '/assets/crops/try_piece_ottiyanam.jpg',
      },
      {
        id: 'bangles-emerald-kada',
        category: 'SUPRIYA BANGLES',
        name: 'Emerald Kada & Antique Bangle Set',
        price: 4000,
        image: '/assets/crops/try_piece_bangles.jpg',
      },
    ],
  },
  {
    id: 'look-3',
    number: 3,
    total: 8,
    title: 'Royal Muhurtham Crimson',
    tagline: 'Temple loom crimson silk bordered in pure gold zari',
    modelImage: '/assets/crops/try_model_maroon_back.png',
    originalTotal: 81600,
    bundlePrice: 73440,
    discountPercent: 10,
    pieces: [
      {
        id: 'saree-crimson-muhurtham',
        category: 'SUPRIYA SAREE',
        name: 'Crimson Kalyanam Kanjivaram',
        price: 38000,
        image: '/assets/crops/try_piece_saree.jpg',
      },
      {
        id: 'blouse-zardozi-crimson',
        category: 'SUPRIYA BLOUSE',
        name: 'Zardozi Handworked Raw Silk Blouse',
        price: 5600,
        image: '/assets/crops/try_piece_blouse.jpg',
      },
      {
        id: 'choker-mango-mala',
        category: 'SUPRIYA CHOKER',
        name: 'Kemp Stone Mango Mala Choker',
        price: 14500,
        image: '/assets/crops/try_piece_choker.jpg',
      },
      {
        id: 'jhumkas-chandbali-drop',
        category: 'SUPRIYA JHUMKAS',
        name: 'Chandbali Heavy Drop Jhumkas',
        price: 6200,
        image: '/assets/crops/try_piece_jhumkas.jpg',
      },
      {
        id: 'ottiyanam-royal-belt',
        category: 'SUPRIYA OTTIYANAM',
        name: 'Heritage Lakshmi Ottiyanam',
        price: 12800,
        image: '/assets/crops/try_piece_ottiyanam.jpg',
      },
      {
        id: 'bangles-ruby-temple',
        category: 'SUPRIYA BANGLES',
        name: 'Ruby Stone Temple Bangle Stack',
        price: 4500,
        image: '/assets/crops/try_piece_bangles.jpg',
      },
    ],
  },
  {
    id: 'look-4',
    number: 4,
    total: 8,
    title: 'Mustard Saffron Glow',
    tagline: 'Auspicious dawn yellow draped with antique rudraksha zari',
    modelImage: '/assets/crops/try_model_mustard_orange.png',
    originalTotal: 68500,
    bundlePrice: 61650,
    discountPercent: 10,
    pieces: [
      {
        id: 'saree-mustard-saffron',
        category: 'SUPRIYA SAREE',
        name: 'Saffron Temple Gold Silk Saree',
        price: 33000,
        image: '/assets/crops/try_piece_saree.jpg',
      },
      {
        id: 'blouse-saffron-embroidered',
        category: 'SUPRIYA BLOUSE',
        name: 'Saffron Raw Silk Maggam Blouse',
        price: 4600,
        image: '/assets/crops/try_piece_blouse.jpg',
      },
      {
        id: 'choker-guttapusalu',
        category: 'SUPRIYA CHOKER',
        name: 'Guttapusalu Pearl Choker',
        price: 9800,
        image: '/assets/crops/try_piece_choker.jpg',
      },
      {
        id: 'jhumkas-pearl-umbrella',
        category: 'SUPRIYA JHUMKAS',
        name: 'Pearl Umbrella Jhumkas',
        price: 4500,
        image: '/assets/crops/try_piece_jhumkas.jpg',
      },
      {
        id: 'ottiyanam-floral-link',
        category: 'SUPRIYA OTTIYANAM',
        name: 'Floral Link Antique Waist Chain',
        price: 12800,
        image: '/assets/crops/try_piece_ottiyanam.jpg',
      },
      {
        id: 'bangles-matte-gold',
        category: 'SUPRIYA BANGLES',
        name: 'Matte Finish Gold Bangle Set',
        price: 3800,
        image: '/assets/crops/try_piece_bangles.jpg',
      },
    ],
  },
];

// 3. PICK A SILK DATA
export const PICK_A_SILK_CARDS: PickSilkCard[] = [
  {
    id: 'pick-1',
    title: 'PALACE CHECK',
    subtitle: 'Classic Kanchi checks in royal midnight blue and temple gold zari',
    price: 19900,
    image: '/assets/crops/pick_palace_check.png',
    cardColor: '#8a1c2f',
    textColor: '#ffffff',
    silkType: 'Checked Kanjivaram Silk',
  },
  {
    id: 'pick-2',
    title: 'MAGENTA SHO SILK',
    subtitle: 'Vibrant magenta shot silk woven with violet undertones and silver zari',
    price: 29800,
    image: '/assets/crops/pick_magenta_sho_silk.png',
    cardColor: '#5c2d82',
    textColor: '#ffffff',
    silkType: 'Pure Shot Silk Pattu',
  },
  {
    id: 'pick-3',
    title: 'BENGAL GARDEN',
    subtitle: 'Warm golden ivory body with intricate flora meenakari woven pallu',
    price: 24600,
    image: '/assets/crops/pick_bengal_garden.png',
    cardColor: '#dca437',
    textColor: '#2c1e08',
    silkType: 'Ivory Temple Brocade',
  },
  {
    id: 'pick-4',
    title: 'KANCHI RANI',
    subtitle: 'Iconic Rani pink pure silk with majestic peacock-chakra zari tier',
    price: 32400,
    image: '/assets/crops/pick_kanchi_rani.png',
    cardColor: '#b41344',
    textColor: '#ffffff',
    silkType: 'Double Warp Kanchi Pattu',
  },
  {
    id: 'pick-5',
    title: 'BENARES GOLD',
    subtitle: 'All-over electroplated antique gold zari on deep mustard katan silk',
    price: 41800,
    image: '/assets/crops/pick_benares_gold.png',
    cardColor: '#d4af37',
    textColor: '#291b05',
    silkType: 'All-Gold Zari Brocade',
  },
  {
    id: 'pick-6',
    title: 'KANCHI CHECKS',
    subtitle: 'Emerald and turquoise checks with woven gold mayil (peacock) motifs',
    price: 18600,
    image: '/assets/crops/pick_kanchi_checks.png',
    cardColor: '#0e7c5c',
    textColor: '#ffffff',
    silkType: 'Korvai Check Pattu',
  },
];

// 4. THE RACK DATA (25 PIECES WITH CATEGORIES)
export const RACK_ITEMS: SareeItem[] = [
  {
    id: 'rack-1',
    name: 'SUPRIYA TEMPLE GOLD BROCADE',
    category: 'zari-brocade',
    price: 37000,
    image: '/assets/crops/rack_detail_gold_saree.png',
    backImage: '/assets/crops/rack_saree_temple_gold_center.png',
    fabric: 'Pure Mulberry Kanchipuram Silk',
    zari: '3-Ply 98.5% Silver-core Antique Gold Zari',
    color: 'Temple Antique Gold',
    origin: 'Handloomed in Kanchipuram',
    description: 'An opus of temple architecture translated into silk, with all-over gopuram brocade and heavy grand pallu.',
    palluDetails: 'Grand Thazhampoo (Screw Pine) Temple Motif',
    badge: 'Flagship Loom',
  },
  {
    id: 'rack-2',
    name: 'SUPRIYA SAFFRON RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 3600,
    image: '/assets/crops/rack_detail_saffron_blouse.png',
    backImage: '/assets/crops/rack_detail_saffron_blouse.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Auspicious Saffron Turmeric',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Rich neckline adorned with handcrafted antique zardozi work and fine piping, perfect for festive pairings.',
    badge: 'Artisan Crafted',
  },
  {
    id: 'rack-3',
    name: 'SUPRIYA CHECKED MAGENTA KORVAI',
    category: 'checked-sarees',
    price: 28500,
    image: '/assets/crops/rack_saree_checked_magenta.png',
    backImage: '/assets/crops/rack_saree_checked_magenta.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver Core Real Zari',
    color: 'Magenta & Golden Mustard Checks',
    origin: 'Kanchipuram Heritage Looms',
    description: 'Classic kattam checks interlinked with ancient korvai weaving, featuring contrast temple borders.',
  },
  {
    id: 'rack-4',
    name: 'SUPRIYA ROYAL BLUE KORVAI PATTU',
    category: 'silk-sarees',
    price: 34000,
    image: '/assets/crops/rack_saree_royal_blue.png',
    backImage: '/assets/crops/rack_saree_royal_blue.png',
    fabric: 'Pure Silk 3-Ply Warp',
    zari: 'Antique Gold Zari',
    color: 'Midnight Sapphire Blue',
    origin: 'Kanchipuram, Tamil Nadu',
    description: 'Lustrous sapphire blue body contrasted with rich crimson border featuring woven annapakshi motifs.',
    badge: 'Best Seller',
  },
  {
    id: 'rack-5',
    name: 'SUPRIYA IVORY BROCADE WEDDING EDIT',
    category: 'silk-sarees',
    price: 39500,
    image: '/assets/crops/rack_saree_ivory_cream.png',
    backImage: '/assets/crops/rack_saree_ivory_cream.png',
    fabric: 'Pure Mulberry Silk',
    zari: 'Electroplated Silver Zari',
    color: 'Ivory Pearl & Antique Gold',
    origin: 'Kanchipuram Sacred Looms',
    description: 'A bride’s dream: ethereal pearl-white drape woven with intricate floral vines and sacred temple finials.',
  },
  {
    id: 'rack-6',
    name: 'SUPRIYA BRONZE CHECKED HERITAGE',
    category: 'checked-sarees',
    price: 26000,
    image: '/assets/crops/rack_saree_bronze_check.png',
    backImage: '/assets/crops/rack_saree_bronze_check.png',
    fabric: 'Kanchipuram Silk',
    zari: 'Bronze Zari',
    color: 'Warm Bronze & Coffee Checks',
    origin: 'Kanchipuram, Tamil Nadu',
    description: 'Earthy luxury featuring heritage checks and a rich copper zari pallu.',
  },
  {
    id: 'rack-7',
    name: 'SUPRIYA RANI PINK DOUBLE WARP',
    category: 'silk-sarees',
    price: 32500,
    image: '/assets/crops/rack_saree_rani_pink.png',
    backImage: '/assets/crops/rack_saree_rani_pink.png',
    fabric: 'Double Warp Pure Silk',
    zari: 'Real Gold Zari',
    color: 'Rani Fuchsia Pink',
    origin: 'Kanchipuram Looms',
    description: 'Vibrant feminine elegance with contrast emerald green temple border and intricate peacock buttis.',
  },
  {
    id: 'rack-8',
    name: 'SUPRIYA MUSTARD CHECKED DRAPE',
    category: 'checked-sarees',
    price: 24500,
    image: '/assets/crops/rack_saree_mustard_check.png',
    backImage: '/assets/crops/rack_saree_mustard_check.png',
    fabric: 'Traditional Silk',
    zari: 'Antique Gold Zari',
    color: 'Turmeric Mustard & Crimson',
    origin: 'Kanchipuram Heritage Looms',
    description: 'An auspicious drape with classic checks and rich temple gopuram borders.',
  },
  {
    id: 'rack-9',
    name: 'SUPRIYA PEACOCK BLUE TISSUE PATTU',
    category: 'zari-brocade',
    price: 42000,
    image: '/assets/crops/rack_saree_peacock_blue.png',
    backImage: '/assets/crops/rack_saree_peacock_blue.png',
    fabric: 'Tissue Kanjivaram Silk',
    zari: 'Full Tissue Gold Zari Weave',
    color: 'Peacock Aqua Blue',
    origin: 'Kanchipuram Master Weavers',
    description: 'Full tissue weave that shimmers under temple chandeliers with magnificent fluid drape.',
  },
  {
    id: 'rack-10',
    name: 'SUPRIYA MAROON ZARDOZI RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 3800,
    image: '/assets/crops/rack_hb_maroon.png',
    backImage: '/assets/crops/rack_hb_maroon.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Temple Maroon',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Deep maroon raw silk with antique zardozi neckline.',
  },
  {
    id: 'rack-11',
    name: 'SUPRIYA EMERALD RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 3900,
    image: '/assets/crops/rack_hb_emerald.png',
    backImage: '/assets/crops/rack_hb_emerald.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Emerald Green',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Emerald raw silk finished with gold maggam embroidery.',
  },
  {
    id: 'rack-12',
    name: 'SUPRIYA PEACOCK TEAL RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 3700,
    image: '/assets/crops/rack_hb_teal.png',
    backImage: '/assets/crops/rack_hb_teal.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Peacock Teal',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Peacock teal raw silk, hand-embroidered sleeves and neckline.',
  },
  {
    id: 'rack-13',
    name: 'SUPRIYA ROSE PINK RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 3500,
    image: '/assets/crops/rack_hb_rose.png',
    backImage: '/assets/crops/rack_hb_rose.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Rose Pink',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Soft rose raw silk for pastel and bridal pairings.',
  },
  {
    id: 'rack-14',
    name: 'SUPRIYA ROYAL BLUE RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 4100,
    image: '/assets/crops/rack_hb_royal.png',
    backImage: '/assets/crops/rack_hb_royal.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Royal Blue',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Royal blue raw silk with gold zari-thread borders.',
  },
  {
    id: 'rack-15',
    name: 'SUPRIYA PLUM RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 4000,
    image: '/assets/crops/rack_hb_plum.png',
    backImage: '/assets/crops/rack_hb_plum.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Imperial Plum',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Plum raw silk with fine antique gold threadwork.',
  },
  {
    id: 'rack-16',
    name: 'SUPRIYA SAGE RAW SILK BLOUSE',
    category: 'half-blouse',
    price: 3400,
    image: '/assets/crops/rack_hb_sage.png',
    backImage: '/assets/crops/rack_hb_sage.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Sage Green',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Muted sage raw silk, a quiet match for ivory and gold sarees.',
  },
  {
    id: 'rack-17',
    name: 'SUPRIYA EMERALD FULL-SLEEVE BLOUSE',
    category: 'full-blouse',
    price: 4600,
    image: '/assets/crops/rack_fb_emerald.png',
    backImage: '/assets/crops/rack_fb_emerald.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Emerald Green',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Full-sleeve emerald raw silk with embroidered cuffs.',
    badge: 'Full Sleeve',
  },
  {
    id: 'rack-18',
    name: 'SUPRIYA MAROON FULL-SLEEVE BLOUSE',
    category: 'full-blouse',
    price: 4800,
    image: '/assets/crops/rack_fb_maroon.png',
    backImage: '/assets/crops/rack_fb_maroon.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Temple Maroon',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Full-sleeve maroon silk with zardozi cuffs and neckline.',
    badge: 'Full Sleeve',
  },
  {
    id: 'rack-19',
    name: 'SUPRIYA ROSE FULL-SLEEVE BLOUSE',
    category: 'full-blouse',
    price: 4400,
    image: '/assets/crops/rack_fb_rose.png',
    backImage: '/assets/crops/rack_fb_rose.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Rose Pink',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Full-sleeve rose raw silk, hand-embroidered cuffs.',
    badge: 'Full Sleeve',
  },
  {
    id: 'rack-20',
    name: 'SUPRIYA TEAL FULL-SLEEVE BLOUSE',
    category: 'full-blouse',
    price: 4500,
    image: '/assets/crops/rack_fb_teal.png',
    backImage: '/assets/crops/rack_fb_teal.png',
    fabric: 'Pure Raw Silk with Maggam Embroidery',
    zari: 'Antique Gold Zardozi & Threadwork',
    color: 'Peacock Teal',
    origin: 'Hand-embroidered in Chennai Atelier',
    description: 'Full-sleeve teal raw silk with maggam work.',
    badge: 'Full Sleeve',
  },
  {
    id: 'rack-21',
    name: 'SUPRIYA PARROT GREEN KORVAI HALF SAREE',
    category: 'half-sarees',
    price: 18500,
    image: '/assets/crops/rack_rh_parrot.png',
    backImage: '/assets/crops/rack_rh_parrot.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Parrot Green',
    origin: 'Handloomed in Kanchipuram',
    description: 'Pavadai set with contrast korvai border and matching dupatta.',
  },
  {
    id: 'rack-22',
    name: 'SUPRIYA ROSE TISSUE LANGA VONI',
    category: 'half-sarees',
    price: 21500,
    image: '/assets/crops/rack_rh_rose.png',
    backImage: '/assets/crops/rack_rh_rose.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Rose Tissue',
    origin: 'Handloomed in Kanchipuram',
    description: 'Tissue langa voni with fine zari border for festive days.',
  },
  {
    id: 'rack-23',
    name: 'SUPRIYA MARIGOLD HALF SAREE',
    category: 'half-sarees',
    price: 19800,
    image: '/assets/crops/rack_rh_orange.png',
    backImage: '/assets/crops/rack_rh_orange.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Marigold Orange',
    origin: 'Handloomed in Kanchipuram',
    description: 'Marigold half saree with contrast green korvai border.',
  },
  {
    id: 'rack-24',
    name: 'SUPRIYA SAPPHIRE CHECK HALF SAREE',
    category: 'half-sarees',
    price: 17800,
    image: '/assets/crops/rack_rh_blue.png',
    backImage: '/assets/crops/rack_rh_blue.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Sapphire Check',
    origin: 'Handloomed in Kanchipuram',
    description: 'Kattam-check half saree with zari border, cut for young drapers.',
  },
  {
    id: 'rack-25',
    name: 'SUPRIYA EMERALD KORVAI PATTU',
    category: 'silk-sarees',
    price: 35500,
    image: '/assets/crops/rack_rs_emerald.png',
    backImage: '/assets/crops/rack_rs_emerald.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Emerald Green',
    origin: 'Handloomed in Kanchipuram',
    description: 'Emerald body with contrast korvai temple border.',
    badge: 'New In',
  },
  {
    id: 'rack-26',
    name: 'SUPRIYA TEMPLE MAROON RANI PATTU',
    category: 'silk-sarees',
    price: 33800,
    image: '/assets/crops/rack_rs_maroon.png',
    backImage: '/assets/crops/rack_rs_maroon.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Temple Maroon',
    origin: 'Handloomed in Kanchipuram',
    description: 'Deep temple maroon with real zari border and rich pallu.',
  },
  {
    id: 'rack-27',
    name: 'SUPRIYA PEACOCK TEAL PATTU',
    category: 'silk-sarees',
    price: 34200,
    image: '/assets/crops/rack_rs_teal.png',
    backImage: '/assets/crops/rack_rs_teal.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Peacock Teal',
    origin: 'Handloomed in Kanchipuram',
    description: 'Peacock teal drape with antique zari butta and border.',
  },
  {
    id: 'rack-28',
    name: 'SUPRIYA MARIGOLD KORVAI PATTU',
    category: 'silk-sarees',
    price: 34800,
    image: '/assets/crops/rack_rs_orange.png',
    backImage: '/assets/crops/rack_rs_orange.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Marigold Orange',
    origin: 'Handloomed in Kanchipuram',
    description: 'Marigold silk with temple border, made for auspicious days.',
  },
  {
    id: 'rack-29',
    name: 'SUPRIYA PARROT GREEN KATTAM CHECK',
    category: 'checked-sarees',
    price: 24800,
    image: '/assets/crops/rack_rc_green.png',
    backImage: '/assets/crops/rack_rc_green.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Parrot Green Checks',
    origin: 'Handloomed in Kanchipuram',
    description: 'Bright kattam checks on pure Kanchipuram silk.',
  },
  {
    id: 'rack-30',
    name: 'SUPRIYA VERMILION CHECK HERITAGE',
    category: 'checked-sarees',
    price: 25600,
    image: '/assets/crops/rack_rc_red.png',
    backImage: '/assets/crops/rack_rc_red.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Vermilion & Gold Checks',
    origin: 'Handloomed in Kanchipuram',
    description: 'Vermilion checks with a rich gold zari border.',
  },
  {
    id: 'rack-31',
    name: 'SUPRIYA ROSE GOLD TEMPLE BROCADE',
    category: 'zari-brocade',
    price: 38500,
    image: '/assets/crops/rack_rz_rosegold.png',
    backImage: '/assets/crops/rack_rz_rosegold.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Rose Gold',
    origin: 'Handloomed in Kanchipuram',
    description: 'Rose-gold gopuram brocade with a heavy pallu.',
  },
  {
    id: 'rack-32',
    name: 'SUPRIYA EMERALD TEMPLE BROCADE',
    category: 'zari-brocade',
    price: 37500,
    image: '/assets/crops/rack_rz_green.png',
    backImage: '/assets/crops/rack_rz_green.png',
    fabric: 'Pure Kanchipuram Silk',
    zari: 'Silver-core Real Zari',
    color: 'Emerald Gold',
    origin: 'Handloomed in Kanchipuram',
    description: 'Emerald temple brocade with antique gold zari.',
  },
];

// 5. THE MUSE REELS DATA
export const MUSE_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    reelNumber: 'REEL 04',
    duration: '0:15',
    fabricType: 'KANJIVARAM SILK',
    title: 'Pachai Pattu',
    location: "The bride's chamber",
    image: '/assets/crops/reel_pachai_pattu.jpg',
    aspect: 'vertical',
  },
  {
    id: 'reel-2',
    reelNumber: 'REEL 05',
    duration: '0:38',
    fabricType: 'GEORGETTE SILK',
    title: 'Galli Sindoor',
    location: 'Old-city lanes',
    image: '/assets/crops/reel_galli_sindoor.jpg',
    aspect: 'vertical',
  },
  {
    id: 'reel-3',
    reelNumber: 'REEL 03',
    duration: '0:17',
    fabricType: 'BANARASI KATAN',
    title: 'Kaali Banarasi',
    location: 'Sisodia, Varanasi red',
    image: '/assets/crops/reel_kaali_banarasi.jpg',
    aspect: 'vertical',
  },
  {
    id: 'reel-4',
    reelNumber: 'REEL 01',
    duration: '0:16',
    fabricType: 'TISSUE KANJIVARAM',
    title: 'Ponni Kanjivaram',
    location: 'Lamp room, Kanchipuram',
    image: '/assets/crops/reel_ponni_kanjivaram.jpg',
    aspect: 'vertical',
  },
  {
    id: 'reel-5',
    reelNumber: 'REEL 02',
    duration: '0:21',
    fabricType: 'HAND-BLOCK COTTON',
    title: 'Marina Morning',
    location: 'Mylapore to the sea',
    image: '/assets/crops/reel_marina_morning.jpg',
    aspect: 'vertical',
  },
];

// 6. THE BRIDAL COLLECTION DATA
export const BRIDAL_COLLECTION: BridalItem[] = [
  {
    id: 'bridal-1',
    name: 'Manjal Kalyanam Pattu',
    fabric: 'Pure Kanchipuram Pattu',
    pallu: 'Red-gold heavy temple pallu',
    price: 27300,
    originalPrice: 30300,
    discount: '-10%',
    image: '/assets/crops/bridal_manjal_kalyanam.jpg',
    description: 'The golden yellow of morning mantras, bordered in deep vermillion and woven with pure zari auspicious elephants.',
  },
  {
    id: 'bridal-2',
    name: 'Rani Muhurtham Brocade',
    fabric: 'Silk Katan Brocade',
    pallu: 'Antique gold peacock tier',
    price: 34500,
    originalPrice: 38500,
    discount: '-10%',
    image: '/assets/crops/bridal_left_pink.jpg',
    description: 'A regal vermillion-crimson drape engineered for the sacred walking around the agni kunda.',
  },
  {
    id: 'bridal-3',
    name: 'Vaidyanathan Emerald Pattu',
    fabric: 'Double Warp Korvai Silk',
    pallu: 'Chakra and rudraksha gold tier',
    price: 36800,
    image: '/assets/crops/bridal_right_green.jpg',
    description: 'Deep temple bottle green with majestic copper-gold zari borders, worn for evening bridal receptions.',
  },
  {
    id: 'bridal-4',
    name: 'Sindooram Heritage Kanjeevaram',
    fabric: 'Pure Mulberry Silk',
    pallu: 'Real silver-core zari',
    price: 41000,
    discount: '-15%',
    image: '/assets/crops/bridal_far_left_red.jpg',
    description: 'A sacred family heirloom weave that remains lustrous across decades of sacred celebrations.',
  },
  {
    id: 'bridal-5',
    name: 'Swarna Katan Wedding Robe',
    fabric: 'Full Tissue Brocade',
    pallu: '24K gold electroplated pallu',
    price: 48500,
    image: '/assets/crops/bridal_far_right_gold.jpg',
    description: 'Pure ceremonial splendour: gold thread interwoven into every warp and weft.',
  },
];
