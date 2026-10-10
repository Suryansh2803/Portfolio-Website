import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import codingHero from '../assets/about-coding-hero.png'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  { title: 'Programming Languages', category: 'Languages', icon: '▱', description: 'Languages I use to build projects and solve problems.', skills: [['C++', 'C', '#4a9eff'], ['C', 'C', '#4a9eff'], ['Java', '♨', '#ff8b32'], ['JavaScript', 'JS', '#f0d32c']] },
  { title: 'Frontend Development', category: 'Frontend', icon: '▱', description: 'Building modern and responsive user interfaces.', skills: [['HTML', '5', '#ff653b'], ['CSS', '3', '#388cff'], ['React', '⚛', '#43d7f1'], ['Tailwind CSS', '≈', '#42d4dc']] },
  { title: 'Backend Development', category: 'Backend', icon: '▤', description: 'Working with backend technologies and databases.', skills: [['Node.js', '⬡', '#9bdc37'], ['Express.js', 'ex', '#d9d9d9'], ['MongoDB', '◖', '#48cb8e'], ['Firebase', '▲', '#ffca3a']] },
  { title: 'Developer Tools', category: 'Tools', icon: '♧', description: 'Tools I use for development and collaboration.', skills: [['Git', '◆', '#f05e3c'], ['GitHub', '◉', '#f3f3f3'], ['VS Code', '⌁', '#398fe3'], ['Linux', '♟', '#eee']] },
  { title: 'Core CS Concepts', category: 'CS Fundamentals', icon: '♧', description: 'Fundamental concepts for problem solving.', skills: [['DSA', '⚛', '#43d7f1'], ['OOPs', '▱', '#9bdc37'], ['Operating Systems', '▱', '#43d7f1'], ['DBMS', '▤', '#9bdc37']] },
  { title: 'Other Technologies', category: 'Other', icon: '✦', description: 'Exploring and learning new technologies.', skills: [['Python', 'Py', '#f4ca45'], ['Machine Learning', '♧', '#43d7f1'], ['System Design', '⌘', '#b497ff'], ['Next.js', 'N', '#eee']] },
]

const skillFilters = ['All', 'Languages', 'Frontend', 'Backend', 'Tools', 'CS Fundamentals']

