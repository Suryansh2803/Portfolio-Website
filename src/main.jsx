import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Stairs from './components/common/Stairs.jsx'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import React, { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ── Lenis smooth scroll ──────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
window.__lenis = lenis

// ── Global custom cursor ─────────────────────────────────────────
function Cursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor')
    if (!dot) return
    const move = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'power3.out' })
    }
    const enter = () => dot.classList.add('hovered')
    const leave = () => dot.classList.remove('hovered')
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div id="cursor" />
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Cursor />
    <Stairs>
      <App />
    </Stairs>
  </BrowserRouter>
)
