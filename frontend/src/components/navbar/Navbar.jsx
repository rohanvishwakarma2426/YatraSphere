import { Link, useLocation } from "react-router-dom";

import { HiOutlineMap } from "react-icons/hi";

import { FiUsers } from "react-icons/fi";

import { RiRoadMapLine } from "react-icons/ri";

import { BsBag } from "react-icons/bs";

import { FaBell, FaBars } from "react-icons/fa";

import { AiOutlinePlus } from "react-icons/ai";

import logo from "../../assets/navbar/logo1.png";
import profile from "../../assets/navbar/profile.png";
import { useSidebar } from "../../hooks/useSidebar";

const NAV_ITEMS = [
  { label: "Explore", icon: HiOutlineMap, path: "/" },
  { label: "Community", icon: FiUsers, path: "/community" },
  { label: "Trips", icon: RiRoadMapLine, path: "/trips" },
  { label: "Alerts", icon: FaBell, path: "/alerts" },
  { label: "Packages", icon: BsBag, path: "/packages" },
];

function Navbar() {
  const { pathname } = useLocation();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full px-1 pt-1">
      <div className="w-full h-[54px] bg-white border border-[#ececec] rounded-[16px] shadow-sm flex items-center px-3 lg:px-0">
        {/* HAMBURGER (mobile only) */}

        <button
          onClick={toggleSidebar}
          className="lg:hidden mr-2 w-[34px] h-[34px] shrink-0 rounded-lg flex items-center justify-center text-[#4b5563] hover:bg-[#f5f7fb] transition"
        >
          <FaBars className="text-[16px]" />
        </button>

        {/* LOGO */}

        <img
          src={logo}
          alt="logo"
          className="w-[100px] h-[70] p-30 object-contain shrink-0"
        />
        {/* SEARCH (hidden on mobile to avoid overflow) */}
        <div className="hidden lg:flex ml-6 w-[220px] h-[36px] bg-[#d6d9e0] border border-[#edf0f5] rounded-[12px] px-6 items-center shrink-0">
          <input
            type="text"
            placeholder="Search places, experiences..."
            className="bg-transparent outline-none w-full text-[13px] text-[#6b7280]"
          />
        </div>

        {/* MENU (hidden on mobile) */}

        <div className="hidden lg:flex items-center gap-4 ml-8 flex-1">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const active = path ? pathname === path : false;

            const className = `flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition ${
              active
                ? "text-[#2563eb] font-semibold"
                : "text-[#4b5563] hover:text-[#2563eb]"
            }`;

            const content = (
              <>
                <Icon className="text-[17px]" />
                <span className="text-[14px]">{label}</span>
              </>
            );

            return path ? (
              <Link key={label} to={path} className={className}>
                {content}
              </Link>
            ) : (
              <div key={label} className={className}>
                {content}
              </div>
            );
          })}
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
          {/* BUTTON (hidden on mobile) */}

          <Link
            to="/share-experience"
            className="hidden lg:flex bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white h-[32px] px-5 rounded-[9px] items-center gap-1 text-[13px] font-medium whitespace-nowrap"
          >
            <AiOutlinePlus className="text-[15px]" />
            Share Experience
          </Link>

          {/* NOTIFICATION */}

          <div className="relative cursor-pointer shrink-0">
            <FaBell className="text-[18px] text-[#4b5563]" />

            <div className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
              3
            </div>
          </div>

          {/* PROFILE */}

          <img
            src={profile}
            alt="profile"
            className="w-[36px] h-[36px] rounded-full object-cover cursor-pointer shrink-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
