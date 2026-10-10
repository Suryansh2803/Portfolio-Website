import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import aboutHero from '../assets/about-coding-hero.png'

gsap.registerPlugin(ScrollTrigger)

const journey = [
  { year: '2028', title: 'B.Tech CSE (AI/ML) · Expected', detail: 'GL Bajaj Institute of Technology and Management' },
  { year: '2023 – Present', title: 'B.Tech · Third Year', detail: 'Currently focused on AI/ML, web development, and problem solving.' },
  { year: '2023', title: 'Class XII', detail: '92.4%' },
  { year: '2021', title: 'Class X', detail: '87.6%' },
]

const motivations = [
  { icon: '◎', title: 'Problem Solving', detail: 'I enjoy breaking down complex problems and finding simple, efficient solutions.' },
  { icon: '⌘', title: 'Web Development', detail: 'I love building interactive and user-friendly applications that solve real problems.' },
  { icon: '◉', title: 'AI / ML', detail: 'Curious about machine learning and the useful things it can make possible.' },
  { icon: '↗', title: 'Continuous Growth', detail: 'Always learning new technologies and looking for ways to improve my skills.' },
]

const techGroups = [
  { title: 'Languages', items: [['C++', 'C++', '#55a9ff'], ['C', 'C', '#55a9ff'], ['Java', '♨', '#ff8c36'], ['JavaScript', 'JS', '#f5d328']] },
  { title: 'Frontend', items: [['HTML', '5', '#ff6737'], ['CSS', '3', '#3889ff'], ['React', '⚛', '#55d8f4'], ['Tailwind CSS', '≈', '#49d9df']] },
  { title: 'Backend', items: [['Node.js', '⬡', '#a7e63b'], ['MongoDB', '◖', '#54d897']] },
  { title: 'Tools & Platforms', items: [['Git', '◆', '#ff633e'], ['GitHub', '◉', '#f4f4f4'], ['VS Code', '⌁', '#48a9ff'], ['Linux', '♟', '#eee']] },
]

function Stat({ icon, value, label, detail }) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-5 last:border-0 sm:border-b-0 sm:border-r sm:px-5 sm:py-2 sm:last:border-0">
      <span aria-hidden="true" className="min-w-10 text-center text-3xl leading-none text-[#D3FD50]">{icon}</span>
      <div>
        <p className="text-2xl font-medium leading-tight text-[#f1eee8]">{value}</p>
        <p className="mt-1 text-xs text-white/55">{label}</p>
        {detail && <p className="mt-1 max-w-52 text-[11px] leading-relaxed text-white/40">{detail}</p>}
      </div>
    </div>
  )
}

