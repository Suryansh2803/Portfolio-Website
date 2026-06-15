import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const statsData = [
  { value: 120, suffix: "+", label: "COMPLETED PROJECTS" },
  { value: 12, suffix: "", label: "GLOBAL DESIGN AWARDS" },
  { value: 99, suffix: "%", label: "CLIENT RETENTION" },
  { value: 7, suffix: "Y+", label: "YEARS OF CRAFTING" }
]

gsap.registerPlugin(ScrollTrigger)

const AgenceStats = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    const targets = gsap.utils.toArray(".stat-number")
    
    targets.forEach((target) => {
      const endVal = parseInt(target.getAttribute("data-target"))
      const obj = { val: 0 }
      
      gsap.to(obj, {
        val: endVal,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          target.innerText = Math.floor(obj.val)
        }
      })
    })
  })

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#0a0a0a] text-white py-24 px-6 md:px-16 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 font-[font1]">
        {statsData.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-[10vw] lg:text-[6vw] font-bold text-[#D3FD50] flex items-baseline leading-none">
              <span 
                className="stat-number" 
                data-target={stat.value}
              >
                0
              </span>
              <span>{stat.suffix}</span>
            </div>
            <span className="font-[font2] text-sm md:text-base tracking-widest text-gray-500 mt-4 uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AgenceStats
