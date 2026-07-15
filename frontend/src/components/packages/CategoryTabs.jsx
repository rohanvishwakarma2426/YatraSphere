import { FaChevronRight } from "react-icons/fa"
import { PACKAGE_CATEGORIES } from "../../utils/packageHelpers"

function CategoryTabs({ activeCategory, onChange }) {

  return (

    <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-2 flex items-center gap-2 overflow-x-auto">

      {PACKAGE_CATEGORIES.map(({ key, label, icon: Icon }) => {

        const active = activeCategory === key

        return (
          <button
            key={label}
            onClick={() => onChange(key)}
            className={`shrink-0 flex items-center gap-2 px-4 h-[38px] rounded-xl text-[12.5px] font-semibold transition ${
              active
                ? "bg-[#2563eb] text-white"
                : "text-[#4b5563] hover:bg-[#f5f7fb]"
            }`}
          >
            <Icon className="text-[13px]" />
            {label}
          </button>
        )

      })}

      {/* SHOW MORE ARROW */}

      <button className="shrink-0 w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[#4b5563] hover:bg-[#f5f7fb] transition">
        <FaChevronRight className="text-[12px]" />
      </button>

    </div>

  )
}

export default CategoryTabs