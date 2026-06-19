import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import img5 from '../assets/img5.jpeg'
import homeVideo from '../assets/HomeVIdeo.mp4'
import clubPreview from '../assets/club-preview.png'
import creatorPreview from '../assets/creator-preview.png'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────
   ✏️  EDIT YOUR PROJECTS HERE
   Replace the placeholder data with your own project details.
   - accentColor: any CSS color
   - link: URL to live site or GitHub
   - featured: true = shows as hero card at top
───────────────────────────────────────────────────────────────── */
const projects = [
  {
    num: '01',
    title: 'ANIMATED WEBSITE',
    sub: 'Personal Portfolio · 2024',
    year: '2024',
    tags: ['React', 'GSAP', 'Lenis', 'Vite'],
    accentColor: '#D3FD50',
    link: 'https://github.com/Suryansh2803',
    preview: null,
    desc: 'The very site you are looking at. Built with React, GSAP ScrollTrigger, and Lenis smooth scroll to deliver a cinematic browsing experience with staggered animations and scroll-driven image sequences.',
    featured: true,
  },
  {
    num: '02',
    title: 'CLUB WEBSITE',
    sub: 'Abhyudaya Club · GLBITM · 2023',
    year: '2023',
    tags: ['React', 'Node.js', 'MongoDB'],
    accentColor: '#6366f1',
    link: 'https://club-website-zoue.vercel.app/',
    preview: clubPreview,
    desc: 'Official platform for Abhyudaya Club — department of CSE-AIML. Features member directories, event listings, gallery, and club announcements.',
    featured: false,
  },
  {
    num: '03',
    title: 'CREATOR COPILOT AI',
    sub: 'AI SaaS Platform · 2024',
    year: '2024',
    tags: ['Next.js', 'Tailwind', 'Gemini 2.5'],
    accentColor: '#a855f7',
    link: 'https://creatorcopilotai.vercel.app/',
    preview: creatorPreview,
    desc: 'Your AI copilot for content creation — analyze profiles, generate ideas, find brand deals, and verify authenticity powered by Gemini 2.5.',
    featured: false,
  },
]

