import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Agence from './pages/Agence'
import Contact from './pages/Contact'
import Navbar from './components/Navigation/Navbar'
import FullScreenNav from './components/Navigation/FullScreenNav'

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <FullScreenNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Navbar setMenuOpen={setMenuOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/agence" element={<Agence />} />
      </Routes>
    </div>
  )
}

export default App
