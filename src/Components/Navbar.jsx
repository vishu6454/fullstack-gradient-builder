import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ user, setUser, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-2xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-500 hover:scale-105"
          >
            <div className="bg-linear-to-r from-purple-500 to-pink-500 p-2 rounded-xl transform rotate-0 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl text-white">🎨</span>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-slow">
              linearGen
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Blogs', 'Contact', 'Timetable'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                className="relative text-gray-700 font-semibold group transition-all duration-300 hover:text-purple-600"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4 animate-fade-in">
                <div className="flex items-center space-x-3 bg-linear-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-2xl border border-blue-100">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform hover:scale-110 transition-transform duration-300">
                    {(user.name || user.username || user.email || '').charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-800 font-semibold max-w-32 truncate">
                    {user.name || user.username || user.email}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold shadow-md"
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 animate-fade-in">
                <Link 
                  to="/login" 
                  className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold shadow-md flex items-center space-x-2"
                >
                  <span>🔐</span>
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold shadow-md flex items-center space-x-2"
                >
                  <span>📝</span>
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar