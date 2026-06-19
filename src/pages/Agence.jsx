import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import aboutProfile from '../assets/about-profile.jpg'

gsap.registerPlugin(ScrollTrigger)

const skills = ['React', 'Next.js', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind CSS', 'GSAP', 'Lenis', 'Vite', 'TypeScript', 'Figma', 'OpenAI API']

const experience = [
  { year: '2026', role: 'Full Stack Developer',   company: 'Freelance / Remote', desc: 'Building premium interactive web apps and AI SaaS platforms for clients worldwide.' },
  { year: '2025', role: 'Frontend Engineer',        company: 'Abhyudaya Club · GLBITM', desc: 'Led front-end development for the official club platform, delivering member management and event features.' },
  { year: '2024', role: 'Creative Developer',       company: 'Self-Initiated Projects', desc: 'Shipped Creator Copilot AI and this animated portfolio, exploring GSAP, Three.js, and AI integrations.' },
]

export default function Agence() {
  const pageRef   = useRef(null)
  const imgRef    = useRef(null)
  const cursorRef = useRef(null)
  const [hoveredExp, setHoveredExp] = useState(null)

  const onMouseMove = (e) => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power3.out' })
  }

  useGSAP(() => {
    // headline clip up
    gsap.from('.ab-word', {
      yPercent: 110,
      duration: 1,
      stagger: 0.07,
      ease: 'power4.out',
      delay: 0.3,
    })
    gsap.from('.ab-meta', {
      opacity: 0,
      y: 14,
      stagger: 0.09,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.9,
    })

    // portrait slow drift
    gsap.to(imgRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.ab-intro',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // skills chip stagger
    gsap.from('.ab-skill', {
      opacity: 0,
      scale: 0.7,
      stagger: 0.04,
      duration: 0.5,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.ab-skills-wrap', start: 'top 85%' },
    })

    // experience rows
    gsap.from('.ab-exp-row', {
      x: -40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.ab-exp', start: 'top 82%' },
    })

    // manifesto lines
    gsap.from('.ab-mani', {
      yPercent: 110,
      stagger: 0.09,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.ab-manifesto', start: 'top 80%' },
    })

    // marquee
    gsap.to('.ab-mq', {
      xPercent: -50,
      ease: 'none',
      duration: 18,
      repeat: -1,
    })

    // cta
    gsap.from('.ab-cta-el', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.ab-cta', start: 'top 82%' },
    })
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="bg-[#080808] text-[#e8e3da] overflow-x-hidden" onMouseMove={onMouseMove}>

      {/* Experience hover image follower */}
      <div
        ref={cursorRef}
        style={{ left: 0, top: 0, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}
        className={`fixed z-50 w-[240px] h-[160px] rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-300 hidden md:block ${hoveredExp !== null ? 'opacity-100' : 'opacity-0'}`}
      >
        <img src={aboutProfile} alt="" className="w-full h-full object-cover object-center grayscale" />
      </div>

      {/* ══ §1 HERO ══ */}
      <section className="ab-intro relative w-full min-h-screen flex flex-col justify-between pt-36 pb-12 px-7 md:px-14 overflow-hidden">
        {/* portrait — sits right, absolute */}
        <div className="absolute right-0 top-0 h-full w-[42%] hidden md:block overflow-hidden">
          <div ref={imgRef} className="h-[115%] w-full -mt-[7%]">
            <img src={aboutProfile} alt="Suryansh" className="w-full h-full object-cover object-center grayscale opacity-60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/30 to-transparent" />
        </div>

        {/* copy */}
        <div className="relative z-10 max-w-[55%]">
          <div className="overflow-hidden mb-2">
            <p className="ab-meta font-[font2] text-xs tracking-[0.3em] text-[#D3FD50] uppercase">Creative Developer · 2024–26</p>
          </div>
          <div className="font-[font1] uppercase tracking-tighter leading-[0.84]">
            {['ABOUT', 'ME.'].map((w) => (
              <div key={w} className="overflow-hidden">
                <h1 className="ab-word text-[13vw] text-[#e8e3da]">{w}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-24 max-w-[60%]">
          <p className="ab-meta font-[font2] text-[#e8e3da]/50 text-base leading-relaxed max-w-sm">
            I design and build premium interactive websites — where bold visual design meets engineering craftsmanship.
          </p>
          <div className="ab-meta font-[font2] text-xs text-[#3a3a3a] uppercase tracking-widest flex flex-col gap-1">
            <span>Based in New Delhi, India</span>
            <span>Available for freelance</span>
            <a href="mailto:suryanshyadav117@gmail.com" className="text-[#D3FD50] mt-2 hover:underline">
              suryanshyadav117@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ══ §2 SKILLS ══ */}
      <section className="ab-skills-wrap w-full py-24 px-7 md:px-14 border-t border-white/5">
        <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-10">TECH STACK</p>
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              className="ab-skill font-[font2] text-xs uppercase tracking-widest border border-white/10 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full px-5 py-2.5 transition-all duration-300 cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ══ §3 EXPERIENCE ══ */}
      <section className="ab-exp w-full py-24 px-7 md:px-14 border-t border-white/5">
        <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-12">EXPERIENCE</p>
        <div className="flex flex-col border-b border-white/5">
          {experience.map((e, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredExp(i)}
              onMouseLeave={() => setHoveredExp(null)}
              className="ab-exp-row group flex flex-col md:flex-row md:items-start gap-4 md:gap-16 py-8 border-t border-white/5 hover:bg-white/[0.015] px-3 transition-colors duration-300 cursor-default"
            >
              <span className="font-[font2] text-xs tracking-widest text-[#3a3a3a] group-hover:text-[#D3FD50] transition-colors duration-300 shrink-0 pt-1">
                {e.year}
              </span>
              <div className="flex-grow">
                <h3 className="font-[font1] text-2xl md:text-3xl uppercase text-[#e8e3da] group-hover:text-[#D3FD50] transition-colors duration-300">
                  {e.role}
                </h3>
                <p className="font-[font2] text-sm text-[#3a3a3a] mt-1">{e.company}</p>
                <p className="font-[font2] text-sm text-[#e8e3da]/40 mt-3 max-w-lg leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ §4 MANIFESTO ══ */}
      <section className="ab-manifesto w-full py-24 px-7 md:px-14 border-t border-white/5">
        <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-10">DESIGN PHILOSOPHY</p>
        {[
          ['PRECISION OVER', '#e8e3da'],
          ['DECORATION.', '#e8e3da'],
          ['MOTION OVER', '#e8e3da'],
          ['STATIC.', '#D3FD50'],
        ].map(([text, color]) => (
          <div key={text} className="overflow-hidden">
            <h2 style={{ color }} className="ab-mani font-[font1] text-[7vw] uppercase leading-none tracking-tighter">
              {text}
            </h2>
          </div>
        ))}
      </section>

      {/* ══ §5 TICKER ══ */}
      <div className="w-full overflow-hidden border-y border-white/5 py-4">
        <div className="ab-mq flex whitespace-nowrap font-[font1] text-[3vw] uppercase text-white/5 select-none">
          {'REACT · NEXT.JS · NODE.JS · MONGODB · FIREBASE · TAILWIND CSS · GSAP · THREE.JS · VITE · FIGMA · REACT · NEXT.JS · NODE.JS · MONGODB · FIREBASE · TAILWIND CSS · GSAP · THREE.JS · VITE · FIGMA · '}
        </div>
      </div>

      {/* ══ §6 CTA ══ */}
      <section className="ab-cta w-full py-28 px-7 md:px-14 border-t border-white/5 text-center flex flex-col items-center">
        <p className="ab-cta-el font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-6">GET IN TOUCH</p>
        <h2 className="ab-cta-el font-[font1] text-5xl md:text-7xl uppercase leading-none tracking-tight text-[#e8e3da] mb-10 max-w-3xl">
          WANT TO WORK<br />TOGETHER?
        </h2>
        <a
          href="mailto:suryanshyadav117@gmail.com"
          data-cursor
          className="ab-cta-el group relative inline-flex items-center gap-3 font-[font2] text-sm uppercase tracking-widest border border-white/20 rounded-full px-10 py-4 overflow-hidden hover:border-[#D3FD50] hover:text-black transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#D3FD50] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10" />
          <span className="relative z-10">START A CONVERSATION</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">↗</span>
        </a>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-3xl text-left font-[font2] text-xs text-[#3a3a3a] uppercase tracking-widest pt-12 border-t border-white/5">
          <div>
            <h4 className="text-[#e8e3da] font-[font1] mb-2 text-sm">LOCATION</h4>
            <p>New Delhi, India</p>
            <p className="mt-1">GMT +5:30</p>
          </div>
          <div>
            <h4 className="text-[#e8e3da] font-[font1] mb-2 text-sm">SERVICES</h4>
            <p>Web Design & Dev</p>
            <p className="mt-1">Motion & 3D</p>
          </div>
          <div>
            <h4 className="text-[#e8e3da] font-[font1] mb-2 text-sm">SOCIALS</h4>
            {['GITHUB', 'LINKEDIN', 'DRIBBBLE'].map((s) => (
              <a key={s} href="#" className="block mt-1 hover:text-[#D3FD50] transition-colors duration-300">{s}</a>
            ))}
          </div>
        </div>
        <p className="font-[font2] text-[10px] text-[#222] mt-10 tracking-widest uppercase">
          © {new Date().getFullYear()} Suryansh Yadav. All rights reserved.
        </p>
      </section>

    </main>
  )
}