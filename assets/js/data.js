/**
 * L'OPTIQUE - Maison de Lunetterie
 * Master Data Layer: Brands & Products Catalog
 */

const BRANDS_DATA = [
  {
    id: "ray-ban",
    name: "Ray-Ban",
    origin: "United States / Italy",
    founded: 1937,
    tagline: "Timeless Cultural Icons & Aviation Heritage",
    heroImage: "assets/images/brand-rayban.jpg",
    bio: "Founded in 1937 to protect US Army Air Corps pilots from high-altitude glare, Ray-Ban defined the aesthetic of modern eyewear. From the gold-wire Aviator to the cinematic Wayfarer, Ray-Ban frames remain the quintessential symbol of effortless rebellion, rock-and-roll culture, and timeless optical design.",
    signatureFeatures: [
      "Mineral Crystal G-15 & B-15 High-Definition Lenses",
      "Corrosion-Resistant Precision Wire & Sculpted Italian Acetate",
      "Signature Hand-Stamped White Script Logo & Double Bridge",
      "Ergonomic Adjustable Silicone Nosepads & Monoblock Hinges"
    ],
    priceRange: "$175 – $260",
    aesthetic: "Classic Heritage / Cultural Icon"
  },
  {
    id: "persol",
    name: "Persol",
    origin: "Turin, Italy",
    founded: 1917,
    tagline: "Handcrafted Italian Artistry with the Iconic Silver Arrow",
    heroImage: "assets/images/brand-persol.jpg",
    bio: "Persol—derived from the Italian 'per il sole' ('for the sun')—represents over a century of artisanal excellence born in Turin. Celebrated by Steve McQueen and European cinema legends, each Persol frame requires over thirty painstaking steps, featuring the patented Meflecto flexible temple system and the world-famous Supreme Arrow.",
    signatureFeatures: [
      "Patented Meflecto Flexible Stem for Zero Temple Pressure",
      "Hand-Polished Natural Cotton Cellulose Acetate",
      "The Supreme Silver Arrow Hinge of True Italian Craftsmanship",
      "Crystal Glare-Free Lenses Formed from Pure Natural Silicates"
    ],
    priceRange: "$310 – $440",
    aesthetic: "Italian Artisanal / Sartorial Elegance"
  },
  {
    id: "oliver-peoples",
    name: "Oliver Peoples",
    origin: "Los Angeles, California",
    founded: 1987,
    tagline: "Discreet Intellectual Luxury & Vintage Architecture",
    heroImage: "assets/images/brand-oliverpeoples.jpg",
    bio: "Born in the heart of West Hollywood's Sunset Boulevard, Oliver Peoples rejected logo-heavy 1980s trends in favor of understated, vintage-inspired frames with meticulous architectural proportions. Handcrafted with custom-hued filigreed core wire and bespoke Italian acetate, Oliver Peoples is the choice of scholars, architects, and discerning connoisseurs.",
    signatureFeatures: [
      "Discreet Logo-Free Aesthetics with Custom Engraved Filigree Core Wire",
      "Exclusive Bespoke Custom-Dyed Italian Acetate Colorways",
      "Architectural Proportions Tuned for Balanced Facial Symmetry",
      "Hand-Laid Pin Hinges with Superior Structural Longevity"
    ],
    priceRange: "$390 – $495",
    aesthetic: "Intellectual Luxury / Vintage Mid-Century"
  },
  {
    id: "oakley",
    name: "Oakley",
    origin: "Foothill Ranch, California",
    founded: 1975,
    tagline: "Pioneering Optical Physics & High-Velocity Performance",
    heroImage: "assets/images/brand-oakley.jpg",
    bio: "Born from an obsessive pursuit of pushing human performance, Oakley holds over 800 worldwide patents in optical science and material engineering. Designed for Olympic athletes and speed enthusiasts, Oakley blends High Definition Optics® (HDO®) with featherweight O Matter™ frames to conquer extreme environments.",
    signatureFeatures: [
      "Prizm™ Lens Technology Engineered to Enhance Color and Contrast",
      "Stress-Resistant, Ultralight O Matter™ Frame Architecture",
      "Unobtainium® Hydrophilic Earsocks for Superior Grip Under Perspiration",
      "Impact Protection Tested Under Extreme High-Velocity Conditions"
    ],
    priceRange: "$165 – $265",
    aesthetic: "Cutting-Edge Performance / Aerodynamic Shield"
  },
  {
    id: "vogue-eyewear",
    name: "Vogue Eyewear",
    origin: "Milan, Italy",
    founded: 1973,
    tagline: "Vibrant Runway Glamour & Contemporary Silhouettes",
    heroImage: "assets/images/brand-vogue.jpg",
    bio: "Capturing the exuberant energy of Milan Fashion Week, Vogue Eyewear translates runway trends into wearable optical statements. With playful geometric profiles, warm Mediterranean tortoises, and delicate rose-gold metalwork, the brand empowers self-expression and effortless cosmopolitan chic.",
    signatureFeatures: [
      "Bold Geometrics, Cat-Eyes, and Modern Butterfly Silhouettes",
      "Luminous Gradient Lenses with Complete UV400 Protection",
      "Lightweight Hypoallergenic Metal and Glossy Molded Acetate",
      "Contemporary Color Palettes Inspired by High Fashion Runways"
    ],
    priceRange: "$130 – $160",
    aesthetic: "Fashion-Forward / Milanese Runway Chic"
  }
];

const PRODUCTS_DATA = [
  // RAY-BAN
  {
    id: "rb-aviator-classic",
    name: "Aviator Classic Gold",
    brandId: "ray-ban",
    brandName: "Ray-Ban",
    modelNumber: "RB3025 L0205",
    sku: "EYE-RB-3025-GLD",
    category: "Sunglasses",
    gender: "Unisex",
    frameShape: "Aviator",
    frameMaterial: "Gold-Plated Metal Alloy",
    price: 210,
    inStock: true,
    boutiqueStatus: "Available in Flagship Boutique",
    badge: "Heritage Icon",
    featured: true,
    rating: 4.9,
    reviewsCount: 148,
    colors: [
      { name: "Arista Gold / G-15 Green", hex: "#d4af37" },
      { name: "Gunmetal / Polarized Grey", hex: "#4a4e57" },
      { name: "Polished Black / Green", hex: "#1a1a1a" }
    ],
    dimensions: {
      lensWidth: "58 mm",
      bridgeWidth: "14 mm",
      templeLength: "135 mm",
      frameHeight: "50 mm"
    },
    faceFit: "Standard / Medium to Wide",
    description: "Originally designed in 1937 for US aviators, the Ray-Ban Aviator Classic is one of the most iconic sunglass models in human history. Featuring a timeless teardrop lens geometry, ultra-slim Arista gold-plated wire frame, and signature G-15 mineral crystal lenses offering outstanding clarity and 100% UV protection.",
    craftsmanship: "Precision soldered metal joints, double-bridge browbar reinforcement, hand-fitted silicone nosepads, and scratch-resistant solid glass lenses ground to optical perfection.",
    features: [
      "Legendary G-15 Solid Green Glass Lenses",
      "High-Clarity Natural Mineral Crystal",
      "Corrosion-Proof Arista Gold Plated Frame",
      "Laser-Etched RB Monogram on Left Lens"
    ],
    primaryImage: "assets/images/brand-rayban.jpg",
    gallery: [
      "assets/images/brand-rayban.jpg",
      "assets/images/hero-lifestyle.jpg",
      "assets/images/style-sunglasses.jpg"
    ]
  },
  {
    id: "rb-original-wayfarer",
    name: "Original Wayfarer Classic",
    brandId: "ray-ban",
    brandName: "Ray-Ban",
    modelNumber: "RB2140 901",
    sku: "EYE-RB-2140-BLK",
    category: "Sunglasses",
    gender: "Unisex",
    frameShape: "Wayfarer",
    frameMaterial: "Sculpted Acetate",
    price: 185,
    inStock: true,
    boutiqueStatus: "In Stock at Boutiques",
    badge: "Cultural Staple",
    featured: true,
    rating: 4.8,
    reviewsCount: 132,
    colors: [
      { name: "Gloss Polished Black", hex: "#111111" },
      { name: "Tortoise Havana", hex: "#633c1f" }
    ],
    dimensions: {
      lensWidth: "50 mm",
      bridgeWidth: "22 mm",
      templeLength: "150 mm",
      frameHeight: "44 mm"
    },
    faceFit: "Medium Fit with Distinct Forward Tilt",
    description: "The Ray-Ban Original Wayfarer Classic is arguably the most recognizable style in the history of eyewear. Since its initial design in 1952, the Wayfarer gained popularity among celebrities, musicians, artists, and those with an impeccable fashion sense.",
    craftsmanship: "Milled from dense, high-grade Italian acetate block, featuring heavy-duty 7-barrel hinges, silver horizontal rivets, and the unmistakable forward pantoscopic tilt.",
    features: [
      "Iconic 1952 Silhouette with Signature Tilt",
      "Durable 7-Barrel Steel Hinges",
      "Signature Raised Metallic Temple Plaques",
      "Absorbs 85% of Visible Light with Total UV400 Block"
    ],
    primaryImage: "assets/images/editorial-campaign.jpg",
    gallery: [
      "assets/images/editorial-campaign.jpg",
      "assets/images/brand-rayban.jpg",
      "assets/images/style-statement.jpg"
    ]
  },
  {
    id: "rb-clubmaster-classic",
    name: "Clubmaster Classic Browline",
    brandId: "ray-ban",
    brandName: "Ray-Ban",
    modelNumber: "RB3016 W0365",
    sku: "EYE-RB-3016-MBK",
    category: "Sunglasses",
    gender: "Unisex",
    frameShape: "Square",
    frameMaterial: "Combination Acetate & Metal",
    price: 195,
    inStock: true,
    boutiqueStatus: "Ready for Private Fitting",
    badge: "Retro Intellectual",
    featured: true,
    rating: 4.8,
    reviewsCount: 96,
    colors: [
      { name: "Ebony Black & Gold", hex: "#1c1c1c" },
      { name: "Mock Tortoise & Arista Gold", hex: "#543825" }
    ],
    dimensions: {
      lensWidth: "51 mm",
      bridgeWidth: "21 mm",
      templeLength: "145 mm",
      frameHeight: "43 mm"
    },
    faceFit: "Universal Medium Fit",
    description: "Retro and timeless, the Clubmaster was inspired by the intellectual 1950s counterculture movement. The distinctive upper browline frame gives structural prominence to the eyebrows while maintaining featherweight comfort.",
    craftsmanship: "Master combination of polished acetate upper brow and temples with finely grooved gold-plated wire rims and adjustable bridge.",
    features: [
      "Classic Mid-Century Browline Architecture",
      "Textured Gold-Tone Wire Bridge Details",
      "Adjustable Hypoallergenic Nosepads",
      "Green G-15 Crystal Glass Lenses"
    ],
    primaryImage: "assets/images/style-sunglasses.jpg",
    gallery: [
      "assets/images/style-sunglasses.jpg",
      "assets/images/brand-rayban.jpg",
      "assets/images/boutique-store.jpg"
    ]
  },
  {
    id: "rb-round-metal",
    name: "Round Metal Legend",
    brandId: "ray-ban",
    brandName: "Ray-Ban",
    modelNumber: "RB3447 001",
    sku: "EYE-RB-3447-GLD",
    category: "Optical",
    gender: "Unisex",
    frameShape: "Round",
    frameMaterial: "Lightweight Metal",
    price: 178,
    inStock: true,
    boutiqueStatus: "Optical Lab Ready",
    badge: "Bohemian Classic",
    featured: false,
    rating: 4.7,
    reviewsCount: 84,
    colors: [
      { name: "Polished Gold Wire", hex: "#cfb06b" },
      { name: "Antique Copper", hex: "#8c5b3e" },
      { name: "Silver Chrome", hex: "#c0c0c0" }
    ],
    dimensions: {
      lensWidth: "50 mm",
      bridgeWidth: "21 mm",
      templeLength: "145 mm",
      frameHeight: "47 mm"
    },
    faceFit: "Narrow to Medium Fit",
    description: "A counter-culture icon that first emerged in the late 1960s, the Ray-Ban Round Metal features striking curved brow bars, adjustable nosepads, and ultra-thin metal temples with clear plastic tips that rest comfortably behind the ears.",
    craftsmanship: "Delicately engraved filigree on bridge and temple wires, fabricated with flexible spring tension and precision lens beveling.",
    features: [
      "Perfect Circular Lens Geometry",
      "Subtle Bridge Wire Engravings",
      "Prescription Ready with Demo Optical Lenses",
      "Featherweight All-Day Wearing Profile"
    ],
    primaryImage: "assets/images/style-optical.jpg",
    gallery: [
      "assets/images/style-optical.jpg",
      "assets/images/style-minimalist.jpg",
      "assets/images/hero-lifestyle.jpg"
    ]
  },

  // PERSOL
  {
    id: "persol-714-steve-mcqueen",
    name: "Persol 714 Series Folding",
    brandId: "persol",
    brandName: "Persol",
    modelNumber: "PO0714 24/51",
    sku: "EYE-PO-0714-HAV",
    category: "Sunglasses",
    gender: "Unisex",
    frameShape: "Aviator",
    frameMaterial: "Handcrafted Italian Acetate",
    price: 420,
    inStock: true,
    boutiqueStatus: "Hand-Crafted Batch in Stock",
    badge: "Collector's Piece",
    featured: true,
    rating: 5.0,
    reviewsCount: 165,
    colors: [
      { name: "Havana Tortoise / Brown Gradient", hex: "#5a3418" },
      { name: "Caffè / Polarized Blue", hex: "#3b251a" },
      { name: "Gloss Black / Green", hex: "#0f0f10" }
    ],
    dimensions: {
      lensWidth: "54 mm",
      bridgeWidth: "21 mm",
      templeLength: "140 mm",
      frameHeight: "49 mm"
    },
    faceFit: "Medium to Wide Fit",
    description: "Introduced in the 1960s as a folding evolution of the iconic 649, the Persol 714 was immortalized by Steve McQueen on the set of The Thomas Crown Affair. Requiring 10 additional engineering steps to integrate inward-folding hinges at bridge and temples, it folds cleanly into a pocket-sized leather pouch.",
    craftsmanship: "Meticulously hand-assembled in Lauriano, Italy. Equipped with Persol's patented Meflecto cylinders that relieve temple pressure, along with the stainless steel folding joints and hand-buffed acetate.",
    features: [
      "Original 1960s Patented Folding Mechanism",
      "Signature Silver Arrow Hinge Detailing",
      "Meflecto Flexible Stem Comfort System",
      "Includes Handcrafted Italian Leather Clamshell Case"
    ],
    primaryImage: "assets/images/brand-persol.jpg",
    gallery: [
      "assets/images/brand-persol.jpg",
      "assets/images/style-sunglasses.jpg",
      "assets/images/boutique-store.jpg"
    ]
  },
  {
    id: "persol-649-original",
    name: "Persol 649 Original Vintage",
    brandId: "persol",
    brandName: "Persol",
    modelNumber: "PO0649 95/31",
    sku: "EYE-PO-0649-BLK",
    category: "Sunglasses",
    gender: "Men",
    frameShape: "Aviator",
    frameMaterial: "Italian Cotton Acetate",
    price: 380,
    inStock: true,
    boutiqueStatus: "Boutique Display Available",
    badge: "Italian Masterpiece",
    featured: true,
    rating: 4.9,
    reviewsCount: 110,
    colors: [
      { name: "Gloss Nero / Green Crystal", hex: "#111111" },
      { name: "Vintage Havana / Brown", hex: "#6d4120" },
      { name: "Terra di Siena / Blue", hex: "#874d2b" }
    ],
    dimensions: {
      lensWidth: "54 mm",
      bridgeWidth: "20 mm",
      templeLength: "140 mm",
      frameHeight: "51 mm"
    },
    faceFit: "Standard Universal Fit",
    description: "Designed in 1957 for Turin tram-drivers who needed protection against air and dust, the 649 quickly evolved into an icon of Italian cinema when Marcello Mastroianni wore it in Divorce Italian Style. Its prominent keyhole bridge and tear-drop silhouette remain unrivaled.",
    craftsmanship: "Cut from single cotton cellulose acetate blocks, aged for stabilization, and hand-finished with Victor Flex bridge cutouts providing subtle flex across the nose.",
    features: [
      "Iconic Victor Flex Triple-Notch Bridge",
      "Supreme Silver Arrow Temple Junction",
      "Hand-Polished Organic Cotton Acetate",
      "Crystal Lenses Offering Maximum UV Glare Reduction"
    ],
    primaryImage: "assets/images/style-sunglasses.jpg",
    gallery: [
      "assets/images/style-sunglasses.jpg",
      "assets/images/brand-persol.jpg",
      "assets/images/hero-lifestyle.jpg"
    ]
  },
  {
    id: "persol-3007v-optical",
    name: "Persol PO3007V Handcrafted",
    brandId: "persol",
    brandName: "Persol",
    modelNumber: "PO3007V 24",
    sku: "EYE-PO-3007-HAV",
    category: "Optical",
    gender: "Unisex",
    frameShape: "Square",
    frameMaterial: "Cellulose Acetate",
    price: 310,
    inStock: true,
    boutiqueStatus: "Optical Fitting Ready",
    badge: "Sartorial Eyewear",
    featured: true,
    rating: 4.8,
    reviewsCount: 78,
    colors: [
      { name: "Classic Havana Tortoise", hex: "#52331c" },
      { name: "Striped Brown & Grey", hex: "#48433d" },
      { name: "Black Polish", hex: "#17181c" }
    ],
    dimensions: {
      lensWidth: "52 mm",
      bridgeWidth: "18 mm",
      templeLength: "145 mm",
      frameHeight: "41 mm"
    },
    faceFit: "Medium Fit",
    description: "The PO3007V is the definitive Italian intellectual optical frame. With clean, square proportions and a subtle keyhole bridge, it exudes tailored elegance suited for formal suiting, creative studios, and daily optical wear.",
    craftsmanship: "Crafted with embedded Meflecto comfort cylinders, micro-beveled inner temple contours, and genuine silver arrow rivets anchored firmly through the acetate.",
    features: [
      "Ergonomic Keyhole Bridge Architecture",
      "Dual Meflecto Flexible Temple Inserts",
      "Prescription-Ready Optical Quality Rim Bevel",
      "Rich Depth of Natural Cellulose Acetate Pigments"
    ],
    primaryImage: "assets/images/brand-persol.jpg",
    gallery: [
      "assets/images/brand-persol.jpg",
      "assets/images/style-optical.jpg",
      "assets/images/boutique-store.jpg"
    ]
  },

  // OLIVER PEOPLES
  {
    id: "op-gregory-peck",
    name: "Gregory Peck 1962 Optical",
    brandId: "oliver-peoples",
    brandName: "Oliver Peoples",
    modelNumber: "OV5186 1005",
    sku: "EYE-OP-5186-AMB",
    category: "Optical",
    gender: "Unisex",
    frameShape: "Round",
    frameMaterial: "Bespoke Italian Acetate",
    price: 440,
    inStock: true,
    boutiqueStatus: "Flagship Exclusive",
    badge: "Cinema Icon",
    featured: true,
    rating: 5.0,
    reviewsCount: 154,
    colors: [
      { name: "Semi-Matte Amber / Honey", hex: "#be7c39" },
      { name: "Cocobolo Brown Tortoise", hex: "#472b1d" },
      { name: "Washed Lapis Blue", hex: "#2b3d54" }
    ],
    dimensions: {
      lensWidth: "47 mm",
      bridgeWidth: "23 mm",
      templeLength: "150 mm",
      frameHeight: "44 mm"
    },
    faceFit: "Narrow to Medium / Intellectual Round Fit",
    description: "Designed in collaboration with the Peck Estate to commemorate the 50th anniversary of To Kill a Mockingbird, this frame is inspired by the iconic signature glasses worn by Gregory Peck as Atticus Finch. Featuring a distinguished keyhole bridge and classic retro rounded silhouette.",
    craftsmanship: "Custom handcrafted Japanese-tooled hardware with custom filigree engraved wire core visible through transparent amber acetate, secured with genuine hand-drilled pins.",
    features: [
      "Authentic Peck Estate Commemorative Design",
      "Subtle Hand-Inlaid Functional Silver Pin Hinges",
      "Custom Engraved Internal Filigree Core Wire",
      "Discreet Breath Logo Inlaid on Lens"
    ],
    primaryImage: "assets/images/brand-oliverpeoples.jpg",
    gallery: [
      "assets/images/brand-oliverpeoples.jpg",
      "assets/images/hero-lifestyle.jpg",
      "assets/images/style-optical.jpg"
    ]
  },
  {
    id: "op-sheldrake-sun",
    name: "Sheldrake Sun Acetate",
    brandId: "oliver-peoples",
    brandName: "Oliver Peoples",
    modelNumber: "OV5036S 1003/53",
    sku: "EYE-OP-5036-COCO",
    category: "Sunglasses",
    gender: "Unisex",
    frameShape: "Square",
    brandCollection: "Heritage Core",
    frameMaterial: "Handcrafted Acetate",
    price: 460,
    inStock: true,
    boutiqueStatus: "Limited Quantity Available",
    badge: "Discreet Luxury",
    featured: true,
    rating: 4.9,
    reviewsCount: 104,
    colors: [
      { name: "Cocobolo Tortoise / Vibrant Green", hex: "#3e2417" },
      { name: "Buff Crystal / Mirror Gold", hex: "#d9c49a" },
      { name: "Black / G-15 Polarized", hex: "#16171a" }
    ],
    dimensions: {
      lensWidth: "49 mm",
      bridgeWidth: "22 mm",
      templeLength: "145 mm",
      frameHeight: "45 mm"
    },
    faceFit: "Medium Fit",
    description: "Inspired by Andy Warhol and 1960s pop-art intellectuals, the Sheldrake is an impeccably balanced bold frame. Its rounded square contour and pronounced keyhole bridge make it one of the most celebrated silhouettes in modern luxury optical design.",
    craftsmanship: "Milled with vintage-grade Japanese custom acetate cutters, hand-tumbled for 72 hours in organic birch chips, and finished with Oliver Peoples' iconic understated temple pins.",
    features: [
      "Andy Warhol-Inspired Architectural Silhouette",
      "Rare Custom Polarized Mineral Glass Lenses",
      "Featherweight Anti-Reflective Backside Coating",
      "Pure Logo-Free Minimalist Exterior"
    ],
    primaryImage: "assets/images/editorial-campaign.jpg",
    gallery: [
      "assets/images/editorial-campaign.jpg",
      "assets/images/brand-oliverpeoples.jpg",
      "assets/images/style-sunglasses.jpg"
    ]
  },
  {
    id: "op-finley-vintage",
    name: "Finley Vintage Keyhole",
    brandId: "oliver-peoples",
    brandName: "Oliver Peoples",
    modelNumber: "OV5298U 1492",
    sku: "EYE-OP-5298-BLK",
    category: "Optical",
    gender: "Unisex",
    frameShape: "Square",
    frameMaterial: "Bespoke Acetate",
    price: 415,
    inStock: true,
    boutiqueStatus: "In Stock at Boutiques",
    badge: "Timeless Minimalist",
    featured: false,
    rating: 4.8,
    reviewsCount: 63,
    colors: [
      { name: "Midnight Black Polish", hex: "#141416" },
      { name: "Bark Tortoise", hex: "#523828" },
      { name: "Vintage Grey Crystal", hex: "#7a7d85" }
    ],
    dimensions: {
      lensWidth: "51 mm",
      bridgeWidth: "20 mm",
      templeLength: "145 mm",
      frameHeight: "41 mm"
    },
    faceFit: "Medium to Wide Fit",
    description: "The Finley Vintage embodies quiet sophistication. With its ultra-refined keyhole bridge, tapered temple tips, and featherlight profile, it is engineered for effortless daily comfort without sacrificing sartorial poise.",
    craftsmanship: "Engineered with three-barrel custom hinges, precision beveling on the inner face for reduced eye irritation, and hand-embossed temple filigrees.",
    features: [
      "Refined Narrow Temple Silhouette",
      "Custom Carved Keyhole Nose Bridge",
      "Hand-Polished Beveled Rim Perimeter",
      "Prescription Optimized Geometry"
    ],
    primaryImage: "assets/images/style-optical.jpg",
    gallery: [
      "assets/images/style-optical.jpg",
      "assets/images/brand-oliverpeoples.jpg",
      "assets/images/boutique-store.jpg"
    ]
  },

  // OAKLEY
  {
    id: "oakley-radar-ev-path",
    name: "Radar EV Path Prizm Sapphire",
    brandId: "oakley",
    brandName: "Oakley",
    modelNumber: "OO9208-7338",
    sku: "EYE-OK-9208-SAP",
    category: "Sunglasses",
    gender: "Unisex",
    frameShape: "Wrap",
    frameMaterial: "O Matter™ Lightweight Composite",
    price: 240,
    inStock: true,
    boutiqueStatus: "Performance Lab Stock",
    badge: "Apex Performance",
    featured: true,
    rating: 4.9,
    reviewsCount: 210,
    colors: [
      { name: "Matte Black / Prizm Sapphire", hex: "#2b569a" },
      { name: "Polished White / Prizm Road", hex: "#a83232" },
      { name: "Carbon Fiber / Prizm Black", hex: "#222222" }
    ],
    dimensions: {
      lensWidth: "138 mm (Shield)",
      bridgeWidth: "0 mm (Rimless Bridge)",
      templeLength: "128 mm",
      frameHeight: "50 mm"
    },
    faceFit: "Sport Wrap / High Coverage",
    description: "A milestone in sports performance optics, the Radar® EV advances innovation with an extended range of view in the upper peripheral region. Designed with aerodynamic cooling channels and interchangeable lens architecture.",
    craftsmanship: "Ultralight stress-resistant O Matter™ frame material with Unobtainium® earsocks and nosepads that increase grip when wet with perspiration.",
    features: [
      "Prizm™ Lenses Tuned for High-Speed Visual Acuity",
      "High Definition Optics® (HDO®) Certified for Impact",
      "Unobtainium® Non-Slip Contact Points",
      "Aerodynamic Airflow Channels to Eliminate Fogging"
    ],
    primaryImage: "assets/images/brand-oakley.jpg",
    gallery: [
      "assets/images/brand-oakley.jpg",
      "assets/images/style-statement.jpg",
      "assets/images/boutique-store.jpg"
    ]
  },
  {
    id: "oakley-holbrook-prizm",
    name: "Holbrook Prizm Black Matte",
    brandId: "oakley",
    brandName: "Oakley",
    modelNumber: "OO9102-E855",
    sku: "EYE-OK-9102-BLK",
    category: "Sunglasses",
    gender: "Men",
    frameShape: "Square",
    frameMaterial: "O Matter™ Composite",
    price: 192,
    inStock: true,
    boutiqueStatus: "Available in Boutique",
    badge: "Best Seller",
    featured: true,
    rating: 4.8,
    reviewsCount: 175,
    colors: [
      { name: "Matte Black / Prizm Black Polarized", hex: "#1c1c1f" },
      { name: "Woodgrain / Prizm Daily", hex: "#5e4231" },
      { name: "Crystal Clear / Prizm Violet", hex: "#6f42c1" }
    ],
    dimensions: {
      lensWidth: "55 mm",
      bridgeWidth: "18 mm",
      templeLength: "137 mm",
      frameHeight: "43 mm"
    },
    faceFit: "Medium to Large Fit",
    description: "Holbrook is a timeless, classic design fused with modern Oakley technology. Inspired by the screen heroes from the 1940s, 50s, and 60s, this design epitomizes the spirit of exploration and adventure with metal rivets and Oakley icons.",
    craftsmanship: "Cast in lightweight O Matter™ with square-riveted temple hinges, 6-base lens curvature for optimal peripheral glare shielding, and plutonite impact-proof lenses.",
    features: [
      "Twin Metal Front Accents and Metal Icon Plaque",
      "6-Base Lens Curvature for Enhanced Field of Vision",
      "Plutonite® Lens Filtering 100% of UVA, UVB, UVC",
      "Featherlight Stress-Resistant Durability"
    ],
    primaryImage: "assets/images/style-statement.jpg",
    gallery: [
      "assets/images/style-statement.jpg",
      "assets/images/brand-oakley.jpg",
      "assets/images/style-sunglasses.jpg"
    ]
  },
  {
    id: "oakley-frogskins-heritage",
    name: "Frogskins 35th Anniversary",
    brandId: "oakley",
    brandName: "Oakley",
    modelNumber: "OO9444-0157",
    sku: "EYE-OK-9444-CLR",
    category: "Sunglasses",
    gender: "Unisex",
    frameShape: "Wayfarer",
    frameMaterial: "O Matter™ Transparent",
    price: 165,
    inStock: true,
    boutiqueStatus: "Ready for Try-On",
    badge: "Retro Revival",
    featured: false,
    rating: 4.7,
    reviewsCount: 92,
    colors: [
      { name: "Polished Clear / Prizm Violet", hex: "#7a49a5" },
      { name: "Matte Black / Prizm Grey", hex: "#2b2b2e" }
    ],
    dimensions: {
      lensWidth: "54 mm",
      bridgeWidth: "17 mm",
      templeLength: "138 mm",
      frameHeight: "44 mm"
    },
    faceFit: "Medium Fit",
    description: "In pop culture, it was a time like no other. Ronald Reagan was in the White House, The Terminator was in the box office and Run-D.M.C. was in certified gold. It was also the time when Oakley created one-of-a-kind sunglasses called Frogskins.",
    craftsmanship: "Authentic reissue of the 1980s original tooling with screwless spring hinges and modern Prizm contrast-tuning lens chemistry.",
    features: [
      "Authentic Heritage Retro Silhouette",
      "Original 1980s Metal Hinge Pin Geometry",
      "Ultralight Flexible O Matter™ Frame Material",
      "Vibrant Prizm Optical Lens Dynamics"
    ],
    primaryImage: "assets/images/brand-oakley.jpg",
    gallery: [
      "assets/images/brand-oakley.jpg",
      "assets/images/style-sunglasses.jpg",
      "assets/images/editorial-campaign.jpg"
    ]
  },

  // VOGUE EYEWEAR
  {
    id: "vogue-cat-eye-glam",
    name: "VO5282S Cat-Eye Chic",
    brandId: "vogue-eyewear",
    brandName: "Vogue Eyewear",
    modelNumber: "VO5282S W44/87",
    sku: "EYE-VG-5282-AMB",
    category: "Sunglasses",
    gender: "Women",
    frameShape: "Cat-Eye",
    frameMaterial: "Sculpted Amber Acetate",
    price: 135,
    inStock: true,
    boutiqueStatus: "Boutique Display Available",
    badge: "Runway Pick",
    featured: true,
    rating: 4.8,
    reviewsCount: 88,
    colors: [
      { name: "Warm Honey Amber / Gradient Brown", hex: "#c9883b" },
      { name: "Onyx Black / Solid Dark Grey", hex: "#1a1a1d" },
      { name: "Ivory Tortoise / Soft Pink", hex: "#e2c5b0" }
    ],
    dimensions: {
      lensWidth: "54 mm",
      bridgeWidth: "17 mm",
      templeLength: "140 mm",
      frameHeight: "46 mm"
    },
    faceFit: "Flattering Petite to Medium Fit",
    description: "Chic, feminine, and undeniably charismatic, this bold cat-eye frame transforms everyday outfits into high-fashion statements. Sculpted with undulating temple contours and warm translucent amber hues that catch the Mediterranean sun.",
    craftsmanship: "Contoured acetate face front with integrated saddle bridge, micro-beveled temple edges, and metallic Vogue logo accent.",
    features: [
      "Sculpted Upward Cat-Eye Brow Contour",
      "Warm Gradient Lens for Soft Visual Transition",
      "Polished Gold-Tone Temple Brand Plaque",
      "UV400 Total Sunlight Filter"
    ],
    primaryImage: "assets/images/brand-vogue.jpg",
    gallery: [
      "assets/images/brand-vogue.jpg",
      "assets/images/hero-lifestyle.jpg",
      "assets/images/style-sunglasses.jpg"
    ]
  },
  {
    id: "vogue-hexagonal-metal",
    name: "VO4108 Geometric Elegance",
    brandId: "vogue-eyewear",
    brandName: "Vogue Eyewear",
    modelNumber: "VO4108 280",
    sku: "EYE-VG-4108-GLD",
    category: "Optical",
    gender: "Women",
    frameShape: "Geometric",
    frameMaterial: "Fine Metal Wire",
    price: 145,
    inStock: true,
    boutiqueStatus: "Optical Lab Ready",
    badge: "Trending Geometry",
    featured: false,
    rating: 4.7,
    reviewsCount: 71,
    colors: [
      { name: "Pale Rose Gold", hex: "#deb2a1" },
      { name: "Polished Yellow Gold", hex: "#cfb268" },
      { name: "Matte Black & Gold Rim", hex: "#2b2b2b" }
    ],
    dimensions: {
      lensWidth: "51 mm",
      bridgeWidth: "18 mm",
      templeLength: "135 mm",
      frameHeight: "45 mm"
    },
    faceFit: "Universal Medium Fit",
    description: "An eye-catching geometric hexagonal shape that blends vintage delicacy with modern European chic. The ultra-slender metal profile opens up the facial expression while providing a sharp aesthetic accent.",
    craftsmanship: "Super-fine memory-tempered stainless wire rim with laser-cut bridge notches and crystal acetate comfort temple tips.",
    features: [
      "Subtle Hexagonal Rim Silhouette",
      "Rose-Gold Plated Anti-Tarnish Finish",
      "Featherweight All-Day Comfort",
      "Compatible with Single-Vision and Progressive Lenses"
    ],
    primaryImage: "assets/images/style-minimalist.jpg",
    gallery: [
      "assets/images/style-minimalist.jpg",
      "assets/images/style-optical.jpg",
      "assets/images/boutique-store.jpg"
    ]
  },
  {
    id: "vogue-butterfly-tortoise",
    name: "VO5361 Bold Butterfly Acetate",
    brandId: "vogue-eyewear",
    brandName: "Vogue Eyewear",
    modelNumber: "VO5361 W656",
    sku: "EYE-VG-5361-TOR",
    category: "Optical",
    gender: "Women",
    frameShape: "Square",
    frameMaterial: "Bold Acetate",
    price: 150,
    inStock: true,
    boutiqueStatus: "In Stock at Boutiques",
    badge: "Editor's Choice",
    featured: false,
    rating: 4.8,
    reviewsCount: 65,
    colors: [
      { name: "Dark Havana Tortoise", hex: "#472e1c" },
      { name: "Burgundy Red Wine", hex: "#631c26" },
      { name: "Transparent Smokey Grey", hex: "#62656d" }
    ],
    dimensions: {
      lensWidth: "53 mm",
      bridgeWidth: "16 mm",
      templeLength: "140 mm",
      frameHeight: "47 mm"
    },
    faceFit: "Medium to Wide Fit",
    description: "For those who believe eyewear should be an architectural statement. The VO5361 pairs an oversized butterfly square front with thick, structural acetate temples to highlight cheekbones and add dramatic flair.",
    craftsmanship: "Thick 6mm premium acetate face slab hand-beveled along the exterior brow with smoothed inner rims for plush face contact.",
    features: [
      "Dramatic Oversized Butterfly Geometry",
      "High-Gloss Acetate Hand-Polished Finish",
      "Subtle Gold Metal Logo Inset",
      "Prescription Ready with Reinforced Steel Core Temples"
    ],
    primaryImage: "assets/images/style-statement.jpg",
    gallery: [
      "assets/images/style-statement.jpg",
      "assets/images/brand-vogue.jpg",
      "assets/images/hero-lifestyle.jpg"
    ]
  }
];

