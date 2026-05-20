import {
  FaHome,
  FaMapMarkedAlt,
  FaCalculator,
  FaUsers,
  FaSuitcase,
} from "react-icons/fa"

function Sidebar() {

  return (

    <div className="w-[260px] min-h-screen px-5 py-5">

      {/* MENU */}

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ececec]">

        <div className="space-y-2">

          {/* ACTIVE */}

          <div className="flex items-center gap-4 bg-[#edf3ff] text-[#2563eb] px-4 py-4 rounded-2xl cursor-pointer font-semibold">

            <FaHome className="text-[18px]" />

            Home

          </div>

          {/* MENU */}

          <div className="flex items-center gap-4 text-[#4b5563] px-4 py-4 rounded-2xl hover:bg-[#f7f8fb] cursor-pointer transition">

            <FaMapMarkedAlt className="text-[18px]" />

            Explore Places

          </div>

          <div className="flex items-center gap-4 text-[#4b5563] px-4 py-4 rounded-2xl hover:bg-[#f7f8fb] cursor-pointer transition">

            <FaCalculator className="text-[18px]" />

            Budget Calculator

          </div>

          <div className="flex items-center gap-4 text-[#4b5563] px-4 py-4 rounded-2xl hover:bg-[#f7f8fb] cursor-pointer transition">

            <FaUsers className="text-[18px]" />

            Community

          </div>

          <div className="flex items-center gap-4 text-[#4b5563] px-4 py-4 rounded-2xl hover:bg-[#f7f8fb] cursor-pointer transition">

            <FaSuitcase className="text-[18px]" />

            Packages

          </div>

        </div>

      </div>

      {/* PREMIUM CARD */}

      <div className="mt-5 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] rounded-3xl p-6 text-white">

        <h2 className="text-[22px] font-bold">
          Go Premium
        </h2>

        <p className="mt-3 text-[14px] leading-6 text-white/80">

          Unlock exclusive itineraries,
          AI planner, hidden gems
          and more.

        </p>

        <button className="mt-6 w-full h-[50px] bg-white text-[#2563eb] rounded-2xl font-semibold hover:scale-[1.02] transition">

          Upgrade Now

        </button>

      </div>

      {/* APP CARD */}

      <div className="mt-5 bg-[#111827] rounded-3xl p-6 text-white">

        <h2 className="text-[22px] font-bold leading-9">

          Take YatraSphere
          Wherever You Go!

        </h2>

        <p className="mt-3 text-[14px] text-gray-300 leading-6">

          Download our app for the
          best travel experience.

        </p>

        <div className="mt-6 space-y-3">

          <button className="w-full h-[50px] bg-white/10 rounded-2xl">

            Google Play

          </button>

          <button className="w-full h-[50px] bg-white/10 rounded-2xl">

            App Store

          </button>

        </div>

      </div>

    </div>

  )
}

export default Sidebar