const dsaTopics = [
  ['Arrays', 45, 50], ['Strings', 32, 40], ['Linked List', 28, 35], ['Stack & Queue', 22, 30], ['Binary Search', 25, 30],
  ['Recursion', 18, 30], ['Trees', 35, 45], ['Graphs', 28, 40], ['Dynamic Programming', 20, 35], ['Bit Manipulation', 15, 25],
  ['Greedy', 12, 20], ['Heaps', 18, 30], ['Tries', 8, 15], ['Segment Tree', 6, 15], ['DSU', 8, 15],
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LEETCODE_USERNAME = 'suryansh_2803'

const achievements = [
  { icon: 'N', title: 'NPTEL', subtitle: 'Cloud Computing', result: 'Elite (67/90)', color: '#ed6565' },
  { icon: '🏆', title: 'College Coding Test', subtitle: 'Campus competition', result: 'Top Performer', color: '#f0c62b' },
  { icon: '</>', title: 'Hackathons', subtitle: 'Participated in multiple', result: 'Hackathons', color: '#51cfff' },
  { icon: '⬡', title: 'Projects', subtitle: 'Built and shipped', result: '4+ Projects Built', color: '#a3db31' },
]

function SectionTitle({ eyebrow, title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-3 font-[font1] text-2xl text-[#eeeae2] sm:text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50]" />{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-white/50">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

function SkillTile({ name, icon, color }) {
  return <div className="flex min-h-[74px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/[0.07] bg-black/20 px-2 py-2 text-center"><span className="grid h-8 w-8 place-items-center rounded-md bg-white/[0.035] text-xl font-bold" style={{ color }}>{icon}</span><span className="text-[10px] leading-tight text-white/70">{name}</span></div>
}

function ProgressRing({ value, max, color = '#D3FD50', size = 40 }) {
  const percentage = Math.min(100, Math.round((value / max) * 100))
  return <div className="grid shrink-0 place-items-center rounded-full" style={{ width: size, height: size, background: `conic-gradient(${color} ${percentage}%, rgba(255,255,255,.1) 0)` }}><div className="grid place-items-center rounded-full bg-[#0a0b09] text-[9px] text-white/85" style={{ width: size - 6, height: size - 6 }}>{percentage}</div></div>
}

function PracticeChart({ monthlyPractice }) {
  const chart = useMemo(() => {
    const width = 720
    const height = 210
    const left = 38
    const right = 12
    const top = 14
    const bottom = 30
    const max = Math.max(10, Math.ceil(Math.max(...monthlyPractice) / 10) * 10)
    const points = monthlyPractice.map((value, index) => ({
      x: left + (index * (width - left - right)) / (monthlyPractice.length - 1),
      y: top + ((max - value) * (height - top - bottom)) / max,
    }))
    const line = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
    return { width, height, max, points, line, area: `${line} L ${points.at(-1).x} ${height - bottom} L ${points[0].x} ${height - bottom} Z` }
  }, [monthlyPractice])

  return (
    <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="h-full w-full" role="img" aria-label="Monthly problem solving trend">
      <defs><linearGradient id="practice-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#D3FD50" stopOpacity=".28" /><stop offset="100%" stopColor="#D3FD50" stopOpacity="0" /></linearGradient></defs>
      {Array.from({ length: 6 }, (_, index) => index * chart.max / 5).map((tick) => {
        const y = 14 + ((chart.max - tick) * 166) / chart.max
        return <g key={tick}><line x1="38" x2="708" y1={y} y2={y} stroke="rgba(255,255,255,.08)" strokeDasharray="3 5" /><text x="10" y={y + 3} fill="rgba(255,255,255,.36)" fontSize="9">{tick}</text></g>
      })}
      <path d={chart.area} fill="url(#practice-area)" />
      <path d={chart.line} fill="none" stroke="#D3FD50" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {chart.points.map((point, index) => <g key={months[index]}><circle cx={point.x} cy={point.y} r="3.5" fill="#D3FD50" stroke="#10120b" strokeWidth="2" /><text x={point.x} y="199" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="9">{months[index]}</text></g>)}
    </svg>
  )
}

export default function Skills() {
  const pageRef = React.useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [leetcode, setLeetcode] = useState(null)
  const [profileState, setProfileState] = useState('loading')
  const [lastUpdated, setLastUpdated] = useState(null)
  const refreshLeetCode = useCallback(async () => {
    setProfileState((current) => current === 'ready' ? 'refreshing' : 'loading')
    try {
      const response = await fetch(`/api/leetcode?username=${LEETCODE_USERNAME}`)
      if (!response.ok) throw new Error('Profile data is temporarily unavailable')
      const stats = await response.json()
      setLeetcode(stats)
      setLastUpdated(new Date(stats.updatedAt || Date.now()))
      setProfileState('ready')
    } catch {
      setProfileState((current) => current === 'refreshing' ? 'ready' : 'error')
    }
  }, [])
  useEffect(() => {
    refreshLeetCode()
    const timer = window.setInterval(refreshLeetCode, 5 * 60 * 1000)
    return () => window.clearInterval(timer)
  }, [refreshLeetCode])
  const filteredSkills = activeFilter === 'All' ? skillGroups : skillGroups.filter((group) => group.category === activeFilter)
  const heatmap = useMemo(() => {
    const today = new Date()
    const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
    start.setUTCDate(start.getUTCDate() - 363)
    return Array.from({ length: 364 }, (_, index) => {
      const date = new Date(start)
      date.setUTCDate(start.getUTCDate() + index)
      const count = Number(leetcode?.calendar?.[Math.floor(date.getTime() / 1000)] || 0)
      return count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
    })
  }, [leetcode])
  const monthlyPractice = useMemo(() => months.map((_, month) => {
    if (!leetcode) return 0
    return Object.entries(leetcode.calendar || {}).reduce((total, [timestamp, count]) => {
      const date = new Date(Number(timestamp) * 1000)
      return date.getUTCFullYear() === new Date().getUTCFullYear() && date.getUTCMonth() === month ? total + Number(count) : total
    }, 0)
  }), [leetcode])
  const totalSolved = leetcode?.solved?.all
  const solvedTotal = totalSolved || 0
  const easy = leetcode?.solved?.easy || 0
  const medium = leetcode?.solved?.medium || 0
  const hard = leetcode?.solved?.hard || 0
  const easyPercent = solvedTotal ? (easy / solvedTotal) * 100 : 0
  const mediumPercent = solvedTotal ? (medium / solvedTotal) * 100 : 0
  const hardPercent = solvedTotal ? (hard / solvedTotal) * 100 : 0
  const contest = leetcode?.contest

  useGSAP(() => {
    gsap.from('.sk-hero-item', { y: 22, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out', delay: 0.15 })
    gsap.from('.sk-panel', { y: 22, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.sk-tech-section', start: 'top 88%', once: true } })
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="min-h-screen overflow-hidden bg-[#080908] text-[#e8e3da]">
      <section className="relative overflow-hidden border-b border-white/10 px-6 pb-6 pt-28 sm:px-10 lg:px-[5%] lg:pt-28">
        <div className="absolute inset-y-0 right-0 w-full opacity-60 sm:left-[31%] sm:w-auto">
          <img src={codingHero} alt="A developer coding at a desk" className="h-full w-full object-cover object-[72%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080908] via-[#080908]/65 to-[#080908]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-transparent to-[#080908]/35" />
        </div>
        <div className="relative z-10 grid min-h-[370px] items-center gap-6 md:min-h-[390px] md:grid-cols-[0.95fr_1fr]">
          <div className="max-w-[520px]">
            <p className="sk-hero-item mb-3 flex items-center gap-3 text-[10px] tracking-[0.22em] text-white/70 uppercase"><span className="h-2.5 w-2.5 rounded-full bg-[#D3FD50]" />Skills &amp; Coding</p>
            <h1 className="sk-hero-item font-[font1] text-[clamp(3.4rem,5.7vw,5.2rem)] leading-[0.82] tracking-[-0.045em] text-[#f4f0e8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>My<br />Skills &amp;<br /><span className="whitespace-nowrap text-[#D3FD50]">Coding Journey.</span></h1>
            <p className="sk-hero-item mt-4 max-w-[470px] text-xs leading-relaxed text-white/75 sm:text-sm">A combination of technical skills, consistent problem-solving, and continuous learning helps me build better solutions and become a well-rounded developer.</p>
            <div className="sk-hero-item mt-4 flex flex-wrap gap-2.5">
              <a href="https://leetcode.com/u/suryansh_2803/" target="_blank" rel="noreferrer" className="rounded-full bg-[#D3FD50] px-4 py-2.5 text-[11px] font-medium text-black transition-transform hover:-translate-y-0.5">View My LeetCode ↗</a>
              <a href="#technical-skills" className="rounded-full border border-white/35 px-4 py-2.5 text-[11px] text-white transition-colors hover:border-[#D3FD50] hover:text-[#D3FD50]">Explore Skills ↓</a>
            </div>
          </div>
          <p className="sk-hero-item hidden -rotate-6 justify-self-center self-start pt-12 font-[font1] text-xl italic leading-tight text-white md:block">Keep<br />Learning<br />Keep<br />Building<span className="mt-2 block w-14 border-t border-[#D3FD50]" /></p>
        </div>
        <div className="relative z-10 grid rounded-xl border-y border-white/10 bg-black/35 px-2 backdrop-blur grid-cols-2 sm:grid-cols-4 lg:px-2">
          <div className="flex items-center gap-2 border-b border-white/10 py-3 sm:border-b-0 sm:border-r sm:px-2 lg:px-4"><span className="text-xl text-[#D3FD50]">‹/›</span><p><b className="block text-lg">{profileState === 'loading' ? '…' : profileState === 'error' ? '—' : solvedTotal}</b><span className="text-[9px] text-white/50">LeetCode Problems</span></p></div>
          <div className="flex items-center gap-2 border-b border-white/10 py-3 sm:border-b-0 sm:border-r sm:px-2 lg:px-4"><span className="text-xl text-[#D3FD50]">△</span><p><b className="block text-lg">3rd Year</b><span className="text-[9px] text-white/50">B.Tech CSE (AI/ML)</span></p></div>
          <div className="flex items-center gap-2 border-b border-white/10 py-3 sm:border-b-0 sm:border-r sm:px-2 lg:px-4"><span className="text-xl text-[#D3FD50]">⬡</span><p><b className="block text-lg">4+</b><span className="text-[9px] text-white/50">Projects Built</span></p></div>
          <div className="flex items-center gap-3 py-3 sm:px-4"><span className="text-2xl text-[#D3FD50]">▢</span><p><b className="block text-lg">2028</b><span className="text-[10px] text-white/50">Expected Graduation</span></p></div>
        </div>
      </section>

      <section id="technical-skills" className="sk-tech-section px-6 py-7 sm:px-10 lg:px-[3.7%]">
        <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <SectionTitle title="Technical Skills" subtitle="Technologies I use to build projects and solve problems." />
          <div className="flex gap-1 overflow-x-auto rounded-full border border-white/10 p-1 [scrollbar-width:none]">
            {skillFilters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] transition-colors ${activeFilter === filter ? 'bg-[#D3FD50] text-black' : 'text-white/55 hover:text-white'}`}>{filter}</button>)}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSkills.map((group) => (
            <article key={group.title} className="sk-panel rounded-xl border border-white/10 bg-white/[0.018] p-3.5 transition-colors hover:border-[#D3FD50]/30">
              <div className="mb-3 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border border-[#D3FD50]/30 bg-[#D3FD50]/[0.05] text-lg text-[#D3FD50]">{group.icon}</span><div><h3 className="text-xs font-medium text-white/90">{group.title}</h3><p className="mt-0.5 text-[10px] text-white/45">{group.description}</p></div></div>
              <div className="grid grid-cols-4 gap-2">{group.skills.map(([name, icon, color]) => <SkillTile key={name} name={name} icon={icon} color={color} />)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-5 sm:px-10 lg:px-[3.7%]">
        <SectionTitle title="LeetCode Profile" subtitle={profileState === 'error' ? 'Live profile data could not be loaded. Try refreshing.' : `Live stats${lastUpdated ? ` · updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}.`} action={<div className="flex items-center gap-2"><button type="button" onClick={refreshLeetCode} disabled={profileState === 'loading' || profileState === 'refreshing'} className="rounded-full border border-white/20 px-3 py-2 text-[10px] text-white/70 disabled:opacity-50">{profileState === 'refreshing' ? 'Updating…' : '↻ Refresh'}</button><a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`} target="_blank" rel="noreferrer" className="rounded-full border border-[#D3FD50]/50 px-4 py-2 text-[10px] text-[#D3FD50] transition-colors hover:bg-[#D3FD50] hover:text-black">View Full Profile ↗</a></div>} />
        <div className="grid gap-3 lg:grid-cols-[0.9fr_0.9fr_1.45fr]">
          <article className="sk-panel rounded-xl border border-white/10 bg-white/[0.018] p-4">
            <h3 className="flex items-center gap-2 text-base text-white/85"><span className="text-xl text-[#f3a83b]">◉</span> LeetCode</h3><a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-medium hover:text-[#D3FD50]">{LEETCODE_USERNAME} ↗</a>
            <div className="mt-4 space-y-3 text-[10px] text-white/55"><p><span className="mr-2 text-[#D3FD50]">◉</span><b className="text-white/80">{profileState === 'loading' ? 'Loading…' : profileState === 'error' ? 'Unavailable' : solvedTotal}</b><br /><span className="ml-5">Problems Solved</span></p><p><span className="mr-2 text-[#D3FD50]">▤</span><b className="text-white/80">{leetcode?.totalActiveDays ?? '—'}</b><br /><span className="ml-5">Active Practice Days</span></p><p><span className="mr-2 text-[#D3FD50]">◎</span><b className="text-white/80">Live from LeetCode</b><br /><span className="ml-5">Refreshes every 5 minutes</span></p></div>
          </article>
          <article className="sk-panel flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.018] p-4">
            <div className="grid h-32 w-32 place-items-center rounded-full" style={{ background: `conic-gradient(#b6ef3c 0 ${easyPercent}%, #e7c733 ${easyPercent}% ${easyPercent + mediumPercent}%, #c83232 ${easyPercent + mediumPercent}% ${easyPercent + mediumPercent + hardPercent}%, rgba(255,255,255,.1) ${easyPercent + mediumPercent + hardPercent}% 100%)` }}><div className="grid h-[108px] w-[108px] place-items-center rounded-full bg-[#0b0c0b] text-center"><div><b className="block text-2xl">{profileState === 'loading' ? '…' : profileState === 'error' ? '—' : solvedTotal}</b><span className="text-[10px] text-white/45">Solved</span></div></div></div>
            <div className="mt-4 flex w-full justify-around text-center text-[9px]"><p className="text-emerald-400">● {easy}<br /><span className="text-white/45">Easy</span></p><p className="text-yellow-300">● {medium}<br /><span className="text-white/45">Medium</span></p><p className="text-red-400">● {hard}<br /><span className="text-white/45">Hard</span></p></div>
          </article>
          <article className="sk-panel rounded-xl border border-white/10 bg-white/[0.018] p-4">
            <div className="flex items-center justify-between"><h3 className="text-xs text-white/75">Practice activity</h3><span className="text-[9px] text-white/40">Last 12 months</span></div>
            <div className="mt-3 grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }} aria-label="LeetCode activity heatmap">{heatmap.map((level, index) => <span key={index} className={`aspect-square rounded-[2px] ${['bg-white/[0.06]', 'bg-[#2f4e22]', 'bg-[#4c852a]', 'bg-[#79b92e]', 'bg-[#b4ed3e]'][level]}`} />)}</div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2"><div className="rounded-lg border border-white/[0.07] px-3 py-2 text-[10px]"><span className="text-orange-400">♨</span> Current Streak <b className="ml-1 text-white">{leetcode?.streak ?? '—'} days</b></div><div className="rounded-lg border border-white/[0.07] px-3 py-2 text-[10px]"><span className="text-yellow-300">◉</span> Active Days <b className="ml-1 text-white">{leetcode?.totalActiveDays ?? '—'}</b></div></div>
          </article>
        </div>
      </section>

      <section className="px-6 py-5 sm:px-10 lg:px-[3.7%]">
        <SectionTitle title="DSA Progress" subtitle="Topics I’ve covered and my current progress." action={<a href="https://github.com/Suryansh2803" target="_blank" rel="noreferrer" className="rounded-full border border-[#D3FD50]/50 px-4 py-2 text-[10px] text-[#D3FD50] transition-colors hover:bg-[#D3FD50] hover:text-black">View DSA Sheet ↗</a>} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {dsaTopics.map(([topic, value, max]) => <article key={topic} className="sk-panel flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.018] p-2.5"><ProgressRing value={value} max={max} size={34} /><p className="min-w-0"><b className="block truncate text-[10px] font-medium text-white/85">{topic}</b><span className="text-[9px] text-white/45">{value}/{max}</span></p></article>)}
        </div>
      </section>

      <section className="px-6 py-5 sm:px-10 lg:px-[3.7%]">
        <SectionTitle title="Problem Solving Journey" subtitle="Recent LeetCode submission activity, updated from your profile." />
        <div className="grid gap-3 lg:grid-cols-[1.6fr_0.8fr]">
          <article className="sk-panel min-h-[220px] rounded-xl border border-white/10 bg-white/[0.018] p-3 sm:p-5"><div className="mb-2 flex justify-between text-[9px] text-white/40"><span>Submissions / month</span><span>{new Date().getFullYear()}</span></div><PracticeChart monthlyPractice={monthlyPractice} /></article>
          <article className="sk-panel rounded-xl border border-white/10 bg-white/[0.018] p-4"><h3 className="flex items-center gap-2 text-xs font-medium"><span className="text-[#D3FD50]">✧</span> Key Takeaways</h3><ul className="mt-3 space-y-2 text-[10px] text-white/60">{['Consistent practice every week', 'Focus on understanding patterns', 'Solve problems of varying difficulty', 'Review key topics regularly', 'Participate in contests'].map((item) => <li key={item} className="flex gap-2"><span className="text-[#D3FD50]">•</span>{item}</li>)}</ul></article>
        </div>
      </section>

      <section className="px-6 py-5 sm:px-10 lg:px-[3.7%]">
        <SectionTitle title="Coding Contests" subtitle="Live contest data from your LeetCode profile." action={<a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/contest/`} target="_blank" rel="noreferrer" className="rounded-full border border-[#D3FD50]/50 px-4 py-2 text-[10px] text-[#D3FD50] transition-colors hover:bg-[#D3FD50] hover:text-black">View Contests ↗</a>} />
        <div className="grid gap-3 md:grid-cols-3">
          {contest ? <article className="sk-panel rounded-xl border border-white/10 bg-white/[0.018] p-4"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-lg bg-white/[0.04] text-2xl text-[#ffc34d]">◉</span><div><p className="text-xs text-white/65">LeetCode</p><p className="text-lg font-semibold">{contest.rating.toLocaleString()}</p><p className="text-[9px] text-white/40">Contest Rating</p></div></div><div className="mt-4 grid grid-cols-2 border-t border-white/[0.08] pt-3 text-[9px] text-white/45"><p>Contests<b className="mt-1 block text-sm text-white/80">{contest.attended}</b></p><p>Global rank<b className="mt-1 block text-sm text-white/80">{contest.globalRanking.toLocaleString()}</b></p></div></article> : <article className="sk-panel rounded-xl border border-white/10 bg-white/[0.018] p-4 text-xs text-white/55">{profileState === 'loading' ? 'Loading live contest profile…' : 'LeetCode contest rating is not available for this profile yet.'}</article>}
        </div>
      </section>

      <section className="px-6 py-5 sm:px-10 lg:px-[3.7%]">
        <SectionTitle title="Certifications & Achievements" subtitle="A few notable milestones from my learning journey." action={<Link to="/projects" className="rounded-full border border-[#D3FD50]/50 px-4 py-2 text-[10px] text-[#D3FD50] transition-colors hover:bg-[#D3FD50] hover:text-black">View Projects ↗</Link>} />
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {achievements.map((item) => <article key={item.title} className="sk-panel flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.018] p-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-lg" style={{ color: item.color }}>{item.icon}</span><div><h3 className="text-[10px] font-medium text-white/85">{item.title}</h3><p className="text-[9px] text-white/45">{item.subtitle}</p><p className="text-[9px] font-medium" style={{ color: item.color }}>{item.result}</p></div></article>)}
        </div>
      </section>

      <section className="px-6 pb-8 pt-5 sm:px-10 lg:px-[3.7%]">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_90%_10%,rgba(211,253,80,.12),transparent_35%),linear-gradient(120deg,#10120d,#090a09)] px-5 py-7 sm:px-8 sm:py-9">
          <div className="absolute right-7 top-4 hidden -rotate-6 font-[font1] text-xl italic leading-tight text-white/80 sm:block">Same<br />Passion<br />Bigger<br />Goals<span className="mt-2 block w-12 border-t border-[#D3FD50]" /></div>
          <p className="mb-2 flex items-center gap-2 text-[9px] tracking-[0.18em] text-white/60 uppercase"><span className="h-1.5 w-1.5 rounded-full bg-[#D3FD50]" />Let’s grow together</p>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:pr-36"><div><h2 className="font-[font1] text-3xl leading-[0.95] sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Always Learning.<br />Always <span className="text-[#D3FD50]">Building.</span></h2><p className="mt-3 max-w-lg text-xs leading-relaxed text-white/60">I’m constantly exploring new technologies, solving challenging problems, and working on projects to improve my skills.</p></div><a href="mailto:suryanshyadav117@gmail.com" className="shrink-0 self-start rounded-full bg-[#D3FD50] px-5 py-3 text-[10px] font-medium text-black transition-transform hover:-translate-y-0.5 sm:self-auto">Get in Touch ↗</a></div>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-white/10 px-7 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-[4.5%]"><span className="font-[font1] text-lg text-white">Suryansh <span className="text-[#D3FD50]">Yadav.</span></span><span>© {new Date().getFullYear()} Suryansh Yadav. All rights reserved.</span><Link to="/" className="transition-colors hover:text-[#D3FD50]">Back to home ↑</Link></footer>
    </main>
  )
}
