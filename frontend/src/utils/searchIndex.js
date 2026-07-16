import { DESTINATIONS } from "../components/explore/exploreData"
import { PACKAGES } from "../components/packages/packagesData"
import { TOP_DEALS } from "../components/offers/offersData"
import { FEATURED_GUIDES } from "../components/blogs/blogsData"

// Pages that don't have their own list of items but should still show up when
// someone searches their name (e.g. typing "trip" surfaces the Trips page).
const STATIC_PAGES = [
  { title: "Explore Places", subtitle: "Browse destinations", path: "/explore" },
  { title: "Community", subtitle: "Travel stories & posts", path: "/community" },
  { title: "My Trips", subtitle: "Plan & track your trips", path: "/trips" },
  { title: "Scam Alerts", subtitle: "Stay safe while traveling", path: "/alerts" },
  { title: "Packages", subtitle: "Curated travel packages", path: "/packages" },
  { title: "Budget Calculator", subtitle: "Estimate your trip cost", path: "/budget-calculator" },
  { title: "Offers & Deals", subtitle: "Latest travel discounts", path: "/offers" },
  { title: "Share Experience", subtitle: "Post your travel story", path: "/share-experience" },
  { title: "Blogs & Guides", subtitle: "Travel guides & tips", path: "/blogs-guides" },
  { title: "Experiences", subtitle: "Curated travel experiences", path: "/experiences" },
  { title: "Guides", subtitle: "Local travel guides", path: "/guides" },
]

// Builds one flat array combining every searchable thing in the app.
// Each item: { id, title, subtitle, category, path, image? }
export function getSearchIndex() {

  const pages = STATIC_PAGES.map((p, i) => ({
    id: `page-${i}`,
    title: p.title,
    subtitle: p.subtitle,
    category: "Pages",
    path: p.path,
  }))

  const destinations = DESTINATIONS.map((d) => ({
    id: `destination-${d.id}`,
    title: d.name,
    subtitle: d.region,
    category: "Destinations",
    path: "/explore",
    image: d.image,
  }))

  const packages = PACKAGES.map((p) => ({
    id: `package-${p.id}`,
    title: p.title,
    subtitle: p.location,
    category: "Packages",
    path: "/packages",
    image: p.image,
  }))

  const offers = TOP_DEALS.map((o) => ({
    id: `offer-${o.id}`,
    title: o.title,
    subtitle: o.desc,
    category: "Offers & Deals",
    path: "/offers",
    image: o.image,
  }))

  const guides = FEATURED_GUIDES.map((g) => ({
    id: `guide-${g.id}`,
    title: g.title,
    subtitle: `By ${g.author}`,
    category: "Blogs & Guides",
    path: "/blogs-guides",
    image: g.image,
  }))

  return [...pages, ...destinations, ...packages, ...offers, ...guides]

}

// Ranks title-starts-with matches above subtitle/category matches, so typing
// "man" surfaces "Manali" before something that merely mentions Manali.
export function searchIndex(query, limit = 8) {

  const q = query.trim().toLowerCase()
  if (!q) return []

  const items = getSearchIndex()

  const scored = items
    .map((item) => {
      const title = item.title.toLowerCase()
      const subtitle = (item.subtitle || "").toLowerCase()

      let score = -1
      if (title.startsWith(q)) score = 3
      else if (title.includes(q)) score = 2
      else if (subtitle.includes(q)) score = 1

      return { item, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item)

  return scored

}