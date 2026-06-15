import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import homeVideo from '../../assets/HomeVIdeo.mp4'
import img1 from '../../assets/img1.jpeg'
import img2 from '../../assets/img2.jpeg'
import img3 from '../../assets/img3.jpeg'
import img4 from '../../assets/img4.jpeg'
import img5 from '../../assets/img5.jpeg'

gsap.registerPlugin(ScrollTrigger)

const works = [
  { num: '01', title: 'BRAND IDENTITY', sub: 'Visual systems for bold companies', img: img1 },
  { num: '02', title: 'WEB EXPERIENCE', sub: 'Award-winning digital builds',       img: img2 },
  { num: '03', title: 'MOTION DESIGN',  sub: 'Cinematic UI animations',            img: img3 },
  { num: '04', title: 'E-COMMERCE',     sub: 'Performance-first storefronts',      img: img4 },
]

export default function HomeContent() {
  const pageRef = useRef(null)

  useGSAP(() => {

    // ── HERO: name words clip up ──────────────────────────────────
    gsap.from('.hm-word', {
      y: '110%',
      opacity: 0,
      stagger: 0.09,
      duration: 1.1,
      ease: 'power4.out',
      delay: 0.4,
    })

    // ── HERO: bottom pill buttons fade in ────────────────────────
    gsap.from('.hm-pill', {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      delay: 1.0,
    })

    // ── HERO: scroll hint pulse ───────────────────────────────────
    gsap.to('.hm-scroll-dot', {
      scaleY: 1.8,
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'power1.inOut',
    })

    // ── VIDEO overlay: darkens as you scroll away ────────────────
    gsap.to('.hm-vignette', {
      opacity: 1,
      scrollTrigger: {
        trigger: '.hm-hero',
        start: 'top top',
        end: '50% top',
        scrub: 1,
      },
    })

    // ── STATEMENT: big text scrolls at different speed ───────────
    gsap.from('.hm-statement-line', {
      y: 80,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.hm-statement', start: 'top 80%' },
    })

    // ── MARQUEE TICKER ────────────────────────────────────────────
    gsap.to('.hm-mq', {
      xPercent: -50,
      ease: 'none',
      duration: 18,
      repeat: -1,
    })

    // ── WORKS: rows slide in ──────────────────────────────────────
    gsap.utils.toArray('.hm-work-row').forEach((el, i) => {
      gsap.from(el, {
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    // ── FEATURE IMAGES: parallax drift ───────────────────────────
    gsap.utils.toArray('.hm-para-img').forEach((el) => {
      gsap.to(el, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    })

    // ── ABOUT BLOCK: counters ────────────────────────────────────
    gsap.utils.toArray('.hm-count').forEach((el) => {
      const end = parseInt(el.dataset.target, 10)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        onUpdate: () => { el.textContent = Math.floor(obj.v) },
      })
    })
    gsap.from('.hm-count-item', {
      scale: 0.75,
      opacity: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.hm-counts', start: 'top 84%' },
    })

    // ── CTA block: line draw ─────────────────────────────────────
    gsap.from('.hm-cta-line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.hm-cta', start: 'top 80%' },
    })

    gsap.from('.hm-cta-text', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.hm-cta', start: 'top 80%' },
    })

  }, { scope: pageRef })

  return (
    <div ref={pageRef} className="bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          §1 — HERO  (full-screen video + text)
      ═══════════════════════════════════════════ */}
      <section className="hm-hero relative h-screen w-full flex flex-col justify-between overflow-hidden">

        {/* background video */}
        <div className="absolute inset-0 z-0">
          <video className="h-full w-full object-cover" src={homeVideo} autoPlay loop muted playsInline />
          {/* dark overlay that strengthens on scroll */}
          <div className="hm-vignette absolute inset-0 bg-black/60 opacity-30" />
          {/* subtle gradient at bottom for text legibility */}
          <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* hero name */}
        <div className="relative z-10 flex-grow flex flex-col justify-center px-6 md:px-14">
          <div className="font-[font1] uppercase tracking-tighter leading-[0.88]">
            {['SURYANSH', 'YADAV'].map((word) => (
              <div key={word} className="overflow-hidden">
                <div className="hm-word text-[15vw] text-white">{word}</div>
              </div>
            ))}
            <div className="overflow-hidden mt-2">
              <div className="hm-word text-[4.5vw] text-[#D3FD50] tracking-[0.2em]">CREATIVE STUDIO</div>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="relative z-10 flex items-end justify-between px-6 md:px-14 pb-10">
          {/* nav pills */}
          <div className="flex gap-3 font-[font2]">
            {[['Projects', '/projects'], ['Agence', '/agence']].map(([label, path]) => (
              <Link
                key={path}
                to={path}
                className="hm-pill border border-white/40 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full px-7 py-3 uppercase text-sm tracking-widest transition-all duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* scroll indicator */}
          <div className="flex flex-col items-center gap-2 opacity-50">
            <span className="font-[font2] text-xs tracking-widest uppercase rotate-90 mb-2">Scroll</span>
            <div className="hm-scroll-dot w-1 h-10 bg-[#D3FD50] rounded-full origin-top" />
          </div>

          {/* mini tagline */}
          <p className="font-[font2] text-xs text-white/50 tracking-widest uppercase hidden md:block">
            Web · Design · Motion
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          §2 — STATEMENT
      ═══════════════════════════════════════════ */}
      <section className="hm-statement w-full py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-5xl">
          {[
            { text: 'WE BUILD WEBSITES',    color: 'text-white' },
            { text: 'THAT FEEL HUMAN,',     color: 'text-white' },
            { text: 'MOVE BEAUTIFULLY,',    color: 'text-white' },
            { text: 'AND PERFORM.',         color: 'text-[#D3FD50]' },
          ].map(({ text, color }) => (
            <div key={text} className="overflow-hidden">
              <h2 className={`hm-statement-line font-[font1] text-[6vw] uppercase leading-none tracking-tight ${color}`}>
                {text}
              </h2>
            </div>
          ))}
        </div>
        <p className="font-[font2] text-gray-400 text-xl leading-relaxed mt-14 max-w-md ml-auto">
          Every project begins with a question: what should this feel like? We answer it through code, motion, and obsessive attention to detail.
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          §3 — TICKER TAPE
      ═══════════════════════════════════════════ */}
      <div className="w-full bg-[#D3FD50] text-black py-5 overflow-hidden flex border-t border-b border-white/5">
        <div className="hm-mq flex whitespace-nowrap gap-12 font-[font1] text-4xl md:text-5xl uppercase font-extrabold tracking-tighter">
          {'DESIGN · DEVELOP · SHIP · ANIMATE · DESIGN · DEVELOP · SHIP · ANIMATE · '.repeat(3)}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          §4 — SELECTED WORKS
      ═══════════════════════════════════════════ */}
      <section className="w-full py-32 px-6 md:px-16 border-t border-white/5">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="font-[font2] text-[#D3FD50] text-xs tracking-widest uppercase block mb-2">PORTFOLIO</span>
            <h2 className="font-[font1] text-5xl md:text-7xl uppercase leading-none">SELECTED<br />WORKS</h2>
          </div>
          <Link to="/projects" className="font-[font2] text-sm tracking-widest uppercase border border-white/30 hover:border-[#D3FD50] hover:text-[#D3FD50] rounded-full px-6 py-3 transition-all duration-300 hidden md:block">
            VIEW ALL →
          </Link>
        </div>

        <div className="flex flex-col border-b border-white/10">
          {works.map((w, i) => (
            <div
              key={w.num}
              className="hm-work-row group flex items-center justify-between py-8 border-t border-white/10 cursor-pointer overflow-hidden relative px-4"
            >
              {/* fill bg */}
              <div className="absolute inset-0 bg-[#D3FD50] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 -z-10" />

              <div className="flex items-center gap-6 md:gap-10">
                <span className="font-[font2] text-gray-600 text-xs group-hover:text-black/50 transition-colors duration-300">{w.num}</span>
                <h3 className="font-[font1] text-2xl md:text-4xl uppercase group-hover:text-black transition-colors duration-300">{w.title}</h3>
              </div>

              <div className="flex items-center gap-6">
                <p className="font-[font2] text-gray-500 text-sm hidden md:block group-hover:text-black/70 transition-colors duration-300">{w.sub}</p>
                {/* thumbnail that slides in on hover */}
                <div className="w-0 group-hover:w-20 h-14 overflow-hidden rounded-xl transition-all duration-500 ease-out shrink-0">
                  <img src={w.img} alt={w.title} className="w-full h-full object-cover hm-para-img" />
                </div>
                <span className="font-[font1] text-xl group-hover:text-black group-hover:translate-x-2 transition-all duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          §5 — DUAL FEATURE IMAGES
      ═══════════════════════════════════════════ */}
      <section className="w-full py-24 px-6 md:px-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-3xl h-[60vh] bg-[#161616]">
            <img src={img4} alt="feature" className="hm-para-img w-full h-full object-cover scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase">CONCEPT</span>
              <h3 className="font-[font1] text-3xl uppercase mt-1">DESIGN SYSTEMS</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl h-[60vh] bg-[#161616] md:mt-16">
            <img src={img5} alt="feature" className="hm-para-img w-full h-full object-cover scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase">CRAFT</span>
              <h3 className="font-[font1] text-3xl uppercase mt-1">MOTION & 3D</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          §6 — COUNTER STATS
      ═══════════════════════════════════════════ */}
      <section className="hm-counts w-full py-24 px-6 md:px-16 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { v: 120, sfx: '+', label: 'PROJECTS' },
            { v: 12,  sfx: '',  label: 'AWARDS' },
            { v: 99,  sfx: '%', label: 'RETENTION' },
            { v: 7,   sfx: 'Y+',label: 'EXPERIENCE' },
          ].map((s, i) => (
            <div key={i} className="hm-count-item flex flex-col items-center text-center">
              <div className="font-[font1] text-[9vw] md:text-[4.5vw] text-[#D3FD50] flex items-baseline leading-none">
                <span className="hm-count" data-target={s.v}>0</span>
                <span>{s.sfx}</span>
              </div>
              <span className="font-[font2] text-xs tracking-widest text-gray-500 mt-3 uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          §7 — CTA
      ═══════════════════════════════════════════ */}
      <section className="hm-cta w-full py-32 px-6 md:px-16 border-t border-white/5 text-center flex flex-col items-center">
        <span className="font-[font2] text-[#D3FD50] text-xs tracking-widest uppercase mb-6 hm-cta-text">READY TO START?</span>
        <h2 className="hm-cta-text font-[font1] text-5xl md:text-8xl uppercase leading-none mb-3 max-w-4xl">
          LET'S BUILD<br />SOMETHING GREAT
        </h2>
        <div className="hm-cta-line w-full max-w-4xl h-px bg-white/15 mb-14" />

        <Link
          to="/agence"
          className="hm-cta-text group relative inline-flex items-center gap-4 font-[font2] text-lg uppercase border-2 border-white rounded-full px-12 py-5 overflow-hidden hover:border-[#D3FD50] hover:text-black transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#D3FD50] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10" />
          <span className="relative z-10">EXPLORE THE STUDIO</span>
          <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        <p className="font-[font2] text-xs text-gray-700 mt-24">
          © {new Date().getFullYear()} SURYANSH YADAV CREATIVE STUDIO
        </p>
      </section>

    </div>
  )
}
