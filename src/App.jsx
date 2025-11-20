import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ResetPassword from './Pages/ResetPassword'
import Navbar from './components/Navbar'
import Blog from './Pages/Blog'
import ContactForm from './Pages/ContactForm'
import TimeTable from './Pages/TimeTable'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const applyGradientToBody = (color1, color2) => {
    document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundSize = 'cover'
  }

  const resetBodyBackground = () => {
    document.body.style.background = ''
    document.body.style.backgroundAttachment = ''
    document.body.style.backgroundSize = ''
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      try {
        setUser(JSON.parse(loggedUser))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('loggedUser')
      }
    }

    applyGradientToBody('#051937', '#008793')

    const handleStorageChange = (e) => {
      if (e.key === 'logoutEvent' || (e.key === 'loggedUser' && !e.newValue)) {
        setUser(null)
      }
      if (e.key === 'loggedUser' && e.newValue) {
        try {
          setUser(JSON.parse(e.newValue))
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      resetBodyBackground()
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    localStorage.removeItem('authToken')
    setUser(null)
    try {
      localStorage.setItem('logoutEvent', Date.now().toString())
      localStorage.removeItem('logoutEvent')
    } catch (err) {
      // ignore
    }
  }

  return (
    <Router>
      <div className="App min-h-screen">
        <Navbar user={user} setUser={setUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" replace /> : <Register />} 
          />
          <Route 
            path="/reset-password" 
            element={user ? <Navigate to="/" replace /> : <ResetPassword />} 
          />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App