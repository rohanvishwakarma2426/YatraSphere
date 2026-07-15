import { EXPLORE_CATEGORIES } from "../../utils/exploreHelpers"

function CategoryGrid({ onSelect }) {

  const gridCategories = EXPLORE_CATEGORIES.filter((c) => c.key !== null)

  return (

    <div>

      <h2 className="text-[18px] font-bold text-[#111827] mb-3">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

        {gridCategories.map(({ key, label, icon: Icon, count, bg, color }) => (

          <button
            key={key}
            onClick={() => onSelect(key)}
            className="bg-white rounded-xl border border-[#ececec] shadow-sm p-3.5 flex items-center gap-2.5 text-left hover:shadow-md transition"
          >

            <div className={`w-[36px] h-[36px] shrink-0 rounded-lg flex items-center justify-center ${bg}`}>
              <Icon className={`text-[15px] ${color}`} />
            </div>

            <div className="min-w-0">
              <h3 className="text-[12.5px] font-semibold text-[#111827] truncate">
                {label}
              </h3>
              <p className="text-[11px] text-[#6b7280]">
                {count}
              </p>
            </div>

          </button>

        ))}

      </div>

    </div>

  )
}

export default CategoryGrid