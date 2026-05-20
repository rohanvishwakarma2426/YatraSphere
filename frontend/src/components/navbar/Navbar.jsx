import {
  HiOutlineMap,
} from "react-icons/hi"

import {
  FiUsers,
} from "react-icons/fi"

import {
  RiRoadMapLine,
} from "react-icons/ri"

import {
  BsBag,
} from "react-icons/bs"

import {
  FaBell,
} from "react-icons/fa"

import {
  AiOutlinePlus,
} from "react-icons/ai"

import logo from "../../assets/navbar/logo1.png"
import profile from "../../assets/navbar/profile.png"

function Navbar() {

  return (

    <div className="w-full px-1 pt-1">

      <div className="w-full h-[60px] bg-white border border-[#ececec] rounded-[18px] shadow-sm flex items-center px-0">

        {/* LOGO */}

        <img
          src={logo}
          alt="logo"
          className="w-[120px] h-[80] p-30 object-contain shrink-0"
        />
        {/* SEARCH */}
        <div className="ml-10 w-[250px] h-[40px] bg-[#d6d9e0] border border-[#edf0f5] rounded-[14px] px-8 flex items-center shrink-0">

          <input
            type="text"
            placeholder="Search places, experiences..."
            className="bg-transparent outline-none w-full text-[15px] text-[#6b7280]"
          />

        </div>

        {/* MENU */}

        <div className="flex items-center gap-5 ml-12 flex-1">

          <div className="flex items-center gap-2 text-[#2563eb] cursor-pointer whitespace-nowrap">

            <HiOutlineMap className="text-[21px]" />

            <span className="text-[16px] font-semibold">
              Explore
            </span>

          </div>

          <div className="flex items-center gap-2 text-[#4b5563] cursor-pointer whitespace-nowrap">

            <FiUsers className="text-[20px]" />

            <span className="text-[16px]">
              Community
            </span>

          </div>

          <div className="flex items-center gap-2 text-[#4b5563] cursor-pointer whitespace-nowrap">

            <RiRoadMapLine className="text-[20px]" />

            <span className="text-[16px]">
              Trips
            </span>

          </div>

          <div className="flex items-center gap-2 text-[#4b5563] cursor-pointer whitespace-nowrap">

            <FaBell className="text-[18px]" />

            <span className="text-[16px]">
              Alerts
            </span>

          </div>

          <div className="flex items-center gap-2 text-[#4b5563] cursor-pointer whitespace-nowrap">

            <BsBag className="text-[18px]" />

            <span className="text-[16px]">
              Packages
            </span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 shrink-0">

          {/* BUTTON */}

          <button className="bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white h-[35px] px-6 rounded-[10px] flex items-center gap-1 text-[15px] font-medium whitespace-nowrap">

            <AiOutlinePlus className="text-[18px]" />

            Share Experience

          </button>

          {/* NOTIFICATION */}

          <div className="relative cursor-pointer shrink-0">

            <FaBell className="text-[21px] text-[#4b5563]" />

            <div className="absolute -top-2 -right-2 w-[20px] h-[20px] bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">

              3

            </div>

          </div>

          {/* PROFILE */}

          <img
            src={profile}
            alt="profile"
            className="w-[42px] h-[42px] rounded-full object-cover cursor-pointer shrink-0"
          />

        </div>

      </div>

    </div>

  )
}

export default Navbar