import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'Work',     path: '/projects' },
  { label: 'About',    path: '/agence' },
  { label: 'Contact',  path: 'mailto:suryanshyadav117@gmail.com' },
]

const FullScreenNav = ({ menuOpen, setMenuOpen }) => {
  const navRef     = useRef(null)
  const contentRef = useRef(null)
  const isInitialMount = useRef(true)

  useGSAP(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (!menuOpen) return
    }

    const tl = gsap.timeline()
    if (menuOpen) {
      tl.to(navRef.current, { display: 'block', duration: 0 })
      tl.fromTo('.nav-stair',
        { height: 0, y: '0%' },
        { height: '100dvh', stagger: { amount: -0.3 }, ease: 'power4.inOut', duration: 0.7 }
      )
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
      tl.from('.fsn-link', {
        y: 40, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out'
      }, '-=0.3')
    } else {
      tl.to(contentRef.current, { opacity: 0, y: -10, duration: 0.3 })
      tl.to('.nav-stair',
        { y: '100%', stagger: { amount: -0.3 }, ease: 'power4.inOut', duration: 0.7 }
      )
      tl.to(navRef.current, { display: 'none', duration: 0 })
      tl.set('.nav-stair', { y: '0%', height: 0 })
    }
  }, { dependencies: [menuOpen], scope: navRef })

  return (
    <div ref={navRef} className="fixed inset-0 z-50 overflow-hidden text-[#e8e3da] hidden h-[100dvh]">
      {/* stair columns */}
      <div className="absolute inset-0 flex -z-10 h-full w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="nav-stair h-0 w-1/5 bg-[#080808]" />
        ))}
      </div>

      <div ref={contentRef} className="opacity-0 h-full flex flex-col justify-between px-8 md:px-16 py-8 relative z-10">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <span className="font-[font1] text-sm uppercase tracking-[0.2em] text-[#D3FD50]">Suryansh Yadav</span>
          <button
            onClick={() => setMenuOpen(false)}
            data-cursor
            className="w-10 h-10 flex items-center justify-center relative group"
            aria-label="Close menu"
          >
            <span className="absolute w-px h-8 bg-[#D3FD50] rotate-45 group-hover:rotate-[135deg] transition-transform duration-400" />
            <span className="absolute w-px h-8 bg-[#D3FD50] -rotate-45 group-hover:rotate-45 transition-transform duration-400" />
          </button>
        </div>

        {/* nav links */}
        <div className="flex flex-col gap-2">
          {navLinks.map(({ label, path }) => {
            const isExternal = path.startsWith('mailto')
            const Tag = isExternal ? 'a' : Link
            const props = isExternal ? { href: path } : { to: path }
            return (
              <div key={label} className="overflow-hidden">
                <Tag
                  {...props}
                  onClick={() => setMenuOpen(false)}
                  data-cursor
                  className="fsn-link block font-[font1] text-[12vw] uppercase leading-[1.1] tracking-tighter text-[#e8e3da] hover:text-[#D3FD50] transition-colors duration-300 pb-2 pt-2"
                >
                  {label}
                </Tag>
              </div>
            )
          })}
        </div>

        {/* bottom row */}
        <div className="flex items-end justify-between font-[font2] text-xs text-[#3a3a3a] uppercase tracking-widest">
          <span>New Delhi, India · GMT +5:30</span>
          <div className="flex gap-6">
            {['LINKEDIN', 'GITHUB', 'DRIBBBLE'].map((s) => (
              <a key={s} href="#" className="hover:text-[#D3FD50] transition-colors duration-300">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullScreenNav