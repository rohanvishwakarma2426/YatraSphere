import heroBg from "../../assets/hero/hero-bg.jpg"

function HeroSection() {

  return (

    <div className="flex gap-5">

      {/* LEFT HERO */}

      <div
        className="flex-1 h-[520px] rounded-[32px] overflow-hidden relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/35">

          {/* CONTENT */}

          <div className="p-14">

            <h1 className="text-white text-[62px] leading-[78px] font-bold max-w-[700px]">

              Explore.
              Plan.
              Travel Better.

            </h1>

            <p className="text-white/90 text-[24px] mt-6">

              Real travelers. Real experiences.
              Real help.

            </p>

            {/* SEARCH BOX */}

            <div className="mt-14 w-[720px] bg-white rounded-[28px] p-6">

              {/* TABS */}

              <div className="flex items-center gap-4">

                <button className="bg-[#edf3ff] text-[#2563eb] px-7 h-[52px] rounded-2xl font-semibold">

                  Destinations

                </button>

                <button className="text-[#4b5563] px-7 h-[52px] rounded-2xl font-medium hover:bg-[#f5f7fb]">

                  Experiences

                </button>

                <button className="text-[#4b5563] px-7 h-[52px] rounded-2xl font-medium hover:bg-[#f5f7fb]">

                  Guides

                </button>

              </div>

              {/* INPUT */}

              <div className="mt-6 flex items-center gap-4">

                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="flex-1 h-[60px] border border-[#ececec] rounded-2xl px-6 outline-none text-[17px]"
                />

                <button className="w-[140px] h-[60px] bg-[#2563eb] text-white rounded-2xl text-[18px] font-semibold hover:bg-[#1d4ed8] transition">

                  Search

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT CARD */}

      <div className="w-[360px] bg-white rounded-[32px] p-7 shadow-sm border border-[#ececec] h-[520px]">

        <h2 className="text-[28px] font-bold text-[#111827]">

          Budget Calculator

        </h2>

        <p className="text-[#6b7280] mt-2 leading-7">

          Plan your trip smartly with
          real estimated budget.

        </p>

        {/* FORM */}

        <div className="mt-8 space-y-5">

          <select className="w-full h-[58px] border border-[#ececec] rounded-2xl px-5 outline-none">

            <option>
              Manali, Himachal Pradesh
            </option>

          </select>

          <select className="w-full h-[58px] border border-[#ececec] rounded-2xl px-5 outline-none">

            <option>
              3 Days
            </option>

          </select>

          <select className="w-full h-[58px] border border-[#ececec] rounded-2xl px-5 outline-none">

            <option>
              Budget Travel
            </option>

          </select>

          <button className="w-full h-[60px] bg-[#2563eb] text-white rounded-2xl text-[18px] font-semibold hover:bg-[#1d4ed8] transition">

            Calculate My Budget

          </button>

        </div>

        {/* RESULT */}

        <div className="mt-8 bg-[#f5fbf7] rounded-3xl p-6 border border-[#d8f5df]">

          <p className="text-[#6b7280]">
            Estimated Budget
          </p>

          <h1 className="text-[#16a34a] text-[38px] font-bold mt-3">

            ₹4,250 - ₹5,700

          </h1>

          <p className="text-[#16a34a] mt-2 font-medium">

            (Per Person)

          </p>

        </div>

      </div>

    </div>

  )
}

export default HeroSection