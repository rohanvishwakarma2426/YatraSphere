import { DESTINATIONS } from "../components/explore/exploreData"
import { PACKAGES } from "../components/packages/packagesData"
import { TOP_DEALS } from "../components/offers/offersData"
import { FEATURED_GUIDES } from "../components/blogs/blogsData"
import { INITIAL_POSTS } from "../pages/Community/Community"
import { INITIAL_ALERTS } from "../pages/Alerts/Alerts"
import { INITIAL_TRIPS } from "../pages/Trips/Trips"

// Case-insensitive "does this field mention that location" check.
// Location fields across the app look like "Manali, Himachal Pradesh" or
// just "Manali" — a substring match on the location name covers both.
function mentions(field, locationName) {
  if (!field) return false
  return field.toLowerCase().includes(locationName.trim().toLowerCase())
}

export function getLocationDashboardData(locationName) {

  const destinations = DESTINATIONS.filter(
    (d) => mentions(d.name, locationName) || mentions(d.region, locationName)
  )

  const packages = PACKAGES.filter(
    (p) => mentions(p.destination, locationName) || mentions(p.location, locationName)
  )

  const offers = TOP_DEALS.filter((o) => mentions(o.title, locationName) || mentions(o.desc, locationName))

  const guides = FEATURED_GUIDES.filter(
    (g) => mentions(g.title, locationName) || mentions(g.desc, locationName)
  )

  const posts = INITIAL_POSTS.filter((p) => mentions(p.location, locationName))

  const alerts = INITIAL_ALERTS.filter((a) => mentions(a.location, locationName))

  const trips = INITIAL_TRIPS.filter((t) => mentions(t.location, locationName))

  return { destinations, packages, offers, guides, posts, alerts, trips }

}