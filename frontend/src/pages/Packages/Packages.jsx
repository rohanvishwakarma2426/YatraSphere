import { useMemo, useState } from "react"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import PackagesRightSidebar from "../../components/packages/PackagesRightSidebar"
import PackagesHero from "../../components/packages/PackagesHero"
import CategoryTabs from "../../components/packages/CategoryTabs"
import PackageCard from "../../components/packages/PackageCard"
import { PACKAGES } from "../../components/packages/packagesData"
import { filterAndSortPackages, SORT_OPTIONS } from "../../utils/packageHelpers"

const DEFAULT_FILTERS = {
  search: "",
  category: null,
  destination: "All Destinations",
  maxBudget: 100000,
  duration: "any",
  themes: [],
  minRating: 0,
  sortBy: "recommended",
}

function Packages() {

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const visiblePackages = useMemo(
    () => filterAndSortPackages(PACKAGES, filters),
    [filters]
  )

  return (

    <div>

      <Navbar />

      <div className="flex">

        {/* NORMAL NAV SIDEBAR (same as every other page) */}

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* HEADER */}

            <div>
              <h1 className="text-[22px] font-bold text-[#111827]">
                Explore Amazing Travel Packages
              </h1>
              <p className="text-[13px] text-[#6b7280] mt-1">
                Handpicked packages for unforgettable journeys
              </p>
            </div>

            {/* CATEGORY TABS */}

            <CategoryTabs
              activeCategory={filters.category}
              onChange={(category) => setFilters((prev) => ({ ...prev, category }))}
            />

            {/* HERO BANNER */}

            <PackagesHero />

            {/* SECTION HEADER + SORT */}

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-[16px] font-bold text-[#111827]">Popular Packages</h2>
                <p className="text-[12px] text-[#6b7280]">Best selling travel packages loved by our travelers</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#6b7280]">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                  className="h-[34px] border border-[#ececec] rounded-lg px-2.5 text-[12px] outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* PACKAGES GRID */}

            {visiblePackages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {visiblePackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#ececec] p-8 text-center text-[#6b7280] text-[13px]">
                No packages match your filters. Try clearing them.
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR */}

          <PackagesRightSidebar />

        </div>

      </div>

    </div>

  )
}

export default Packages