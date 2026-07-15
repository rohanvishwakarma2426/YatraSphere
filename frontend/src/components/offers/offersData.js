export const OFFER_CATEGORIES = ["All Offers", "Flights", "Hotels", "Packages", "Activities", "Bus", "Train", "Cruises"]

export const TOP_DEALS = [
  {
    id: 1,
    badge: "FLAT 20% OFF",
    badgeColor: "bg-[#dc2626]",
    title: "Domestic Flights",
    desc: "On all major airlines",
    code: "FLY20",
    category: "Flights",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "UP TO 30% OFF",
    badgeColor: "bg-[#7c3aed]",
    title: "Hotel Bookings",
    desc: "On domestic and international hotels",
    code: "HOTEL30",
    category: "Hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    badge: "UP TO 40% OFF",
    badgeColor: "bg-[#16a34a]",
    title: "Holiday Packages",
    desc: "Europe, Bali, Thailand & more",
    code: "HOLIDAY40",
    category: "Packages",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    badge: "EXTRA 15% OFF",
    badgeColor: "bg-[#f97316]",
    title: "Activities & Experiences",
    desc: "Tours, attractions & more",
    code: "XP15",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=500&auto=format&fit=crop",
  },
]

export const BANK_OFFERS = [
  { bank: "SBI Card", color: "text-[#2563eb]", bg: "bg-white", discount: "Up to 15% Instant Discount*", desc: "on SBI Credit Cards" },
  { bank: "HDFC Bank", color: "text-[#dc2626]", bg: "bg-[#fdeaea]", discount: "Up to 12% Instant Discount*", desc: "on HDFC Credit Cards" },
  { bank: "ICICI Bank", color: "text-[#f97316]", bg: "bg-[#fff4e6]", discount: "Up to 10% Instant Discount*", desc: "on ICICI Credit Cards" },
  { bank: "Axis Bank", color: "text-[#7c3aed]", bg: "bg-[#f2edfd]", discount: "Flat ₹750 Off*", desc: "on Axis Credit Cards" },
]

export const DEAL_OF_THE_DAY = {
  title: "Kashmir Paradise Package",
  duration: "4 Nights / 5 Days",
  location: "Srinagar, Gulmarg, Pahalgam",
  price: 18999,
  originalPrice: 24999,
  save: 6000,
  image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=500&auto=format&fit=crop",
  secondsLeft: 8 * 3600 + 45 * 60 + 32,
}