// DATA ACCESS HELPERS
const CatalogueAPI = {
  getBrands: () => [...BRANDS_DATA],
  
  getBrandById: (brandId) => {
    if (!brandId) return null;
    const cleanId = String(brandId).toLowerCase().trim();
    return BRANDS_DATA.find(b => b.id === cleanId) || null;
  },

  getProducts: (filterFn) => {
    if (typeof filterFn === "function") {
      return PRODUCTS_DATA.filter(filterFn);
    }
    return [...PRODUCTS_DATA];
  },

  getProductById: (productId) => {
    if (!productId) return null;
    const cleanId = String(productId).toLowerCase().trim();
    return PRODUCTS_DATA.find(p => p.id.toLowerCase() === cleanId) || null;
  },

  getFeaturedProducts: () => {
    return PRODUCTS_DATA.filter(p => p.featured);
  },

  getProductsByBrand: (brandId) => {
    if (!brandId) return [];
    const cleanId = String(brandId).toLowerCase().trim();
    return PRODUCTS_DATA.filter(p => p.brandId === cleanId);
  },

  getRelatedProducts: (productId, limit = 3) => {
    const current = CatalogueAPI.getProductById(productId);
    if (!current) return PRODUCTS_DATA.slice(0, limit);
    return PRODUCTS_DATA
      .filter(p => p.id !== current.id && (p.brandId === current.brandId || p.category === current.category))
      .slice(0, limit);
  },

  searchProducts: (query) => {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS_DATA.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.frameShape.toLowerCase().includes(q) ||
      p.modelNumber.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  },

  getCategories: () => ["All", "Sunglasses", "Optical"],

  getShapes: () => ["Aviator", "Wayfarer", "Square", "Round", "Cat-Eye", "Geometric", "Wrap"],

  getMaterials: () => [
    "Gold-Plated Metal Alloy",
    "Sculpted Acetate",
    "Handcrafted Italian Acetate",
    "Bespoke Italian Acetate",
    "O Matter™ Lightweight Composite",
    "Combination Acetate & Metal",
    "Lightweight Metal"
  ]
};

// Make available in window object for browser access
if (typeof window !== "undefined") {
  window.BRANDS_DATA = BRANDS_DATA;
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.CatalogueAPI = CatalogueAPI;
}
