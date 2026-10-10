import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import clubPreview from '../assets/club-preview.png'
import creatorPreview from '../assets/creator-landing-preview.png'
import aboutHero from '../assets/about-coding-hero.png'
import splitvillaPreview from '../assets/splitvilla-preview.png'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'Splitvilla',
    sub: 'Group expense splitter · 2026',
    categories: ['Web Development', 'Frontend', 'Tools'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
    link: 'https://splitvilla.vercel.app/#landing',
    preview: splitvillaPreview,
    desc: 'A simple group expense splitter for planning trips, tracking shared costs, and settling balances without awkward math.',
    featured: true,
  },
  {
    num: '02',
    title: 'Abhyudaya Club',
    sub: 'College club platform · GL Bajaj',
    categories: ['Web Development', 'Frontend', 'College'],
    tags: ['React', 'Node.js', 'MongoDB'],
    link: 'https://club-website-zoue.vercel.app/',
    preview: clubPreview,
    desc: 'The official platform for the CSE-AIML club, with event information, a gallery, and a home for the student community.',
  },
  {
    num: '03',
    title: 'Creator Copilot AI',
    sub: 'AI creator toolkit · 2026',
    categories: ['Web Development', 'Frontend', 'AI / ML'],
    tags: ['Next.js', 'Tailwind CSS', 'Gemini AI'],
    link: 'https://creatorcopilotai.vercel.app/',
    preview: creatorPreview,
    desc: 'An AI copilot for creators to analyze profiles, generate content ideas, find brand opportunities, and verify authenticity.',
  },
]

const filters = ['All Projects', 'Web Development', 'AI / ML', 'Frontend', 'Tools', 'College']

export default function Projects() {
  const pageRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [query, setQuery] = useState('')

  const visibleProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === 'All Projects' || project.categories.includes(activeFilter)
    const searchText = `${project.title} ${project.sub} ${project.desc} ${project.tags.join(' ')}`.toLowerCase()
    return matchesFilter && searchText.includes(query.trim().toLowerCase())
  })

  useGSAP(() => {
    gsap.from('.pj-intro', { y: 26, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.15 })
    gsap.from('.pj-card', {
      y: 36,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.pj-grid', start: 'top 90%', once: true },
    })
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="min-h-screen overflow-hidden bg-[#080908] text-[#e8e3da]">
      <section className="relative overflow-hidden px-6 pb-7 pt-28 sm:px-10 lg:px-[7%] lg:pt-28">
        <div className="absolute inset-y-0 right-0 hidden w-[48%] opacity-45 md:block">
          <img src={aboutHero} alt="" className="h-full w-full object-cover object-[78%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080908] via-[#080908]/65 to-[#080908]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-transparent to-[#080908]/30" />
        </div>

        <div className="relative z-10 grid items-center gap-7 border-b border-white/15 pb-7 lg:grid-cols-[1.2fr_0.9fr_0.25fr] lg:gap-10">
          <div>
            <p className="pj-intro mb-3 flex items-center gap-3 text-[11px] tracking-[0.24em] text-white/70 uppercase"><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50]" />My work</p>
            <h1 className="pj-intro font-[font1] text-[clamp(3.5rem,6vw,5.8rem)] leading-[0.83] tracking-[-0.045em] text-[#f4f0e8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Projects that<br />Turn Ideas into<br /><span className="text-[#D3FD50]">Reality.</span>
            </h1>
          </div>
          <div className="pj-intro max-w-[390px] lg:pt-8">
            <p className="text-sm leading-[1.65] text-white/65 sm:text-base">Here are some of the projects I’ve built, each solving a real problem and helping me learn new technologies. These projects showcase my skills in web development, problem solving, and building user-focused products.</p>
            <a href="https://github.com/Suryansh2803" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/45 px-5 py-2.5 text-xs text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]"><span className="text-base">◉</span> View GitHub <span>↗</span></a>
          </div>
          <p className="pj-intro hidden -rotate-6 font-[font1] text-xl italic leading-tight text-[#D3FD50] lg:block">Build<br />Learn<br />Solve<br />Repeat<span className="mt-2 block w-14 border-t border-[#D3FD50]" /></p>
        </div>

        <div className="relative z-10 flex flex-col gap-4 border-b border-white/15 py-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {filters.map((filter) => (
              <button key={filter} type="button" onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`shrink-0 rounded-full border px-4 py-2 text-xs transition-colors ${activeFilter === filter ? 'border-[#D3FD50] bg-[#D3FD50] text-black' : 'border-white/20 text-white/70 hover:border-[#D3FD50] hover:text-[#D3FD50]'}`}>
                {filter}
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-white/50 xl:max-w-[280px]">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search projects…" className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/40" aria-label="Search projects" />
          </label>
        </div>

        <div className="pj-grid relative z-10 grid gap-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <article key={project.num} className="pj-card group flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] transition-colors duration-300 hover:border-[#D3FD50]/40">
              <div className="relative aspect-[1.58/1] overflow-hidden border-b border-white/10 bg-[#10100f]">
                <img src={project.preview} alt={`${project.title} preview`} className={`h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.22] ${project.num === '01' ? '-translate-y-[16%] scale-[1.18]' : ''}`} />
                <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] text-white/70">{project.num}</span>
                {project.featured && <span className="absolute left-3 top-3 rounded-full border border-[#D3FD50]/70 bg-black/70 px-3 py-1 text-[10px] text-[#D3FD50]">★ &nbsp; Featured</span>}
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[10px] tracking-[0.16em] text-[#D3FD50] uppercase">{project.sub}</p>
                <h2 className="mt-2 font-[font1] text-3xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{project.title}</h2>
                <p className="mt-1 min-h-[60px] text-sm leading-relaxed text-white/60">{project.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/65">{tag}</span>)}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#D3FD50] px-4 py-2.5 text-xs font-medium text-black transition-transform hover:-translate-y-0.5">Live Demo <span>↗</span></a>
                  {project.code && <a href={project.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">◉ &nbsp; View Code</a>}
                </div>
              </div>
            </article>
          ))}

          {activeFilter === 'All Projects' && !query && (
            <a href="https://github.com/Suryansh2803" target="_blank" rel="noreferrer" className="pj-card group flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/20 px-6 text-center transition-colors hover:border-[#D3FD50]/60">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#D3FD50]/40 text-2xl text-[#D3FD50] transition-colors group-hover:bg-[#D3FD50] group-hover:text-black">＋</span>
              <h2 className="mt-4 text-sm text-[#D3FD50]">More Projects</h2>
              <p className="mt-2 max-w-[250px] text-xs leading-relaxed text-white/50">Exploring new ideas and building exciting projects. Check out my GitHub for more.</p>
            </a>
          )}

          {visibleProjects.length === 0 && <p className="col-span-full py-16 text-center text-sm text-white/50">No projects match that search. Try another keyword or filter.</p>}
        </div>
      </section>

      <footer className="mt-8 flex flex-col gap-3 border-t border-white/10 px-7 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-[7%]">
        <span className="font-[font1] text-lg text-white">Suryansh <span className="text-[#D3FD50]">Yadav.</span></span>
        <span>© {new Date().getFullYear()} Suryansh Yadav. All rights reserved.</span>
        <Link to="/agence" className="transition-colors hover:text-[#D3FD50]">More about me ↗</Link>
      </footer>
    </main>
  )
}
