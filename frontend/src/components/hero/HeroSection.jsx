import heroBg from "../../assets/hero/hero-bg.jpg"

function HeroSection() {

  return (

    <div
      className="w-full min-h-[320px] rounded-[24px] overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`
      }}
    >

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/35 flex flex-col justify-center">

        {/* CONTENT */}

        <div className="p-6 md:p-8">

          <h1 className="text-white text-[26px] md:text-[36px] leading-[1.15] font-bold max-w-[560px]">

            Explore. Plan. Travel Better.

          </h1>

          <p className="text-white/90 text-[14px] md:text-[16px] mt-2.5">

            Real travelers. Real experiences. Real help.

          </p>

          {/* SEARCH BOX */}

          <div className="mt-5 w-full max-w-[520px] bg-white rounded-[20px] p-4">

            {/* TABS */}

            <div className="flex items-center gap-1.5">

              <button className="bg-[#edf3ff] text-[#2563eb] px-4 h-[34px] rounded-xl font-semibold text-[13px]">

                Destinations

              </button>

              <button className="text-[#4b5563] px-4 h-[34px] rounded-xl font-medium hover:bg-[#f5f7fb] text-[13px]">

                Experiences

              </button>

              <button className="text-[#4b5563] px-4 h-[34px] rounded-xl font-medium hover:bg-[#f5f7fb] text-[13px]">

                Guides

              </button>

            </div>

            {/* INPUT */}

            <div className="mt-3 flex items-center gap-2">

              <input
                type="text"
                placeholder="Where do you want to go?"
                className="flex-1 h-[40px] border border-[#ececec] rounded-xl px-4 outline-none text-[13px] min-w-0"
              />

              <button className="w-[92px] shrink-0 h-[40px] bg-[#2563eb] text-white rounded-xl text-[13px] font-semibold hover:bg-[#1d4ed8] transition">

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
