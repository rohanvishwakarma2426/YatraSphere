import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import RightSidebar from "../../components/sidebar/RightSidebar"
import HeroSection from "../../components/hero/HeroSection"
import PopularDestinations from "../../components/sections/PopularDestinations"
import TopCategories from "../../components/sections/TopCategories"
import WhyYatraSphere from "../../components/sections/WhyYatraSphere"
import QuickActionsCarousel from "../../components/home/QuickActionsCarousel"
import Footer from "../../components/footer/Footer"

function Home() {

  return (

    <div>

      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}

        <Sidebar />

        {/* MAIN */}

        <div className="flex-1 min-w-0 p-4 flex flex-col xl:flex-row gap-4 items-start">

          <div className="flex-1 min-w-0 w-full flex flex-col gap-6">

            <HeroSection />

            <QuickActionsCarousel />

            <PopularDestinations />

            <TopCategories />

            <WhyYatraSphere />

          </div>

          <RightSidebar />

        </div>

      </div>

      <Footer />

    </div>

  )
}

export default Home