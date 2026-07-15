import { FaMapMarkerAlt } from "react-icons/fa"

function ExperienceCard({ experience }) {

  return (

    <div className="relative shrink-0 w-[220px] h-[150px] rounded-2xl overflow-hidden cursor-pointer group">

      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute bottom-3 left-3 right-3 text-white">

        <h3 className="text-[13.5px] font-bold leading-tight">
          {experience.title}
        </h3>

        <p className="flex items-center gap-1 text-[11px] text-white/85 mt-1">
          <FaMapMarkerAlt className="text-[10px]" />
          {experience.destinations} Destinations
        </p>

      </div>

    </div>

  )
}

export default ExperienceCard