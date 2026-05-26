export const products = [
  // --- METAL DETECTORS ---
  {
    id: "garrett-ace-400",
    name: "Garrett Ace 400",
    tagline: "The best all-around beginner-intermediate detector",
    category: "metal-detectors",
    commission: "~3% via Amazon Associates",
    price: "$349",
    rating: 4.7,
    bestFor: "Beginners ready to get serious",
    url: "https://www.amazon.com/dp/B00LWHFXKO",
    pros: [
      "Iron Audio feature distinguishes junk from finds",
      "DD search coil for excellent depth and separation",
      "Works great in mineralized Utah desert soil",
      "Frequency adjust helps in trashy areas",
      "Lightweight at 2.8 lbs"
    ],
    cons: [
      "No rechargeable battery (uses AAs)",
      "Display can wash out in direct sunlight"
    ],
    tier: "mid"
  },
  {
    id: "minelab-vanquish-540",
    name: "Minelab Vanquish 540",
    tagline: "Multi-frequency technology at a beginner price",
    category: "metal-detectors",
    commission: "~3% via Amazon Associates",
    price: "$399",
    rating: 4.6,
    bestFor: "Beginners who want serious technology",
    url: "https://www.amazon.com/dp/B083TK2GF2",
    pros: [
      "Multi-IQ simultaneous multi-frequency — rare at this price",
      "Waterproof up to 3ft — great for creek hunting",
      "Folds flat for easy transport",
      "Vibration + audio alerts",
      "Excellent depth on coins and nuggets"
    ],
    cons: [
      "App required for full settings control",
      "Lighter build quality than Garrett"
    ],
    tier: "mid"
  },
  {
    id: "garrett-at-max",
    name: "Garrett AT Max",
    tagline: "Fully waterproof, field-proven workhorse",
    category: "metal-detectors",
    commission: "~3-5% via Amazon / KellyCo",
    price: "$699",
    rating: 4.8,
    bestFor: "Intermediate hunters and wet terrain",
    url: "https://www.amazon.com/dp/B073RZMH3K",
    pros: [
      "Fully submersible to 10ft — creek and river hunting",
      "Z-Lynk wireless audio with low latency",
      "Excellent ground balance for mineralized desert soil",
      "Pro audio for tone identification",
      "Built for serious daily use"
    ],
    cons: [
      "Higher price point",
      "Heavier than entry models at 3.03 lbs"
    ],
    tier: "premium"
  },

  // --- ROCK HAMMERS & HAND TOOLS ---
  {
    id: "estwing-rock-hammer",
    name: "Estwing E3-22P Rock Hammer",
    tagline: "The industry-standard geology hammer",
    category: "rock-hammers",
    commission: "~3% via Amazon Associates",
    price: "$54",
    rating: 4.9,
    bestFor: "Every rockhound, beginner to expert",
    url: "https://www.amazon.com/dp/B00002N5JZ",
    pros: [
      "One-piece forged steel — virtually indestructible",
      "Pointed tip for splitting and prying",
      "Shock-reduction grip reduces fatigue",
      "Made in the USA since 1923",
      "Lifetime warranty"
    ],
    cons: [
      "Heavier than fiberglass-handle alternatives",
      "Grip can get slippery when wet"
    ],
    tier: "mid"
  },
  {
    id: "estwing-prospecting-pick",
    name: "Estwing E3-23LP Prospecting Pick",
    tagline: "Built for digging and prying in the field",
    category: "rock-hammers",
    commission: "~3% via Amazon Associates",
    price: "$58",
    rating: 4.8,
    bestFor: "Gold prospectors and serious diggers",
    url: "https://www.amazon.com/dp/B00004SURO",
    pros: [
      "Flat blade for prying and scraping",
      "Pointed pick for breaking and digging",
      "Same forged-steel Estwing quality",
      "Shock-reduction grip",
      "Perfect balance for all-day use"
    ],
    cons: [
      "Specialized — less versatile than standard hammer",
      "Overkill for casual surface collecting"
    ],
    tier: "mid"
  },

  // --- TUMBLERS & LAPIDARY ---
  {
    id: "national-geo-tumbler",
    name: "National Geographic Rock Tumbler Kit",
    tagline: "The best starter tumbler for beginners",
    category: "tumblers-lapidary",
    commission: "~3% via Amazon Associates",
    price: "$74",
    rating: 4.5,
    bestFor: "First-time tumblers and beginners",
    url: "https://www.amazon.com/dp/B01LX39YGN",
    pros: [
      "Includes grit, polish, and rough rocks to start",
      "Quiet motor by tumbler standards",
      "Complete kit — nothing extra to buy",
      "Great for Utah geodes and agate"
    ],
    cons: [
      "Small 1 lb barrel capacity",
      "Motor may need replacement after heavy use"
    ],
    tier: "budget"
  },
  {
    id: "lortone-3a",
    name: "Lortone 3A Single Barrel Tumbler",
    tagline: "The serious hobbyist's first real tumbler",
    category: "tumblers-lapidary",
    commission: "~3% via Amazon Associates",
    price: "$134",
    rating: 4.7,
    bestFor: "Hobbyists ready to tumble their own field finds",
    url: "https://www.amazon.com/dp/B0006N9ZLO",
    pros: [
      "3 lb barrel — handles real field hauls",
      "Industrial-grade motor built to last",
      "Replacement barrels and parts widely available",
      "Used by professionals and rock clubs",
      "Quiet and consistent"
    ],
    cons: [
      "Grit and polish sold separately",
      "Runs 4-6 week cycles for best results"
    ],
    tier: "mid"
  },
  {
    id: "vevor-tumbler",
    name: "VEVOR Rock Tumbler (3 lb)",
    tagline: "Double-barrel tumbler with digital timer",
    category: "tumblers-lapidary",
    commission: "~3% via Amazon Associates",
    price: "$149",
    rating: 4.4,
    bestFor: "Tumblers who want more capacity and control",
    url: "https://www.amazon.com/s?k=vevor+rock+tumbler+3lb",
    pros: [
      "Digital timer — set it and forget it",
      "Dual barrel lets you run two batches simultaneously",
      "Good value at the price point",
      "Handles harder stones well"
    ],
    cons: [
      "Louder than Lortone",
      "Barrel seals need regular monitoring"
    ],
    tier: "mid"
  },

  // --- FIELD GEAR & CAMPING ---
  {
    id: "black-diamond-spot",
    name: "Black Diamond Spot 400 Headlamp",
    tagline: "The go-to headlamp for caves, mines, and night digs",
    category: "field-gear",
    commission: "~3-8% via Amazon / Backcountry",
    price: "$49",
    rating: 4.7,
    bestFor: "Any rockhound entering dark or enclosed spaces",
    url: "https://www.amazon.com/dp/B08MH4BLXR",
    pros: [
      "400 lumens — bright enough for mine exploration",
      "Red night-vision mode preserves eye adaptation",
      "Waterproof IPX8 rated",
      "Strobe for emergency signaling",
      "Runs on AAA batteries — easy to source anywhere"
    ],
    cons: [
      "Battery life drops fast at full brightness",
      "Headband can loosen over a long day"
    ],
    tier: "mid"
  },
  {
    id: "hydro-flask-32",
    name: "Hydro Flask 32oz Wide Mouth",
    tagline: "Essential desert hydration — keeps water cold all day",
    category: "field-gear",
    commission: "~8% via Backcountry affiliate",
    price: "$52",
    rating: 4.8,
    bestFor: "Utah desert and high-desert rockhounding",
    url: "https://www.backcountry.com/hydroflask-32-oz-wide-mouth",
    pros: [
      "Keeps water cold 24hrs in desert heat",
      "Wide mouth fits ice cubes",
      "TempShield double-wall insulation",
      "Durable — survives drops and rough handling",
      "Lifetime warranty"
    ],
    cons: [
      "Heavier than plastic alternatives",
      "Premium price compared to basic bottles"
    ],
    tier: "mid"
  },
  {
    id: "leatherman-signal",
    name: "Leatherman Signal Multi-Tool",
    tagline: "The multi-tool built specifically for outdoor survival",
    category: "field-gear",
    commission: "~3% via Amazon Associates",
    price: "$119",
    rating: 4.7,
    bestFor: "Remote site rockhounding and backcountry safety",
    url: "https://www.amazon.com/dp/B00IHMHGX2",
    pros: [
      "Fire starter built in — critical on remote BLM land",
      "Emergency whistle included",
      "Saw blade for brush clearing",
      "19 tools in one compact package",
      "25-year Leatherman warranty"
    ],
    cons: [
      "Heavier than minimalist multi-tools",
      "Fire starter takes practice to use reliably"
    ],
    tier: "premium"
  },

  // --- GPS & NAVIGATION ---
  {
    id: "garmin-etrex-32x",
    name: "Garmin eTrex 32x",
    tagline: "Rugged handheld GPS purpose-built for backcountry",
    category: "gps-navigation",
    commission: "~3% via Amazon Associates",
    price: "$249",
    rating: 4.6,
    bestFor: "Marking find locations and navigating BLM land",
    url: "https://www.amazon.com/dp/B07RLFNR9N",
    pros: [
      "3-axis compass + barometric altimeter",
      "Pre-loaded TopoActive maps of Western US",
      "16 hr battery life on 2 AAs",
      "Glove-friendly buttons for winter use",
      "Waterproof IPX7"
    ],
    cons: [
      "Small 2.2 inch screen",
      "No touchscreen"
    ],
    tier: "mid"
  },
  {
    id: "garmin-inreach-mini-2",
    name: "Garmin inReach Mini 2",
    tagline: "Two-way satellite communicator for true remote safety",
    category: "gps-navigation",
    commission: "~3% via Amazon Associates",
    price: "$349 + plan",
    rating: 4.7,
    bestFor: "Solo rockhounds in remote Utah desert and mountains",
    url: "https://www.amazon.com/dp/B09HR7TBXZ",
    pros: [
      "SOS connects to GEOS 24/7 rescue coordination",
      "Two-way texting via Iridium satellite network",
      "Works anywhere on Earth — no cell signal needed",
      "Pairs with phone for easy messaging",
      "24hr battery in tracking mode"
    ],
    cons: [
      "Requires monthly subscription ($14.95-$49.99/mo)",
      "Small buttons hard to use with gloves"
    ],
    tier: "premium"
  },

  // --- BOOKS & FIELD GUIDES ---
  {
    id: "rockhounding-utah-book",
    name: "Rockhounding Utah by Gretchen Hazlewood",
    tagline: "The definitive Utah field guide — 75 sites mapped",
    category: "books-guides",
    commission: "~4.5% via Amazon Associates",
    price: "$18",
    rating: 4.6,
    bestFor: "Utah-based rockhounds of all skill levels",
    url: "https://www.amazon.com/dp/0762741066",
    pros: [
      "75 sites including Topaz Mountain, Dugway, Tintic",
      "GPS coordinates for each location",
      "What you will find and best seasons listed",
      "Land access and permit notes included",
      "Compact enough to bring into the field"
    ],
    cons: [
      "Some site info slightly dated — verify access online",
      "No color photos inside (line drawings only)"
    ],
    tier: "budget"
  },
  {
    id: "gem-trails-utah",
    name: "Gem Trails of Utah by James Mitchell",
    tagline: "Classic Utah gem and mineral site reference",
    category: "books-guides",
    commission: "~4.5% via Amazon Associates",
    price: "$21",
    rating: 4.4,
    bestFor: "Gem hunters focused on Utah minerals and crystals",
    url: "https://www.amazon.com/dp/0935182705",
    pros: [
      "Detailed directions to lesser-known sites",
      "Mineral descriptions and photos",
      "Good companion to Hazlewood guide",
      "Covers geodes, topaz, obsidian, and garnets"
    ],
    cons: [
      "Older edition — some roads have changed",
      "Less detailed than Hazlewood on access information"
    ],
    tier: "budget"
  }
];
