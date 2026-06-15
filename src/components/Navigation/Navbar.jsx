import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = ({ setMenuOpen }) => {
  const location   = useLocation()
  const navRef     = useRef(null)
  const nameRef    = useRef(null)

  // Subtle reveal on mount
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, { scope: navRef })

  // Hover shimmer on name letters
  const handleNameEnter = () => {
    if (!nameRef.current) return
    const letters = nameRef.current.querySelectorAll('.nl')
    gsap.to(letters, {
      y: -4,
      color: '#D3FD50',
      stagger: 0.03,
      duration: 0.25,
      ease: 'power2.out',
    })
  }
  const handleNameLeave = () => {
    if (!nameRef.current) return
    const letters = nameRef.current.querySelectorAll('.nl')
    gsap.to(letters, {
      y: 0,
      color: '#e8e3da',
      stagger: 0.02,
      duration: 0.25,
      ease: 'power2.in',
    })
  }

  const name = 'Suryansh Yadav'

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-7 md:px-14 py-6 md:py-7"
      style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.9) 0%, transparent 100%)' }}
    >
      {/* ── Logo / Name ───────────────────────────── */}
      <Link
        to="/"
        ref={nameRef}
        onMouseEnter={handleNameEnter}
        onMouseLeave={handleNameLeave}
        className="flex items-baseline gap-0 leading-none"
        aria-label="Home"
      >
        {/* Italic decorative first letter */}
        <span
          className="nl text-[#e8e3da] transition-colors duration-200"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(22px, 2.4vw, 38px)',
            fontStyle: 'italic',
            fontWeight: 300,
            letterSpacing: '0.01em',
          }}
        >
          {name[0]}
        </span>
        {/* Rest of first name */}
        {name.slice(1, 8).split('').map((ch, i) => (
          <span
            key={i}
            className="nl text-[#e8e3da] transition-colors duration-200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(20px, 2.1vw, 34px)',
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            {ch}
          </span>
        ))}

        {/* Space */}
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(20px, 2.1vw, 34px)',
          }}
        >
          &nbsp;
        </span>

        {/* Last name — slightly bolder, upright */}
        {name.slice(9).split('').map((ch, i) => (
          <span
            key={i}
            className="nl text-[#e8e3da] transition-colors duration-200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(20px, 2.1vw, 34px)',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            {ch}
          </span>
        ))}
      </Link>

      {/* ── Right side ────────────────────────────── */}
      <div className="flex items-center gap-8 md:gap-10">
        <Link
          to="/projects"
          className={`font-[font2] text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 hidden md:block ${
            location.pathname === '/projects' ? 'text-[#D3FD50]' : 'text-[#e8e3da]/60 hover:text-[#D3FD50]'
          }`}
        >
          Work
        </Link>
        <Link
          to="/agence"
          className={`font-[font2] text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 hidden md:block ${
            location.pathname === '/agence' ? 'text-[#D3FD50]' : 'text-[#e8e3da]/60 hover:text-[#D3FD50]'
          }`}
        >
          About
        </Link>

        {/* dot separator */}
        <span className="w-1 h-1 rounded-full bg-white/15 hidden md:block" />

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          data-cursor
          className="flex flex-col items-end gap-[5px] group py-1"
          aria-label="Open menu"
        >
          <span className="block h-px w-7 bg-[#e8e3da]/70 group-hover:bg-[#D3FD50] group-hover:w-8 transition-all duration-300 ease-out" />
          <span className="block h-px w-5 bg-[#e8e3da]/70 group-hover:bg-[#D3FD50] group-hover:w-8 transition-all duration-300 ease-out delay-[40ms]" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar