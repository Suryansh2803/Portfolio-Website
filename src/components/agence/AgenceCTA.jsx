import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const AgenceCTA = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Endless marquee animation
    gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1
    })
  })

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#0d0d0d] text-white pt-32 pb-16 overflow-hidden border-t border-white/5"
    >
      {/* Endless Horizontal Marquee */}
      <div className="w-full border-t border-b border-white/10 py-6 overflow-hidden flex bg-[#D3FD50] text-black">
        <div className="marquee-inner flex whitespace-nowrap gap-12 font-[font1] text-5xl md:text-7xl uppercase font-extrabold tracking-tighter">
          <span>LET'S CREATE THE FUTURE TOGETHER • </span>
          <span>START A PROJECT • </span>
          <span>LET'S CREATE THE FUTURE TOGETHER • </span>
          <span>START A PROJECT • </span>
          {/* Duplicate for seamless looping */}
          <span>LET'S CREATE THE FUTURE TOGETHER • </span>
          <span>START A PROJECT • </span>
          <span>LET'S CREATE THE FUTURE TOGETHER • </span>
          <span>START A PROJECT • </span>
        </div>
      </div>

      {/* Main CTA Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 mt-32 text-center flex flex-col items-center">
        <span className="text-[#D3FD50] text-sm tracking-widest uppercase mb-4 block font-[font2]">GET IN TOUCH</span>
        <h2 className="font-[font1] text-6xl md:text-8xl uppercase leading-none mb-12 max-w-3xl">
          WANT TO DEFINE A NEW STANDARD?
        </h2>

        {/* Massive Interactive Button */}
        <a 
          href="mailto:suryanshyadav117@gmail.com" 
          className="group relative inline-flex items-center justify-center font-[font2] text-xl md:text-2xl uppercase border-2 border-white rounded-full px-12 py-6 overflow-hidden hover:border-[#D3FD50] hover:text-black transition-all duration-500"
        >
          {/* Background fill */}
          <div className="absolute inset-0 bg-[#D3FD50] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-10"></div>
          
          <span className="relative z-10 flex items-center gap-4">
            SURYANSHYADAV117@GMAIL.COM
            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>

        {/* Footer Details */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 pt-12 border-t border-white/10 font-[font2] text-sm text-gray-500 text-left">
          <div>
            <h4 className="text-white uppercase mb-2">HEADQUARTERS</h4>
            <p>New Delhi, India</p>
            <p>GMT +5:30</p>
          </div>
          <div>
            <h4 className="text-white uppercase mb-2">REPRESENTATIONS</h4>
            <p>Paris / Tokyo / Remote</p>
            <p>Available worldwide</p>
          </div>
          <div>
            <h4 className="text-white uppercase mb-2">SOCIALS</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#D3FD50] transition-colors duration-300">LINKEDIN</a>
              <span>/</span>
              <a href="#" className="hover:text-[#D3FD50] transition-colors duration-300">TWITTER</a>
              <span>/</span>
              <a href="#" className="hover:text-[#D3FD50] transition-colors duration-300">DRIBBBLE</a>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-700 mt-16 font-[font2]">
          © {new Date().getFullYear()} SURYANSH YADAV CREATIVE STUDIO. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  )
}

export default AgenceCTA
