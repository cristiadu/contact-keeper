import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'

import Navbar from '../components/layout/Navbar'

import Home from '../components/pages/Home'
import About from '../components/pages/About'

import ContactState from '../context/contacts/ContactState'

const App = () => (
  <ContactState>
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  </ContactState>
)

export default App
