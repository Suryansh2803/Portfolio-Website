import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const EMAIL = 'suryanshyadav117@gmail.com'
const socials = [
  { label: 'Email', detail: EMAIL, href: `mailto:${EMAIL}`, icon: '✉', color: '#D3FD50' },
  { label: 'LinkedIn', detail: 'linkedin.com/in/suryanshyadav2803', href: 'https://www.linkedin.com/in/suryanshyadav2803/', icon: 'in', color: '#D3FD50' },
  { label: 'GitHub', detail: 'github.com/Suryansh2803', href: 'https://github.com/Suryansh2803', icon: '◉', color: '#f2f2f2' },
  { label: 'LeetCode', detail: 'leetcode.com/u/suryansh_2803', href: 'https://leetcode.com/u/suryansh_2803/', icon: '⌁', color: '#ffb83f' },
]

const opportunities = [
  { title: 'Job Opportunities', text: 'Open to SDE and internship opportunities.', icon: '▱' },
  { title: 'Project Collaboration', text: 'Interested in working on exciting projects.', icon: '♧' },
  { title: 'General Enquiries', text: 'Feel free to reach out for any other queries.', icon: '▢' },
]

function Eyebrow({ children }) {
  return <p className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/65 uppercase"><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50] shadow-[0_0_18px_#D3FD50]" />{children}</p>
}

function ContactFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-6 sm:px-10 lg:px-[5.3%]">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div><Link to="/" className="font-[font1] text-2xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Suryansh <span className="text-[#D3FD50]">Yadav.</span></Link><p className="mt-1 text-xs text-white/55">Third Year CSE (AI/ML) Student &amp; Developer</p></div>
        <nav className="flex flex-wrap gap-x-7 gap-y-2 text-xs text-white/65">{[['Home', '/'], ['About', '/agence'], ['Projects', '/projects'], ['Skills & Coding', '/skills'], ['Contact', '/contact']].map(([label, to]) => <Link key={to} to={to} className="transition-colors hover:text-[#D3FD50]">{label}</Link>)}</nav>
        <div className="flex gap-2">{[
          ['◉', 'GitHub', 'https://github.com/Suryansh2803'],
          ['in', 'LinkedIn', 'https://www.linkedin.com/in/suryanshyadav2803/'],
          ['⌁', 'LeetCode', 'https://leetcode.com/u/suryansh_2803/'],
          ['✉', 'Email', `mailto:${EMAIL}`],
        ].map(([icon, label, href]) => <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-base text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">{icon}</a>)}</div>
        <a href="#top" aria-label="Back to top" className="hidden h-12 w-12 place-items-center rounded-full border border-white/20 text-xl text-[#D3FD50] transition-colors hover:bg-[#D3FD50] hover:text-black lg:grid">↑</a>
      </div>
    </footer>
  )
}

export default function Contact() {
  const [message, setMessage] = useState('')
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = `${form.get('subject')} — Portfolio contact from ${form.get('name')}`
    const body = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`
    setNotice('Opening your email app with the message ready to send.')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#080908] pt-24 text-[#e8e3da] sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(ellipse at 4% 58%, rgba(147,185,24,.12), transparent 23%), radial-gradient(ellipse at 93% 31%, rgba(147,185,24,.11), transparent 22%), linear-gradient(rgba(211,253,80,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(211,253,80,.045) 1px, transparent 1px)', backgroundSize: 'auto, auto, 64px 64px, 64px 64px', maskImage: 'linear-gradient(to bottom, black, transparent 80%)' }} />

      <section className="relative grid gap-10 border-b border-white/10 px-6 pb-8 pt-8 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:px-[7%] lg:pb-8 lg:pt-5">
        <div className="pt-1 lg:pt-2">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 font-[font1] text-[clamp(4.2rem,8vw,6.5rem)] leading-[0.8] tracking-[-0.045em] text-[#f4f0e8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Let’s<br /><span className="text-[#D3FD50]">Connect.</span></h1>
          <p className="mt-5 max-w-[490px] text-sm leading-relaxed text-white/70 sm:text-base">I’m always open to discussing opportunities, collaborating on interesting projects, or just having a conversation about technology.</p>

          <div className="mt-6 grid gap-2.5">
            {socials.map((item) => <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} className="group flex min-h-[66px] items-center rounded-xl border border-white/10 bg-black/25 px-4 transition-colors hover:border-[#D3FD50]/45 hover:bg-white/[0.035]">
              <span className="grid h-9 w-12 shrink-0 place-items-center border-r border-white/10 text-xl font-semibold" style={{ color: item.color }}>{item.icon}</span>
              <span className="ml-5 min-w-0"><span className="block text-xs text-white/70">{item.label}</span><span className="mt-0.5 block truncate text-sm text-white/90">{item.detail}</span></span>
              <span className="ml-auto pl-3 text-lg text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D3FD50]">↗</span>
            </a>)}
          </div>
        </div>

        <section className="rounded-2xl border border-white/15 bg-[#0b0c0b]/85 p-5 shadow-[0_24px_100px_rgba(0,0,0,.25)] backdrop-blur sm:p-7 lg:p-8" aria-labelledby="contact-form-title">
          <Eyebrow>Send a message</Eyebrow>
          <h2 id="contact-form-title" className="mt-5 font-[font1] text-4xl text-[#f4f0e8] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Get in Touch</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/65">Fill out the form below and I’ll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs text-white/85">Your Name<input name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Enter your name" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.025] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#D3FD50]/70" /></label>
              <label className="block text-xs text-white/85">Your Email<input name="email" type="email" autoComplete="email" required maxLength={150} placeholder="Enter your email" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.025] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#D3FD50]/70" /></label>
            </div>
            <label className="block text-xs text-white/85">Subject<input name="subject" type="text" required maxLength={120} placeholder="What’s this about?" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.025] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#D3FD50]/70" /></label>
            <label className="block text-xs text-white/85">Message<textarea name="message" value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={500} rows={5} placeholder="Write your message here..." className="mt-2 min-h-[120px] w-full resize-y rounded-xl border border-white/15 bg-white/[0.025] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#D3FD50]/70" /><span className="mt-1 block text-right text-xs text-white/50">{message.length}/500</span></label>
            <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D3FD50] text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">Send Message <span>↗</span></button>
            {notice && <p role="status" className="text-center text-xs text-[#D3FD50]">{notice} If it doesn’t open, email <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
            <p className="text-center text-[10px] text-white/40">Submitting opens your email app with the message filled in.</p>
          </form>
        </section>
      </section>

      <section className="relative px-6 py-6 sm:px-10 lg:px-[6.7%]">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.42fr] lg:gap-10">
          <div><Eyebrow>Other ways to reach me</Eyebrow><div className="mt-4 grid gap-3 md:grid-cols-3">{opportunities.map((item) => <article key={item.title} className="flex min-h-[92px] items-center gap-4 rounded-xl border border-white/10 bg-white/[0.018] p-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#D3FD50]/20 text-2xl text-[#D3FD50]">{item.icon}</span><div><h3 className="text-sm font-medium text-white/90">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-white/60">{item.text}</p></div></article>)}</div></div>
          <aside className="border-l border-white/15 pl-6 lg:pl-10"><Eyebrow>Response time</Eyebrow><div className="mt-4 flex gap-4"><span className="text-3xl text-[#D3FD50]">◷</span><div className="text-sm leading-relaxed text-white/65">I usually respond within <b className="block text-lg text-white">24–48 hours.</b><p className="mt-1">For urgent matters, you can also reach out via email or LinkedIn.</p></div></div></aside>
        </div>
      </section>
      <ContactFooter />
    </main>
  )
}
