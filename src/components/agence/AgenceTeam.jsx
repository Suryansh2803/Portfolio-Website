import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import img1 from '../../assets/img1.jpeg'
import img2 from '../../assets/img2.jpeg'
import img3 from '../../assets/img3.jpeg'
import img4 from '../../assets/img4.jpeg'
import img5 from '../../assets/img5.jpeg'
import img6 from '../../assets/img6.jpeg'
import img7 from '../../assets/img7.jpeg'

const teamData = [
  { name: "Olivier V.", role: "Creative Director", image: img1 },
  { name: "Chantal G.", role: "Lead UI Architect", image: img2 },
  { name: "Michele D.", role: "Executive Producer", image: img3 },
  { name: "Melanie P.", role: "Motion Designer", image: img4 },
  { name: "Camille L.", role: "Frontend Dev Lead", image: img5 },
  { name: "Meggie R.", role: "Full Stack Developer", image: img6 },
  { name: "Joel B.", role: "Creative Developer", image: img7 }
]

gsap.registerPlugin(ScrollTrigger)

const AgenceTeam = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from(".team-card", {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    })
  })

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#0d0d0d] text-white py-32 px-6 md:px-16 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-[#D3FD50] text-sm tracking-widest uppercase mb-4 block">WHO WE ARE</span>
        <h2 className="font-[font1] text-5xl md:text-7xl uppercase leading-none mb-20">
          MEET THE CREATIVE BRAINS
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 font-[font2]">
          {teamData.map((member, index) => (
            <div 
              key={index} 
              className="team-card group relative flex flex-col rounded-3xl overflow-hidden bg-[#161616] p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D3FD50]/5"
            >
              {/* Image Container with zoom hover */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  src={member.image} 
                  alt={member.name} 
                />
              </div>

              {/* Member Details */}
              <div className="mt-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-[font1] text-2xl uppercase group-hover:text-[#D3FD50] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{member.role}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs tracking-wider text-gray-500 uppercase">
                  <span>ACTIVE</span>
                  <span className="w-2 h-2 rounded-full bg-[#D3FD50]"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AgenceTeam
