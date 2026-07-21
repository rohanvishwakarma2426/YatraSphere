import { useEffect, useRef, useState } from "react";
import { FiSettings, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  // bahar click karne pe panel band ho jaaye
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Gear icon button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Settings"
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition"
      >
        <FiSettings size={20} />
      </button>

      {/* Dropdown panel — tabhi dikhega jab open === true */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 z-50">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Settings
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
              {theme === "dark" ? <FiMoon size={16} /> : <FiSun size={16} />}
              <span>Dark Mode</span>
            </div>

            {/* Toggle switch */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                theme === "dark"
                  ? "bg-blue-600 justify-end"
                  : "bg-gray-300 justify-start"
              }`}
            >
              <span className="w-5 h-5 bg-white rounded-full shadow" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}