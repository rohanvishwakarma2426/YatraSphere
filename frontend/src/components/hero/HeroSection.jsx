import heroBg from "../../assets/hero/hero-bg.jpg"

function HeroSection() {

  return (

    <div
      className="w-full min-h-[420px] rounded-[32px] overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`
      }}
    >

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/35 flex flex-col justify-center">

        {/* CONTENT */}

        <div className="p-10 md:p-14">

          <h1 className="text-white text-[38px] md:text-[52px] leading-[1.15] font-bold max-w-[700px]">

            Explore. Plan. Travel Better.

          </h1>

          <p className="text-white/90 text-[18px] md:text-[22px] mt-4">

            Real travelers. Real experiences. Real help.

          </p>

          {/* SEARCH BOX */}

          <div className="mt-8 w-full max-w-[640px] bg-white rounded-[28px] p-6">

            {/* TABS */}

            <div className="flex items-center gap-2">

              <button className="bg-[#edf3ff] text-[#2563eb] px-5 h-[44px] rounded-2xl font-semibold text-[15px]">

                Destinations

              </button>

              <button className="text-[#4b5563] px-5 h-[44px] rounded-2xl font-medium hover:bg-[#f5f7fb] text-[15px]">

                Experiences

              </button>

              <button className="text-[#4b5563] px-5 h-[44px] rounded-2xl font-medium hover:bg-[#f5f7fb] text-[15px]">

                Guides

              </button>

            </div>

            {/* INPUT */}

            <div className="mt-4 flex items-center gap-3">

              <input
                type="text"
                placeholder="Where do you want to go?"
                className="flex-1 h-[52px] border border-[#ececec] rounded-2xl px-5 outline-none text-[15px] min-w-0"
              />

              <button className="w-[120px] shrink-0 h-[52px] bg-[#2563eb] text-white rounded-2xl text-[16px] font-semibold hover:bg-[#1d4ed8] transition">

                Search

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default HeroSection