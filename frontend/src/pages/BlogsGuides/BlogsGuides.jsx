import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaRegBookmark, FaClock } from "react-icons/fa"

import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import BlogsRightSidebar from "../../components/blogs/BlogsRightSidebar"
import {
  FEATURED_GUIDES, LATEST_ARTICLES, TRAVEL_TIPS_TRICKS,
} from "../../components/blogs/blogsData"

function BlogsGuides() {

  const [featuredIndex, setFeaturedIndex] = useState(0)

  const featured = FEATURED_GUIDES[featuredIndex]

  const goPrev = () => setFeaturedIndex((i) => (i === 0 ? FEATURED_GUIDES.length - 1 : i - 1))
  const goNext = () => setFeaturedIndex((i) => (i === FEATURED_GUIDES.length - 1 ? 0 : i + 1))

  return (

    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* HEADER */}

            <div>
              <h1 className="text-[22px] font-bold text-[#111827]">Blogs &amp; Guides</h1>
              <p className="text-[13px] text-[#6b7280] mt-1">Travel stories, tips and in-depth guides to help you explore the world better.</p>
            </div>

            {/* FEATURED CAROUSEL */}

            <div className="relative rounded-2xl overflow-hidden h-[300px]">

              <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <span className="absolute top-4 left-4 bg-[#2563eb] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                FEATURED GUIDE
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-6 max-w-[520px]">
                <h2 className="text-white text-[22px] font-bold leading-7">{featured.title}</h2>
                <p className="text-white/85 text-[12.5px] mt-2 leading-5">{featured.desc}</p>
                <div className="flex items-center gap-2 mt-3 text-white/80 text-[11.5px]">
                  <span className="w-[24px] h-[24px] rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    {featured.author.charAt(0)}
                  </span>
                  By {featured.author} · {featured.date} · {featured.readTime}
                </div>
              </div>

              <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition">
                <FaChevronLeft className="text-[12px] text-[#111827]" />
              </button>
              <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition">
                <FaChevronRight className="text-[12px] text-[#111827]" />
              </button>

              <div className="absolute bottom-4 right-6 flex items-center gap-1.5">
                {FEATURED_GUIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`w-[7px] h-[7px] rounded-full transition ${i === featuredIndex ? "bg-white w-[20px]" : "bg-white/50"}`}
                  />
                ))}
              </div>

            </div>

            {/* LATEST ARTICLES */}

            <div>

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-bold text-[#111827]">Latest Articles</h2>
                <span className="text-[#2563eb] text-[12.5px] font-semibold cursor-pointer">View All</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {LATEST_ARTICLES.map((article) => (
                  <div key={article.id} className="bg-white rounded-2xl border border-[#ececec] shadow-sm overflow-hidden hover:shadow-md transition">

                    <div className="relative h-[130px]">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      <button className="absolute top-2.5 right-2.5 w-[26px] h-[26px] rounded-full bg-white/90 flex items-center justify-center">
                        <FaRegBookmark className="text-[11px] text-[#4b5563]" />
                      </button>
                    </div>

                    <div className="p-4">
                      <span className={`text-[9.5px] font-bold px-2 py-1 rounded-full ${article.tagColor}`}>
                        {article.tag}
                      </span>
                      <h3 className="text-[13.5px] font-bold text-[#111827] mt-2.5 leading-5">{article.title}</h3>
                      <p className="text-[11px] text-[#6b7280] mt-1.5 leading-4">{article.desc}</p>

                      <div className="flex items-center justify-between mt-3 text-[10.5px] text-[#9ca3af]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-[18px] h-[18px] rounded-full bg-[#eef4ff] flex items-center justify-center text-[8px] font-bold text-[#2563eb]">
                            {article.author.charAt(0)}
                          </span>
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-[9px]" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* TRAVEL TIPS & TRICKS */}

            <div>

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-bold text-[#111827]">Travel Tips &amp; Tricks</h2>
                <span className="text-[#2563eb] text-[12.5px] font-semibold cursor-pointer">View All</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TRAVEL_TIPS_TRICKS.map((tip) => (
                  <div key={tip.title} className="bg-white rounded-2xl border border-[#ececec] shadow-sm p-4 hover:shadow-md transition cursor-pointer">
                    <div className={`w-[36px] h-[36px] rounded-lg flex items-center justify-center ${tip.bg}`}>
                      <span className={`text-[15px] ${tip.color}`}>✦</span>
                    </div>
                    <h3 className="text-[13px] font-bold text-[#111827] mt-2.5">{tip.title}</h3>
                    <p className="text-[11px] text-[#6b7280] mt-1 leading-4">{tip.desc}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <BlogsRightSidebar />

        </div>

      </div>

    </div>

  )
}

export default BlogsGuides