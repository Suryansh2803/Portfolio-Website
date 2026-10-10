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
      className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-10 lg:px-14 py-4 md:py-5"
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

      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 sm:flex md:gap-4 xl:gap-9">
        {[
          { to: '/', label: 'Home' },
          { to: '/agence', label: 'About' },
          { to: '/projects', label: 'Projects' },
          { to: '/skills', label: 'Skills & Coding' },
          { to: '/contact', label: 'Contact' },
        ].map(({ to, label }) => (
          <Link key={to} to={to} className={`relative whitespace-nowrap py-2 font-[font2] text-[9px] transition-colors duration-300 md:text-[10px] xl:text-xs ${location.pathname === to ? 'text-[#D3FD50]' : 'text-[#e8e3da]/70 hover:text-[#D3FD50]'}`}>
            {label}
            {location.pathname === to && <span className="absolute -bottom-1 left-1/2 h-px w-8 -translate-x-1/2 bg-[#D3FD50]"><span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#D3FD50]" /></span>}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 md:gap-7">
        <Link to="/contact" className="hidden whitespace-nowrap rounded-full border border-[#D3FD50] px-2.5 py-1.5 font-[font2] text-[9px] text-white transition-colors hover:bg-[#D3FD50] hover:text-black sm:inline-flex md:px-4 md:py-2 md:text-[10px] xl:px-5 xl:text-xs">Let’s Connect <span className="ml-1.5 text-[#D3FD50]">↗</span></Link>
        <button
          onClick={() => setMenuOpen(true)}
          data-cursor
          className="flex flex-col items-end gap-[5px] group py-1 sm:hidden"
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
