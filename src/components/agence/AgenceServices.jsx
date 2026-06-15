import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import img2 from '../../assets/img2.jpeg'
import img3 from '../../assets/img3.jpeg'
import img4 from '../../assets/img4.jpeg'
import img5 from '../../assets/img5.jpeg'

const servicesData = [
  {
    id: "01",
    title: "CREATIVE DIRECTION",
    desc: "We build core concepts, style guidelines, and visual identities that distinguish your brand from competitors.",
    image: img2
  },
  {
    id: "02",
    title: "INTERACTIVE DESIGN",
    desc: "We craft award-winning user interfaces designed with micro-interactions, responsive grids, and fluid motion.",
    image: img3
  },
  {
    id: "03",
    title: "WEB DEVELOPMENT",
    desc: "High-performance React & Vite setups integrated with GSAP to compile stunning layouts that run at 60 FPS.",
    image: img4
  },
  {
    id: "04",
    title: "3D & MOTION GRAPHICS",
    desc: "Implementing three-dimensional layouts and immersive canvas transitions to capture user attention instantly.",
    image: img5
  }
]

const AgenceServices = () => {
  const [activeImage, setActiveImage] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef(null)

  const handleMouseMove = (e) => {
    // Custom cursor hover card following the mouse
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      })
    }
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-16 border-t border-white/5 overflow-hidden"
    >
      {/* Floating Hover Image Preview */}
      <div 
        ref={cursorRef} 
        style={{
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          left: 0,
          top: 0,
        }}
        className={`fixed z-30 transition-opacity duration-300 hidden md:block ${isHovering ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="w-[300px] h-[200px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl scale-95 hover:scale-100 transition-transform duration-300">
          {activeImage && (
            <img className="w-full h-full object-cover" src={activeImage} alt="Service preview" />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <span className="text-[#D3FD50] text-sm tracking-widest uppercase mb-4 block">WHAT WE DO</span>
        <h2 className="font-[font1] text-5xl md:text-7xl uppercase leading-none mb-20">
          OUR EXPERTISE
        </h2>

        {/* Services List */}
        <div className="flex flex-col border-b border-white/10 font-[font2]">
          {servicesData.map((service) => (
            <div 
              key={service.id}
              onMouseEnter={() => {
                setActiveImage(service.image)
                setIsHovering(true)
              }}
              onMouseLeave={() => {
                setIsHovering(false)
              }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-t border-white/10 cursor-pointer transition-colors duration-300 hover:bg-white/[0.02] px-4"
            >
              {/* Background fill animation */}
              <div className="absolute inset-0 bg-[#D3FD50] origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 -z-10 group-hover:origin-top"></div>
              
              <div className="flex items-baseline gap-6">
                <span className="text-gray-500 text-sm group-hover:text-black transition-colors duration-300">{service.id}</span>
                <h3 className="font-[font1] text-3xl md:text-5xl uppercase group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              <p className="text-gray-400 text-base md:text-lg max-w-md mt-4 md:mt-0 leading-relaxed group-hover:text-black/80 transition-colors duration-300">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AgenceServices
