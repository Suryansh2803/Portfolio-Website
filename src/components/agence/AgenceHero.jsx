import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AgenceHero = ({ imgArray }) => {
  const imageDivRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(() => {
    // Scroll trigger for the image sequence vertical move
    gsap.to(imageDivRef.current, {
      y: "80vh",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (e) => {
          let imgIndex;
          if (e.progress >= 1) {
            imgIndex = imgArray.length - 1;
          } else {
            imgIndex = Math.floor(e.progress * imgArray.length);
          }
          if (imgArray[imgIndex] && imageRef.current) {
            imageRef.current.src = imgArray[imgIndex];
          }
        }
      }
    });

    // Reveal text animation
    gsap.from(".reveal-text", {
      opacity: 0,
      y: 80,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out"
    });
  })

  return (
    <section className="hero-section relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-between pt-32 pb-16 px-6 md:px-16">
      {/* Floating Scroll Image Sequence */}
      <div className="absolute right-[10%] md:right-[20%] top-[20%] z-10 pointer-events-none">
        <div 
          ref={imageDivRef} 
          className="w-[280px] h-[380px] md:w-[320px] md:h-[430px] rounded-3xl overflow-hidden border-2 border-[#D3FD50] shadow-2xl shadow-[#D3FD50]/10"
        >
          <img 
            ref={imageRef} 
            className="w-full h-full object-cover" 
            src={imgArray[0]} 
            alt="Agency Showcase" 
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center flex-grow font-[font1]">
        <div className="overflow-hidden">
          <h1 className="reveal-text text-[14vw] md:text-[12vw] uppercase leading-[0.85] tracking-tighter text-white">
            THE ART OF
          </h1>
        </div>
        <div className="overflow-hidden mt-2">
          <h1 className="reveal-text text-[14vw] md:text-[12vw] uppercase leading-[0.85] tracking-tighter text-[#D3FD50]">
            CREATION.
          </h1>
        </div>
      </div>

      {/* Subtext Grid */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10 font-[font2]">
        <div className="flex flex-col gap-2">
          <span className="text-[#D3FD50] text-sm tracking-widest uppercase">01 / WHO WE ARE</span>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            We are a high-end digital design studio working globally to build premium web experiences.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#D3FD50] text-sm tracking-widest uppercase">02 / OUR VISION</span>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            Crafting flawless interactive layouts that bridge the gap between human aesthetics and digital speed.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#D3FD50] text-sm tracking-widest uppercase">03 / COLLABORATION</span>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            We partner with visionary companies to transform their products into award-winning masterpieces.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AgenceHero
