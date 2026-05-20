import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import HeroSection from "../../components/hero/HeroSection"

function Home() {

  return (

    <div>

      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}

        <Sidebar />

        {/* MAIN */}

        <div className="flex-1 p-5">

          <HeroSection />

        </div>

      </div>

    </div>

  )
}

export default Home