/* ─── Floating cursor card ─────────────────────────────────────── */
function CursorCard({ active, projects, cursorRef }) {
  const p = projects[active]
  return (
    <div
      ref={cursorRef}
      style={{ left: 0, top: 0, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}
      className={`fixed z-50 transition-opacity duration-300 hidden md:block ${active !== null ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        style={{ backgroundColor: p ? p.accentColor : '#D3FD50' }}
        className="w-[200px] h-[56px] rounded-full flex items-center justify-center"
      >
        <span className="font-[font2] text-[11px] uppercase tracking-widest text-black font-bold">
          {p ? 'VIEW PROJECT ↗' : ''}
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  const pageRef  = useRef(null)
  const cursorRef = useRef(null)
  const [active, setActive] = useState(null)

  const featured = projects.find((p) => p.featured)
  const rest      = projects.filter((p) => !p.featured)

  const onMouseMove = (e) => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power3.out' })
  }

  useGSAP(() => {
    // hero words
    gsap.from('.pj-word', {
      yPercent: 115,
      duration: 1.1,
      stagger: 0.07,
      ease: 'power4.out',
      delay: 0.35,
    })
    gsap.from('.pj-meta', {
      opacity: 0, y: 14,
      stagger: 0.08,
      duration: 0.8,
      delay: 1.0,
      ease: 'power3.out',
    })

    // featured card slide up
    gsap.from('.pj-featured', {
      y: 60, opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.pj-featured', start: 'top 88%' },
    })

    // project rows
    gsap.utils.toArray('.pj-row').forEach((el, i) => {
      gsap.from(el, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    })

    // grid cards
    gsap.from('.pj-grid-card', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pj-grid',
        start: 'top 95%',
        once: true,
      },
    })

    // 3D glass cards — smooth scroll-scrubbed tilt (NO full 360 to avoid backface mirror)
    gsap.utils.toArray('.glass-card').forEach((card, i) => {
      // Enter: card rises + tilts in from one side
      gsap.fromTo(card,
        { autoAlpha: 0, y: 80, rotateY: i % 2 === 0 ? -25 : 25, scale: 0.92 },
        {
          autoAlpha: 1, y: 0, rotateY: 0, scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 95%', once: true },
        }
      )
      // Subtle parallax tilt while scrolling past
      gsap.to(card, {
        rotateX: i % 2 === 0 ? 4 : -4,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    // stats ticker
    gsap.to('.pj-mq', {
      xPercent: -50,
      ease: 'none',
      duration: 22,
      repeat: -1,
    })

    // cta
    gsap.from('.pj-cta-el', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.pj-cta', start: 'top 82%' },
    })
  }, { scope: pageRef })

  return (
    <main
      ref={pageRef}
      className="bg-[#080808] text-[#e8e3da] overflow-x-hidden min-h-screen"
      onMouseMove={onMouseMove}
    >
      <CursorCard active={active} projects={projects} cursorRef={cursorRef} />

      {/* ══ §1 PAGE HEADER ══════════════════════════════════════ */}
      <section className="w-full min-h-[65vh] flex flex-col justify-between pt-36 pb-16 px-7 md:px-14 border-b border-white/5 relative overflow-hidden">
        {/* faint bg image */}
        <div className="absolute right-0 top-0 h-full w-[35%] opacity-10 pointer-events-none hidden md:block">
          <img src={img5} alt="" className="w-full h-full object-cover object-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="overflow-hidden mb-3">
            <p className="pj-meta font-[font2] text-xs tracking-[0.35em] text-[#D3FD50] uppercase">
              {projects.length} Projects · 2024 – 2026
            </p>
          </div>
          <div className="font-[font1] uppercase tracking-tighter leading-[0.84]">
            {['SELECTED', 'WORK.'].map((w) => (
              <div key={w} className="overflow-hidden">
                <h1 className="pj-word text-[13vw] text-[#e8e3da]">{w}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <p className="pj-meta font-[font2] text-[#e8e3da]/40 text-base leading-relaxed max-w-xs">
            A curated selection of interactive builds, brand work, and engineering projects.
          </p>
          <div className="pj-meta flex gap-6 font-[font2] text-[10px] tracking-widest uppercase text-[#3a3a3a]">
            <span>React</span><span>/</span>
            <span>GSAP</span><span>/</span>
            <span>Three.js</span><span>/</span>
            <span>Next.js</span>
          </div>
        </div>
      </section>

      {/* ══ §2 FEATURED PROJECT ═════════════════════════════════ */}
      {featured && (
        <section className="w-full px-7 md:px-14 py-20 border-b border-white/5">
          <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-8">FEATURED PROJECT</p>
          <a
            href={featured.link}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setActive(projects.indexOf(featured))}
            onMouseLeave={() => setActive(null)}
            className="pj-featured block group relative overflow-hidden rounded-2xl bg-[#111] border border-white/5 hover:border-[#D3FD50]/30 transition-all duration-500"
          >
            {/* large color band */}
            <div
              style={{ backgroundColor: featured.accentColor }}
              className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
            />
            <div className="flex flex-col md:flex-row">
              {/* left: text content */}
              <div className="flex-grow p-8 md:p-12 flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-[font2] text-[10px] tracking-widest text-[#3a3a3a] uppercase">{featured.num}</span>
                    <span className="w-8 h-px bg-[#3a3a3a]" />
                    <span className="font-[font2] text-[10px] tracking-widest text-[#3a3a3a] uppercase">{featured.year}</span>
                  </div>
                  <h2 className="font-[font1] text-5xl md:text-7xl uppercase leading-none text-[#e8e3da] group-hover:text-[#D3FD50] transition-colors duration-500 mb-2">
                    {featured.title}
                  </h2>
                  <p className="font-[font2] text-sm text-[#3a3a3a] mb-6">{featured.sub}</p>
                  <p className="font-[font2] text-[#e8e3da]/50 text-base leading-relaxed max-w-lg">{featured.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                  {featured.tags.map((t) => (
                    <span key={t} className="font-[font2] text-[10px] tracking-widest uppercase border border-white/10 group-hover:border-[#D3FD50]/30 rounded-full px-4 py-1.5 text-[#3a3a3a] transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* right: image panel */}
              <div className="md:w-[340px] h-[220px] md:h-auto overflow-hidden relative shrink-0 border-t md:border-t-0 md:border-l border-white/5">
                <img
                  src={img5}
                  alt={featured.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111]/60 via-transparent to-transparent md:block hidden" />
                <div className="absolute bottom-4 right-4">
                  <span
                    style={{ backgroundColor: featured.accentColor }}
                    className="font-[font2] text-[10px] uppercase tracking-widest text-black rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    LIVE ↗
                  </span>
                </div>
              </div>
            </div>
          </a>
        </section>
      )}

      {/* ══ §3 PROJECTS LIST (numbered rows) ════════════════════ */}
      <section className="w-full px-7 md:px-14 py-16 border-b border-white/5">
        <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-10">ALL PROJECTS</p>
        <div className="flex flex-col border-b border-white/5">
          {rest.map((p, i) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setActive(projects.indexOf(p))}
              onMouseLeave={() => setActive(null)}
              className="pj-row group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-t border-white/5 px-3 overflow-hidden cursor-pointer"
            >
              {/* fill */}
              <div
                style={{ backgroundColor: p.accentColor }}
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 -z-10"
              />
              <div className="flex items-baseline gap-5">
                <span className="font-[font2] text-[10px] text-[#3a3a3a] group-hover:text-black/30 transition-colors duration-300 tracking-widest shrink-0">
                  {p.num}
                </span>
                <div>
                  <h3 className="font-[font1] text-2xl md:text-4xl uppercase text-[#e8e3da] group-hover:text-black transition-colors duration-300 leading-none">
                    {p.title}
                  </h3>
                  <p className="font-[font2] text-xs text-[#3a3a3a] group-hover:text-black/40 transition-colors duration-300 mt-1">
                    {p.sub}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t} className="font-[font2] text-[10px] tracking-widest uppercase border border-white/10 group-hover:border-black/20 group-hover:text-black/50 rounded-full px-3 py-1 text-[#3a3a3a] transition-all duration-300 hidden md:block">
                    {t}
                  </span>
                ))}
                <span className="font-[font2] text-xs text-[#3a3a3a] group-hover:text-black/40 transition-colors duration-300">{p.year}</span>
                <span className="font-[font1] text-xl text-[#D3FD50] group-hover:text-black group-hover:translate-x-1 transition-all duration-300">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ §4 MINI GRID (detail cards) ═════════════════════════ */}
      <section className="pj-grid w-full px-7 md:px-14 py-20 border-b border-white/5">
        <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-10">PROJECT DETAILS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              style={{ ['--pj-acc']: p.accentColor }}
              className="pj-grid-card group relative flex flex-col justify-between rounded-2xl border border-white/5 hover:border-white/15 bg-[#0e0e0e] hover:bg-[#141414] p-6 min-h-[220px] overflow-hidden transition-all duration-400 cursor-pointer"
            >
              {/* accent line top */}
              <div
                style={{ backgroundColor: p.accentColor }}
                className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[font2] text-[10px] tracking-widest text-[#3a3a3a] uppercase">{p.num} · {p.year}</span>
                  <span
                    style={{ color: p.accentColor }}
                    className="font-[font1] text-base opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  >↗</span>
                </div>
                <h3
                  className="font-[font1] text-2xl uppercase leading-tight text-[#e8e3da] mb-1 group-hover:text-[inherit] transition-colors duration-300"
                  style={{ color: 'var(--pj-acc)' }}
                >
                  {p.title}
                </h3>
                <p className="font-[font2] text-xs text-[#3a3a3a] mb-4">{p.sub}</p>
                <p className="font-[font2] text-sm text-[#e8e3da]/30 leading-relaxed line-clamp-3">{p.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {p.tags.map((t) => (
                  <span key={t} className="font-[font2] text-[9px] uppercase tracking-widest border border-white/8 rounded-full px-3 py-1 text-[#3a3a3a]">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ §4.5 3D GLASS CARDS ══════════════════════════════════ */}
      <section className="w-full px-7 md:px-14 py-28 border-b border-white/5" style={{ perspective: '1400px', perspectiveOrigin: 'center' }}>
        <p className="font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-4">LIVE PROJECTS</p>
        <h2 className="font-[font1] text-5xl md:text-6xl uppercase leading-none text-[#e8e3da] mb-20">EXPLORE WORK</h2>
        <div className="flex flex-col items-center gap-20">
          {projects.filter(p => p.link !== '#').map((p, i) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="glass-card block w-full max-w-4xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="relative rounded-3xl overflow-hidden border cursor-pointer group"
                style={{
                  borderColor: `${p.accentColor}25`,
                  boxShadow: `0 0 100px ${p.accentColor}18, 0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`,
                  minHeight: '360px',
                }}
              >
                {/* ── Background: project screenshot or video fallback ── */}
                {p.preview ? (
                  <img
                    src={p.preview}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ opacity: 0.35, transition: 'opacity 0.5s ease' }}
                  />
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={homeVideo}
                    autoPlay loop muted playsInline
                    style={{ opacity: 0.22 }}
                  />
                )}

                {/* Stronger dark scrim so text is always readable */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(120deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.92) 100%)`,
                  }}
                />

                {/* Accent colour tint */}
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 70% 20%, ${p.accentColor}18 0%, transparent 65%)` }}
                />

                {/* Glass frost highlight at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}60, transparent)` }}
                />

                {/* Accent glow orbs */}
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                  style={{ background: p.accentColor, opacity: 0.10, transform: 'translate(35%, -35%)' }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-2xl pointer-events-none"
                  style={{ background: p.accentColor, opacity: 0.07, transform: 'translate(-25%, 25%)' }} />

                {/* ── Content ── */}
                <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row gap-10 items-start">

                  {/* Left: index number (large decorative) */}
                  <div
                    className="hidden md:block font-[font1] shrink-0 leading-none select-none"
                    style={{ fontSize: '7rem', color: `${p.accentColor}20`, lineHeight: 1 }}
                  >
                    {p.num}
                  </div>

                  {/* Right: actual info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span className="font-[font2] text-[10px] tracking-widest uppercase mb-2 block" style={{ color: p.accentColor }}>
                          {p.year} · {p.sub}
                        </span>
                        <h3 className="font-[font1] text-3xl md:text-5xl uppercase leading-none tracking-tight text-[#e8e3da]">
                          {p.title}
                        </h3>
                      </div>
                      <span
                        className="font-[font2] text-[10px] uppercase tracking-widest rounded-full px-4 py-2 border shrink-0 mt-1 group-hover:bg-[var(--acc)] group-hover:text-black transition-all duration-400"
                        style={{ borderColor: `${p.accentColor}50`, color: p.accentColor, '--acc': p.accentColor }}
                      >
                        LIVE ↗
                      </span>
                    </div>

                    {/* Accent divider */}
                    <div className="h-px mb-6 w-full" style={{ background: `linear-gradient(90deg, ${p.accentColor}50, transparent)` }} />

                    <p className="font-[font2] text-sm text-[#e8e3da]/60 leading-relaxed mb-8 max-w-lg">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span
                          key={t}
                          className="font-[font2] text-[10px] uppercase tracking-widest rounded-full px-4 py-1.5"
                          style={{ background: `${p.accentColor}14`, border: `1px solid ${p.accentColor}35`, color: p.accentColor }}
                        >{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover: reveal full glow border */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 0 1px ${p.accentColor}45` }}
                />

                {/* Bottom shimmer line */}
                <div className="absolute bottom-0 left-0 right-0 h-px z-10"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}60, transparent)` }} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ §5 TICKER ═══════════════════════════════════════════ */}
      <div className="w-full overflow-hidden border-y border-white/5 py-4">
        <div className="pj-mq flex whitespace-nowrap font-[font1] text-[3vw] uppercase text-white/5 select-none">
          {'REACT · NEXT.JS · NODE.JS · MONGODB · FIREBASE · TAILWIND CSS · GSAP · THREE.JS · VITE · FIGMA · REACT · NEXT.JS · NODE.JS · MONGODB · FIREBASE · TAILWIND CSS · GSAP · THREE.JS · VITE · FIGMA · '}
        </div>
      </div>

      {/* ══ §6 CTA ══════════════════════════════════════════════ */}
      <section className="pj-cta w-full py-28 px-7 md:px-14 border-t border-white/5 text-center flex flex-col items-center">
        <p className="pj-cta-el font-[font2] text-xs tracking-widest text-[#D3FD50] uppercase mb-6">
          WANT TO COLLABORATE?
        </p>
        <h2 className="pj-cta-el font-[font1] text-5xl md:text-7xl uppercase leading-none tracking-tight text-[#e8e3da] mb-12 max-w-3xl">
          LET'S BUILD<br />SOMETHING NEW.
        </h2>

        {/* glowing email pill */}
        <a
          href="mailto:suryanshyadav117@gmail.com"
          data-cursor
          className="pj-cta-el group relative inline-flex items-center gap-3 font-[font2] text-sm uppercase tracking-widest border border-white/15 rounded-full px-10 py-4 overflow-hidden hover:border-[#D3FD50] hover:text-black transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#D3FD50] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10" />
          <span className="relative z-10">SURYANSHYADAV117@GMAIL.COM</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">↗</span>
        </a>

        <p className="font-[font2] text-[10px] text-[#222] mt-20 tracking-widest uppercase">
          © {new Date().getFullYear()} Suryansh Yadav. All rights reserved.
        </p>
      </section>

    </main>
  )
}