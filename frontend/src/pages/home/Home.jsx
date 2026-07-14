import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import RightSidebar from "../../components/sidebar/RightSidebar"
import HeroSection from "../../components/hero/HeroSection"
import QuickActions from "../../components/sections/QuickActions"
import PopularDestinations from "../../components/sections/PopularDestinations"
import TopCategories from "../../components/sections/TopCategories"
import WhyYatraSphere from "../../components/sections/WhyYatraSphere"

function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 min-w-0 p-5 flex flex-col xl:flex-row gap-5">
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <HeroSection />
            <QuickActions />
            <PopularDestinations />
            <TopCategories />
            <WhyYatraSphere />
          </div>

          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default Home