import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import homeVideo from '../assets/HomeVIdeo.mp4'
import aboutProfile from '../assets/about-profile.jpg'
import creatorPreview from '../assets/creator-landing-preview.png'
import clubPreview from '../assets/club-preview.png'
import splitvillaPreview from '../assets/splitvilla-preview.png'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const pageRef = useRef(null)
  const projectsRailRef = useRef(null)

  const scrollProjects = (direction) => {
    const rail = projectsRailRef.current
    if (!rail) return
    const cardWidth = rail.firstElementChild?.getBoundingClientRect().width ?? rail.clientWidth
    rail.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' })
  }

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

  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="bg-[#080808] text-[#e8e3da] overflow-x-hidden">

      {/* ══ §1 HERO ══════════════════════════════════════════════ */}
      <section className="h-hero relative h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* video bg */}
        <div className="absolute inset-0">
          <video className="w-full h-full object-cover opacity-40" src={homeVideo} autoPlay loop muted playsInline />
          <div className="h-video-overlay absolute inset-0 bg-[#080808] opacity-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808]" />
        </div>

        {/* hero copy */}
        <div className="relative z-10 flex-grow flex flex-col justify-center px-7 md:px-14 pt-28">
          <p className="h-meta font-[font2] text-xs tracking-[0.3em] text-[#D3FD50] uppercase mb-6">
            Creative Developer ·
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
          <div className="max-w-xs">
            <p className="h-meta font-[font2] text-xs tracking-widest text-[#e8e3da]/60 uppercase leading-relaxed">
              I design and build interactive web experiences that feel alive.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="h-meta font-[font2] text-[10px] tracking-widest text-[#e8e3da]/30 uppercase">scroll</span>
            <div className="h-scroll-line w-px h-12 bg-[#D3FD50] origin-top" />
          </div>
        </div>
      </section>

      {/* ══ §2 FEATURED PROJECT ══════════════════════════════════ */}
      <section id="projects" className="w-full border-y border-white/10 px-7 py-14 md:px-14 md:py-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[0.72fr_1.55fr] lg:gap-14">
          <div className="relative z-10">
            <p className="font-[font2] text-xs tracking-[0.22em] text-[#D3FD50] uppercase mb-3">Featured project <span className="ml-3 inline-block w-14 border-t border-[#D3FD50]/70 align-middle" /></p>
            <h2 className="font-[font1] text-5xl md:text-7xl leading-[0.95]">Creator<br />Copilot AI</h2>
            <p className="mt-5 max-w-md text-sm md:text-base leading-relaxed text-[#e8e3da]/70">An AI powered toolkit for creators to analyze profiles, find brand opportunities, and turn ideas into content.</p>
            <a href="https://creatorcopilotai.vercel.app/" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full border border-[#D3FD50] px-5 py-3 text-xs tracking-wide text-[#D3FD50] transition-colors hover:bg-[#D3FD50] hover:text-black">View project <span className="ml-2">→</span></a>
            <div className="mt-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/45">Tech stack</p>
              <div className="flex flex-wrap gap-2">{['Next.js', 'React', 'Tailwind', 'Gemini AI'].map((tech) => <span key={tech} className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/75">{tech}</span>)}</div>
            </div>
          </div>
          <a href="https://creatorcopilotai.vercel.app/" target="_blank" rel="noreferrer" aria-label="Open Creator Copilot AI" className="group relative block overflow-hidden rounded-2xl border border-white/35 bg-[#0d0b18] p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <img src={creatorPreview} alt="Creator Copilot AI landing page preview" className="aspect-video w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
            <span className="absolute bottom-5 right-5 rounded-full bg-[#D3FD50] px-4 py-2 text-xs text-black">Explore ↗</span>
          </a>
        </div>

        <div className="mx-auto mt-16 max-w-[1440px]">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="font-[font2] text-[10px] tracking-[0.22em] text-[#D3FD50] uppercase">More selected work</p>
              <p className="mt-2 font-[font1] text-2xl md:text-3xl">A few more things I’ve built.</p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button type="button" onClick={() => scrollProjects(-1)} aria-label="Scroll projects left" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">←</button>
              <button type="button" onClick={() => scrollProjects(1)} aria-label="Scroll projects right" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">→</button>
            </div>
          </div>
          <div ref={projectsRailRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin] [scrollbar-color:#D3FD50_#171717]">
            <a href="https://splitvilla.vercel.app/#landing" target="_blank" rel="noreferrer" className="group min-w-[82%] snap-start sm:min-w-[58%] lg:min-w-[42%]">
              <div className="relative aspect-[1.65/1] overflow-hidden rounded-xl border border-white/20 bg-[#10100e]">
                <img src={splitvillaPreview} alt="Splitvilla group expense splitter preview" className="h-full w-full -translate-y-[14%] scale-[1.16] object-cover object-top transition duration-700 group-hover:scale-[1.2]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />
                <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] tracking-wider text-white/80">01 / 02</span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3"><div><p className="text-[10px] tracking-[0.18em] text-[#D3FD50] uppercase">HTML · CSS · JavaScript</p><h3 className="mt-2 font-[font1] text-3xl md:text-4xl">Splitvilla</h3></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors group-hover:border-[#D3FD50] group-hover:bg-[#D3FD50] group-hover:text-black">↗</span></div>
              </div>
            </a>
            <a href="https://club-website-zoue.vercel.app/" target="_blank" rel="noreferrer" className="group min-w-[82%] snap-start sm:min-w-[58%] lg:min-w-[42%]">
              <div className="relative aspect-[1.65/1] overflow-hidden rounded-xl border border-white/20 bg-[#111]">
                <img src={clubPreview} alt="Abhyudaya Club website preview" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] tracking-wider text-white/80">02 / 02</span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3"><div><p className="text-[10px] tracking-[0.18em] text-[#D3FD50] uppercase">React · Node.js · MongoDB</p><h3 className="mt-2 font-[font1] text-3xl md:text-4xl">Abhyudaya Club</h3></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors group-hover:border-[#D3FD50] group-hover:bg-[#D3FD50] group-hover:text-black">↗</span></div>
              </div>
            </a>
          </div>
          <p className="mt-1 text-[10px] tracking-[0.15em] text-white/40 uppercase sm:hidden">Swipe to explore →</p>
        </div>
      </section>

      {/* ══ §3 ABOUT ═════════════════════════════════════════════ */}
      <section id="about" className="h-about w-full border-b border-white/10 px-7 py-14 md:px-14 md:py-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-[0.85fr_1.15fr_0.78fr] md:gap-12">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="h-[340px] overflow-hidden rounded-xl border border-white/20 md:h-[390px]">
              <img src={aboutProfile} alt="Suryansh Yadav outdoors" className="h-portrait h-full w-full object-cover object-center grayscale transition duration-700 hover:grayscale-0" />
            </div>
            <p className="absolute -bottom-5 -left-3 max-w-[190px] -rotate-6 font-[font1] text-2xl italic leading-tight text-white">Turning ideas<br />into reality<span className="mt-2 block w-16 border-t border-[#D3FD50]" /></p>
          </div>
          <div>
            <p className="mb-4 font-[font2] text-[10px] tracking-[0.22em] text-[#D3FD50] uppercase">About me <span className="ml-2 inline-block w-8 border-t border-[#D3FD50]/70 align-middle" /></p>
            <h2 className="font-[font1] text-4xl leading-[1.08] md:text-5xl">I’m Suryansh Yadav,<br />a CSE (AI/ML) student<br />and developer.</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#e8e3da]/70">I’m passionate about building modern web applications, solving problems with code, and exploring new technologies. Currently pursuing B.Tech in CSE (AI/ML) at GL Bajaj Institute of Technology and Management.</p>
            <Link to="/agence" className="mt-6 inline-flex rounded-full border border-[#D3FD50] px-5 py-3 text-xs text-[#D3FD50] transition-colors hover:bg-[#D3FD50] hover:text-black">More about me <span className="ml-2">→</span></Link>
          </div>
          <div className="grid gap-6 border-t border-white/15 pt-6 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <div className="flex gap-4"><span className="text-2xl text-[#D3FD50]">⌂</span><p className="text-xs leading-relaxed text-white/75">B.Tech CSE (AI/ML)<br />GL Bajaj Institute of Technology &amp; Management</p></div>
            <div className="flex gap-4"><span className="text-2xl text-[#D3FD50]">▦</span><p className="text-xs leading-relaxed text-white/75">Expected graduation<br />May 2028</p></div>
            <div className="flex gap-4"><span className="text-2xl text-[#D3FD50]">‹/›</span><p className="text-xs leading-relaxed text-white/75">Interests<br />Web development · DSA · AI/ML<br />Travel · Mountains</p></div>
          </div>
        </div>
      </section>

      {/* ══ §4 CONTACT + FOOTER ══════════════════════════════════ */}
      <footer id="contact" className="relative overflow-hidden px-7 md:px-14">
        <div className="absolute inset-0"><video className="h-full w-full object-cover opacity-15" src={homeVideo} autoPlay loop muted playsInline /><div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/70" /></div>
        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-8 py-14 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
            <div><p className="mb-4 flex items-center gap-3 font-[font2] text-[10px] tracking-[0.2em] text-white/75 uppercase"><span className="h-2 w-2 rounded-full bg-[#D3FD50]" />Let’s connect</p><h2 className="font-[font1] text-5xl leading-[0.98] md:text-7xl">Let’s Build<br />Something <span className="text-[#D3FD50]">Great Together.</span></h2></div>
            <div className="border-l border-white/20 pl-6 md:pl-8"><p className="max-w-md text-sm leading-relaxed text-white/70">I’m always open to discussing new opportunities, collaborations, or just a good tech conversation.</p><div className="mt-6 flex flex-wrap gap-3"><a href="mailto:suryanshyadav117@gmail.com" className="rounded-full bg-[#D3FD50] px-6 py-3 text-xs font-medium text-black transition-transform hover:translate-y-[-2px]">Get in touch →</a><Link to="/projects" className="rounded-full border border-white/50 px-6 py-3 text-xs text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">Explore projects ↗</Link></div></div>
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-white/20 py-6 text-xs text-white/60 sm:flex-row sm:items-center"><span className="font-[font1] text-xl text-white">Suryansh <span className="text-[#D3FD50]">Yadav.</span></span><span>© {new Date().getFullYear()} Suryansh Yadav. All rights reserved.</span><div className="flex gap-5 text-sm"><a href="https://github.com/Suryansh2803" aria-label="GitHub" className="hover:text-[#D3FD50]">GitHub ↗</a><a href="https://www.linkedin.com/" aria-label="LinkedIn" className="hover:text-[#D3FD50]">LinkedIn ↗</a><a href="mailto:suryanshyadav117@gmail.com" aria-label="Email" className="hover:text-[#D3FD50]">Email ↗</a></div></div>
        </div>
      </footer>

    </main>
  )
}
