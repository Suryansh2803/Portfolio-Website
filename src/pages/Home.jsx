import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import heroBg from '../assets/hero-bg.png'
import aboutProfile from '../assets/about-profile.jpg'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { num: '01', title: 'ANIMATED WEBSITE', year: '2026', tags: ['React', 'GSAP', 'Lenis'], link: 'https://github.com/Suryansh2803' },
  { num: '02', title: 'CLUB WEBSITE', year: '2025', tags: ['React', 'Node.js', 'MongoDB'], link: 'https://club-website-zoue.vercel.app/' },
  { num: '03', title: 'CREATOR COPILOT AI', year: '2026', tags: ['Next.js', 'Tailwind', 'AI'], link: 'https://creatorcopilotai.vercel.app/' },
]

export default function Home() {
  const pageRef = useRef(null)

  useGSAP(() => {
    // hero words clip up
    gsap.from('.h-word', {
      yPercent: 110,
      opacity: 0,
      stagger: 0.07,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5,
    })
    // hero meta fade in
    gsap.from('.h-meta', {
      opacity: 0,
      y: 16,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1.1,
    })
    // scroll line pulse
    gsap.to('.h-scroll-line', {
      scaleY: 1.6,
      opacity: 0.2,
      repeat: -1,
      yoyo: true,
      duration: 1.1,
      ease: 'sine.inOut',
    })

    // video overlay darkens on scroll
    gsap.to('.h-video-overlay', {
      opacity: 0.7,
      scrollTrigger: {
        trigger: '.h-hero',
        start: 'top top',
        end: '60% top',
        scrub: 1,
      },
    })

    // statement lines reveal
    gsap.from('.h-stmt', {
      yPercent: 105,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.h-statement', start: 'top 82%' },
    })

    // ticker marquee
    gsap.to('.h-mq', {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    })

    // project rows alternate
    gsap.utils.toArray('.h-proj-row').forEach((el, i) => {
      gsap.from(el, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    })

    // portrait parallax
    gsap.to('.h-portrait', {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.h-about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // about text clip
    gsap.from('.h-about-line', {
      yPercent: 110,
      duration: 0.85,
      stagger: 0.08,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.h-about', start: 'top 78%' },
    })

    // counters
    gsap.utils.toArray('.h-count').forEach((el) => {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: parseInt(el.dataset.target),
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => { el.textContent = Math.floor(obj.v) },
      })
    })
    gsap.from('.h-stat', {
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'back.out(1.6)',
      scrollTrigger: { trigger: '.h-stats', start: 'top 84%' },
    })

    // CTA reveal
    gsap.from('.h-cta-el', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.h-cta', start: 'top 80%' },
    })
    gsap.from('.h-cta-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.h-cta', start: 'top 80%' },
    })
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="bg-[#080808] text-[#e8e3da] overflow-x-hidden">

      {/* ══ §1 HERO ══════════════════════════════════════════════ */}
      <section className="h-hero relative h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* video bg */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="Hero Background" className="w-full h-full object-cover opacity-40" />
          <div className="h-video-overlay absolute inset-0 bg-[#080808] opacity-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808]" />
        </div>

        {/* hero copy */}
        <div className="relative z-10 flex-grow flex flex-col justify-center px-7 md:px-14 pt-28">
          <p className="h-meta font-[font2] text-xs tracking-[0.3em] text-[#D3FD50] uppercase mb-6">
            Creative Developer · 2024–26
          </p>
          <div className="leading-[0.84] mt-2">
            {/* SURYANSH — italic, light weight */}
            <div className="overflow-hidden">
              <h1
                className="h-word text-[#e8e3da]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(80px, 14vw, 220px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.88,
                }}
              >
                Suryansh
              </h1>
            </div>
            {/* YADAV — upright, heavier, wide spacing */}
            <div className="overflow-hidden">
              <h1
                className="h-word text-[#e8e3da]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(80px, 14vw, 220px)',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  letterSpacing: '0.08em',
                  lineHeight: 0.88,
                }}
              >
                Yadav
              </h1>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative z-10 flex items-end justify-between px-7 md:px-14 pb-8">
          <p className="h-meta font-[font2] text-xs tracking-widest text-[#e8e3da]/40 uppercase max-w-xs leading-relaxed">
            I design and build interactive web experiences that feel alive.
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="h-meta font-[font2] text-[10px] tracking-widest text-[#e8e3da]/30 uppercase">scroll</span>
            <div className="h-scroll-line w-px h-12 bg-[#D3FD50] origin-top" />
          </div>
        </div>
      </section>

      {/* ══ §2 STATEMENT ═════════════════════════════════════════ */}
      <section className="h-statement w-full py-28 px-7 md:px-20 border-t border-white/5">
        <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-10">PHILOSOPHY</p>
        <div className="space-y-1">
          {[
            ['I BUILD THINGS THAT', '#e8e3da'],
            ['MOVE WITH PURPOSE,',  '#e8e3da'],
            ['FEEL INTENTIONAL,',   '#e8e3da'],
            ['AND LAST.',           '#D3FD50'],
          ].map(([text, color]) => (
            <div key={text} className="overflow-hidden">
              <p style={{ color }} className="h-stmt font-[font1] text-[5.5vw] uppercase leading-none tracking-tight">
                {text}
              </p>
            </div>
          ))}
        </div>
        <p className="font-[font2] text-[#e8e3da]/50 text-lg leading-relaxed mt-14 max-w-sm ml-auto">
          I obsess over the space between design and code — where the right transition changes everything.
        </p>
      </section>

      {/* ══ §3 TICKER ════════════════════════════════════════════ */}
      <div className="w-full overflow-hidden border-y border-white/5 py-4">
        <div className="h-mq flex whitespace-nowrap font-[font1] text-[3.5vw] uppercase text-[#e8e3da]/10 select-none">
          {'REACT · NEXT.JS · NODE.JS · MONGODB · FIREBASE · TAILWIND CSS · GSAP · THREE.JS · VITE · FIGMA · REACT · NEXT.JS · NODE.JS · MONGODB · FIREBASE · TAILWIND CSS · GSAP · THREE.JS · VITE · FIGMA · '}
        </div>
      </div>

      {/* ══ §4 SELECTED WORK ═════════════════════════════════════ */}
      <section className="w-full py-28 px-7 md:px-14 border-t border-white/5">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-2">SELECTED WORK</p>
            <h2 className="font-[font1] text-5xl md:text-6xl uppercase leading-none text-[#e8e3da]">PROJECTS</h2>
          </div>
          <Link to="/projects" className="font-[font2] text-xs tracking-widest uppercase border border-white/20 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full px-5 py-2.5 transition-all duration-300 hidden md:block">
            ALL WORK →
          </Link>
        </div>

        <div className="flex flex-col border-b border-white/5">
          {projects.map((p, i) => (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              key={p.num}
              className="h-proj-row group relative flex items-center justify-between py-7 border-t border-white/5 px-3 overflow-hidden cursor-pointer block"
            >
              <div className="absolute inset-0 bg-[#D3FD50] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 -z-10" />
              <div className="flex items-baseline gap-5">
                <span className="font-[font2] text-[10px] text-[#3a3a3a] group-hover:text-black/40 transition-colors duration-300 tracking-widest">{p.num}</span>
                <h3 className="font-[font1] text-xl md:text-3xl uppercase text-[#e8e3da] group-hover:text-black transition-colors duration-300">{p.title}</h3>
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="hidden md:flex gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-[font2] text-[10px] tracking-widest text-[#3a3a3a] group-hover:text-black/50 uppercase transition-colors duration-300 border border-white/10 group-hover:border-black/20 rounded-full px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-[font2] text-xs text-[#3a3a3a] group-hover:text-black/40 transition-colors duration-300">{p.year}</span>
                <span className="font-[font1] text-lg text-[#e8e3da] group-hover:text-black group-hover:translate-x-2 transition-all duration-300">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ §5 ABOUT STRIP ═══════════════════════════════════════ */}
      <section className="h-about w-full py-28 px-7 md:px-14 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* portrait */}
          <div className="relative overflow-hidden rounded-2xl h-[70vh] bg-[#111] order-2 md:order-1">
            <img
              src={aboutProfile}
              alt="Suryansh Yadav"
              className="h-portrait w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 font-[font2] text-xs text-[#e8e3da]/50 uppercase tracking-widest">
              Suryansh Yadav · New Delhi
            </div>
          </div>

          {/* text */}
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-8">ABOUT ME</p>
            {[
              'I\'M A CREATIVE',
              'DEVELOPER BASED',
              'IN NEW DELHI.',
            ].map((l) => (
              <div key={l} className="overflow-hidden">
                <h2 className="h-about-line font-[font1] text-[6vw] md:text-[4vw] uppercase leading-none text-[#e8e3da] tracking-tight">
                  {l}
                </h2>
              </div>
            ))}
            <p className="font-[font2] text-[#e8e3da]/50 text-base leading-relaxed mt-8 max-w-md">
              I bridge the gap between design thinking and front-end engineering — crafting interfaces that feel premium, respond beautifully, and load fast. Specialising in React, GSAP, and Three.js.
            </p>
            <Link to="/agence" className="mt-10 self-start font-[font2] text-xs tracking-widest uppercase border border-white/20 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full px-6 py-3 transition-all duration-300">
              FULL BIO →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ §6 STATS ═════════════════════════════════════════════ */}
      <section className="h-stats w-full py-20 px-7 md:px-14 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: 40,  sfx: '+', label: 'PROJECTS' },
            { v: 5,   sfx: 'Y+', label: 'EXPERIENCE' },
            { v: 12,  sfx: '',  label: 'AWARDS' },
            { v: 100, sfx: '%', label: 'PASSION' },
          ].map((s, i) => (
            <div key={i} className="h-stat text-center flex flex-col items-center">
              <div className="font-[font1] text-[10vw] md:text-[4vw] text-[#D3FD50] flex items-baseline leading-none">
                <span className="h-count" data-target={s.v}>0</span>
                <span>{s.sfx}</span>
              </div>
              <span className="font-[font2] text-[10px] tracking-widest text-[#3a3a3a] mt-3 uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ §7 CTA ═══════════════════════════════════════════════ */}
      <section className="h-cta w-full py-28 px-7 md:px-14 border-t border-white/5 flex flex-col items-center text-center">
        <p className="h-cta-el font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-6">AVAILABLE FOR WORK</p>
        <h2 className="h-cta-el font-[font1] text-5xl md:text-7xl uppercase leading-none tracking-tight text-[#e8e3da] mb-4 max-w-3xl">
          LET'S MAKE<br />SOMETHING GREAT
        </h2>
        <div className="h-cta-line w-full max-w-3xl h-px bg-white/10 mb-12" />

        <a
          href="mailto:suryanshyadav117@gmail.com"
          data-cursor
          className="h-cta-el group relative inline-flex items-center gap-3 font-[font2] text-sm uppercase tracking-widest border border-white/20 rounded-full px-10 py-4 overflow-hidden hover:border-[#D3FD50] hover:text-black transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#D3FD50] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10" />
          <span className="relative z-10">SURYANSHYADAV117@GMAIL.COM</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">↗</span>
        </a>

        <div className="mt-24 flex gap-8 font-[font2] text-xs text-[#3a3a3a] uppercase tracking-widest">
          {['GITHUB', 'LINKEDIN', 'DRIBBBLE', 'TWITTER'].map((s) => (
            <a key={s} href="#" className="hover:text-[#D3FD50] transition-colors duration-300">{s}</a>
          ))}
        </div>

        <p className="font-[font2] text-[10px] text-[#252525] mt-8 tracking-widest uppercase">
          © {new Date().getFullYear()} Suryansh Yadav. All rights reserved.
        </p>
      </section>

    </main>
  )
}