import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AgenceManifesto = () => {
  const containerRef = useRef(null)
  const triggerRef = useRef(null)

  useGSAP(() => {
    const pin = gsap.fromTo(containerRef.current, 
      { x: 0 }, 
      {
        x: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      }
    );

    return () => {
      pin.kill();
    };
  })

  return (
    <div ref={triggerRef} className="overflow-hidden bg-[#0d0d0d]">
      <div ref={containerRef} className="h-screen w-[400vw] flex flex-row relative">
        {/* Slide 1: Introduction */}
        <section className="h-screen w-screen flex flex-col justify-center px-6 md:px-16 relative">
          <div className="max-w-4xl font-[font1]">
            <span className="text-[#D3FD50] text-lg tracking-widest uppercase mb-4 block">OUR MANIFESTO</span>
            <h2 className="text-white text-[7vw] md:text-[6vw] leading-none uppercase font-bold">
              WE SHAPE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D3FD50] to-white">FUTURE OF WEB</span>
            </h2>
            <p className="font-[font2] text-xl md:text-2xl text-gray-400 mt-8 max-w-2xl leading-relaxed">
              We believe a website shouldn't just exist. It should communicate, inspire, and behave like a living piece of art.
            </p>
          </div>
        </section>

        {/* Slide 2: Bold Creativity */}
        <section className="h-screen w-screen flex flex-col justify-center px-6 md:px-16 bg-[#111] border-l border-white/5">
          <div className="max-w-4xl font-[font1]">
            <span className="text-gray-500 text-6xl md:text-8xl font-bold mb-4 block">01</span>
            <h2 className="text-[#D3FD50] text-[6vw] md:text-[5vw] leading-none uppercase font-bold">
              BOLD CREATIVITY
            </h2>
            <p className="font-[font2] text-lg md:text-xl text-gray-300 mt-6 max-w-xl leading-relaxed">
              We defy conventional grid layouts. We play with typography, scales, and overlapping dimensions to establish a strong brand signature.
            </p>
          </div>
        </section>

        {/* Slide 3: Cutting-Edge Tech */}
        <section className="h-screen w-screen flex flex-col justify-center px-6 md:px-16 bg-[#161616] border-l border-white/5">
          <div className="max-w-4xl font-[font1]">
            <span className="text-gray-500 text-6xl md:text-8xl font-bold mb-4 block">02</span>
            <h2 className="text-white text-[6vw] md:text-[5vw] leading-none uppercase font-bold">
              FLAWLESS RUNTIME
            </h2>
            <p className="font-[font2] text-lg md:text-xl text-gray-300 mt-6 max-w-xl leading-relaxed">
              A gorgeous design is nothing without high performance. Our builds are fully optimized, ensuring silky smooth transitions and instant loading times.
            </p>
          </div>
        </section>

        {/* Slide 4: Human-Centric Design */}
        <section className="h-screen w-screen flex flex-col justify-center px-6 md:px-16 bg-[#1a1a1a] border-l border-white/5">
          <div className="max-w-4xl font-[font1]">
            <span className="text-gray-500 text-6xl md:text-8xl font-bold mb-4 block">03</span>
            <h2 className="text-[#D3FD50] text-[6vw] md:text-[5vw] leading-none uppercase font-bold">
              INTERACTIVE EMPATHY
            </h2>
            <p className="font-[font2] text-lg md:text-xl text-gray-300 mt-6 max-w-xl leading-relaxed">
              Every animation serves a purpose. We guide the visitor's attention, reduce friction, and make exploration feels like a fun, premium discovery.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AgenceManifesto
