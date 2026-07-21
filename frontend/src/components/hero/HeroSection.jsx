import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/hero/hero-bg.jpg";
import LocationAutocomplete from "./LocationAutocomplete";
import ExperienceAutocomplete from "./ExperienceAutocomplete";
import GuideAutocomplete from "./GuideAutocomplete";

function HeroSection() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("destinations");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleFocusRequest = () => {
      setActiveTab("destinations");
      setSearch("");
      setTimeout(() => {
        document.getElementById("hero-search-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
        document.querySelector("#hero-search-row input")?.focus();
      }, 50);
    };
    window.addEventListener("focus-destination-search", handleFocusRequest);
    return () => window.removeEventListener("focus-destination-search", handleFocusRequest);
  }, []);

  const placeholders = {
    destinations: "Where do you want to go?",
    experiences: "What experience are you looking for?",
    guides: "Find local travel guides...",
  };

  const handleLocationSelect = (place) => {
    navigate(`/location/${encodeURIComponent(place.name)}`);
  };

  const handleExperienceSelect = (item) => {
    navigate(`/experiences?q=${encodeURIComponent(item.name)}`);
  };

  const handleGuideSelect = (item) => {
    navigate(`/guides?q=${encodeURIComponent(item.name)}`);
  };

  const handleSearch = () => {
    if (!search.trim()) {
      alert("Please enter something to search.");
      return;
    }

    switch (activeTab) {
      case "destinations":
        navigate(`/location/${encodeURIComponent(search.trim())}`);
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
        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-white text-[22px] sm:text-[26px] md:text-[36px] leading-[1.2] font-bold max-w-[560px]">
            Explore. Plan. Travel Better.
          </h1>

          <p className="text-white/90 text-[13px] sm:text-[14px] md:text-[16px] mt-2 sm:mt-2.5">
            Real travelers. Real experiences. Real help.
          </p>

          <div id="hero-search-card" className="mt-4 sm:mt-5 w-full max-w-[520px] bg-white dark:bg-gray-900 rounded-[18px] sm:rounded-[20px] p-3 sm:p-4">
            {/* Tabs — horizontally scrollable so 3 tabs never force the card to overflow on narrow screens */}

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
              {[
                { id: "destinations", label: "Destinations" },
                { id: "experiences", label: "Experiences" },
                { id: "guides", label: "Guides" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearch(""); }}
                  className={`shrink-0 px-3 sm:px-4 h-[34px] sm:h-[36px] rounded-xl text-[12.5px] sm:text-[13px] whitespace-nowrap transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? "bg-[#edf3ff] dark:bg-blue-500/10 text-[#2563eb] dark:text-blue-400 font-semibold shadow-sm"
                        : "text-[#555] dark:text-gray-400 hover:bg-[#f5f7fb] dark:hover:bg-gray-800"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search — stacks vertically on very small screens so the button never gets clipped */}

            <div id="hero-search-row" className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

              {activeTab === "destinations" && (

                <LocationAutocomplete
                  value={search}
                  onChange={setSearch}
                  onSelect={handleLocationSelect}
                  placeholder={placeholders.destinations}
                />

              )}

              {activeTab === "experiences" && (

                <ExperienceAutocomplete
                  value={search}
                  onChange={setSearch}
                  onSelect={handleExperienceSelect}
                  placeholder={placeholders.experiences}
                />

              )}

              {activeTab === "guides" && (

                <GuideAutocomplete
                  value={search}
                  onChange={setSearch}
                  onSelect={handleGuideSelect}
                  placeholder={placeholders.guides}
                />

              )}

              <button
                onClick={handleSearch}
                className="w-full sm:w-[100px] h-[42px] bg-[#2563eb] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition shrink-0"
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