export default function Agence() {
  const pageRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(() => {
    gsap.from('.ab-reveal', {
      y: 28,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.15,
    })
    gsap.to(imageRef.current, {
      y: -24,
      ease: 'none',
      scrollTrigger: { trigger: '.ab-hero', start: 'top top', end: 'bottom top', scrub: 1.4 },
    })
    gsap.from('.ab-card', {
      y: 20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.ab-content', start: 'top 82%' },
    })
    gsap.from('.ab-tech', {
      y: 16,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.ab-tech-wrap', start: 'top 88%' },
    })
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="min-h-screen overflow-hidden bg-[#080908] text-[#e8e3da]">
      <section className="ab-hero relative overflow-hidden px-6 pb-9 pt-28 sm:px-10 lg:min-h-[620px] lg:px-[7%] lg:pb-8 lg:pt-28">
        <div className="absolute inset-0 opacity-70 lg:left-[37%]">
          <div ref={imageRef} className="absolute inset-0 -top-8 h-[calc(100%+4rem)]">
            <img src={aboutHero} alt="A developer working at a desk at night" className="h-full w-full object-cover object-[62%_center]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#080908] via-[#080908]/75 to-[#080908]/10 lg:from-[#080908] lg:via-[#080908]/35 lg:to-[#080908]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-transparent to-[#080908]/25" />
        </div>

        <div className="relative z-10 grid min-h-[490px] items-center gap-8 lg:min-h-[490px] lg:grid-cols-[0.9fr_1.2fr_100px]">
          <div className="max-w-[570px]">
            <p className="ab-reveal mb-3 flex items-center gap-3 text-[11px] tracking-[0.24em] text-white/70 uppercase"><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50]" />About me</p>
            <h1 className="ab-reveal font-[font1] text-[clamp(4rem,7vw,6.6rem)] leading-[0.83] tracking-[-0.045em] text-[#f4f0e8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              More Than<br /><span className="text-[#D3FD50]">Just</span> Code.
            </h1>
            <p className="ab-reveal mt-6 max-w-[470px] text-sm leading-[1.65] text-white/75 sm:text-base">
              I’m Suryansh Yadav, a CSE (AI/ML) student at GL Bajaj Institute of Technology and Management. I enjoy building web applications, exploring AI/ML, and solving challenging problems through code.
            </p>
            <div className="ab-reveal mt-5 flex flex-wrap gap-3">
              <a href="mailto:suryanshyadav117@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-[#D3FD50] px-5 py-3 text-xs font-medium text-black transition-transform hover:-translate-y-0.5">✉ &nbsp; Get in Touch <span>↗</span></a>
              <a href="/resume.pdf" download="Suryansh-Yadav-Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-xs text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">↓ &nbsp; Download Resume</a>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-xs text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">Explore Projects <span>↗</span></Link>
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
          <aside className="ab-reveal hidden max-w-[105px] self-center border-l border-[#D3FD50]/60 pl-4 lg:block">
            <span className="font-serif text-4xl leading-none text-[#D3FD50]">“</span>
            <p className="text-xs leading-[1.65] text-white/65">I enjoy turning ideas into real products and constantly learning new technologies.</p>
            <span className="mt-4 block w-10 border-t border-[#D3FD50]" />
          </aside>
          <p className="absolute bottom-7 right-7 hidden -rotate-6 font-[font1] text-2xl italic leading-tight text-white lg:block">Build<br />Learn<br />Solve<br />Repeat<span className="mt-2 block w-16 border-t border-[#D3FD50]" /></p>
        </div>

        <div className="relative z-10 grid rounded-2xl border border-white/15 bg-black/45 px-4 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:px-4">
          <Stat icon="‹/›" value="300+" label="LeetCode Problems" />
          <Stat icon="⬡" value="4+" label="Projects Built" />
          <Stat icon="△" value="3rd Year" label="B.Tech CSE (AI/ML)" detail="GL Bajaj Institute of Technology and Management" />
          <Stat icon="▢" value="2028" label="Expected Graduation" />
        </div>
      </section>

      <section className="ab-content grid gap-4 px-6 pb-6 sm:px-10 lg:grid-cols-2 lg:px-[4.5%]">
        <div className="ab-card rounded-2xl border border-white/10 bg-white/[0.018] p-5 sm:p-7">
          <h2 className="mb-5 flex items-center gap-3 text-xs tracking-[0.2em] uppercase"><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50]" />My Journey</h2>
          <div className="relative space-y-0 before:absolute before:bottom-5 before:left-[112px] before:top-4 before:w-px before:bg-white/30 sm:before:left-[136px]">
            {journey.map((item, index) => (
              <div key={item.year + item.title} className="relative grid min-h-[68px] grid-cols-[88px_1fr] gap-8 py-2 sm:grid-cols-[112px_1fr] sm:gap-12">
                <span className="pt-1 text-right text-xs text-white/65">{item.year}</span>
                <span className={`absolute left-[107px] top-[13px] z-10 h-3 w-3 rounded-full border-2 border-[#080908] sm:left-[131px] ${index === 0 ? 'bg-[#D3FD50]' : 'bg-[#e8e3da]'}`} />
                <div><h3 className="text-sm font-medium text-white/90">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-white/50">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="ab-card rounded-2xl border border-white/10 bg-white/[0.018] p-5 sm:p-7">
          <h2 className="mb-5 flex items-center gap-3 text-xs tracking-[0.2em] uppercase"><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50]" />What Drives Me</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {motivations.map((item) => (
              <article key={item.title} className="flex gap-4 rounded-xl border border-white/[0.08] bg-black/20 p-4 transition-colors hover:border-[#D3FD50]/30">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#D3FD50]/30 bg-[#D3FD50]/[0.06] text-xl text-[#D3FD50]">{item.icon}</span>
                <div><h3 className="text-sm font-medium text-white/90">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-white/55">{item.detail}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-tech-wrap px-6 pb-10 sm:px-10 lg:px-[4.5%]">
        <h2 className="mb-2 flex items-center gap-3 px-2 text-xs tracking-[0.2em] text-white/80 uppercase"><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50]" />Technologies I Work With</h2>
        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.018] sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.72fr_1fr]">
          {techGroups.map((group) => (
            <div key={group.title} className="ab-tech border-b border-white/10 p-5 last:border-0 sm:border-r sm:last:border-0 lg:border-b-0">
              <h3 className="mb-3 text-sm text-white/70">{group.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-3">
                {group.items.map(([name, icon, color]) => (
                  <div key={name} className="flex items-center gap-2 text-xs text-white/75"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] text-lg font-semibold" style={{ color }}>{icon}</span>{name}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-white/10 px-7 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-[4.5%]">
        <span className="font-[font1] text-lg text-white">Suryansh <span className="text-[#D3FD50]">Yadav.</span></span>
        <span>© {new Date().getFullYear()} Suryansh Yadav. All rights reserved.</span>
        <a href="mailto:suryanshyadav117@gmail.com" className="transition-colors hover:text-[#D3FD50]">Let’s connect ↗</a>
      </footer>
    </main>
  )
}
