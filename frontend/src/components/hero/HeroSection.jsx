import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/hero/hero-bg.jpg";

function HeroSection() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("destinations");
  const [search, setSearch] = useState("");

  const placeholders = {
    destinations: "Where do you want to go?",
    experiences: "What experience are you looking for?",
    guides: "Find local travel guides...",
  };

  const handleSearch = () => {
    if (!search.trim()) {
      alert("Please enter something to search.");
      return;
    }

    switch (activeTab) {
      case "destinations":
        navigate(`/explore?q=${encodeURIComponent(search)}`);
        break;

      case "experiences":
        navigate(`/experiences?q=${encodeURIComponent(search)}`);
        break;

      case "guides":
        navigate(`/guides?q=${encodeURIComponent(search)}`);
        break;

      default:
        break;
    }
  };

  return (
    <div
      className="w-full min-h-[320px] rounded-[24px] overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/35 flex flex-col justify-center">
        <div className="p-6 md:p-8">
          <h1 className="text-white text-[26px] md:text-[36px] leading-[1.15] font-bold max-w-[560px]">
            Explore. Plan. Travel Better.
          </h1>

          <p className="text-white/90 text-[14px] md:text-[16px] mt-2.5">
            Real travelers. Real experiences. Real help.
          </p>

          <div className="mt-5 w-full max-w-[520px] bg-white rounded-[20px] p-4">
            {/* Tabs */}

            <div className="flex items-center gap-2">
              {[
                {
                  id: "destinations",
                  label: "Destinations",
                },
                {
                  id: "experiences",
                  label: "Experiences",
                },
                {
                  id: "guides",
                  label: "Guides",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 h-[36px] rounded-xl text-[13px] transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? "bg-[#edf3ff] text-[#2563eb] font-semibold shadow-sm"
                        : "text-[#555] hover:bg-[#f5f7fb]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}

            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder={placeholders[activeTab]}
                className="flex-1 h-[42px] border border-[#ececec] rounded-xl px-4 outline-none focus:border-[#2563eb] text-[13px]"
              />

              <button
                onClick={handleSearch}
                className="w-[100px] h-[42px] bg-[#2563eb] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;