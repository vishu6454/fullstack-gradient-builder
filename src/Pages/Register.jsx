import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundSize = '400% 400%'
    document.body.style.animation = 'gradientShift 15s ease infinite'
    
    return () => {
      document.body.style.background = ''
      document.body.style.animation = ''
    }
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()
      setLoading(false)

      if (response.ok) {
        setMessage('✅ Registration successful! Redirecting to Login...')
        setTimeout(() => navigate('/login'), 1200)
      } else {
        setMessage(data.message || '❌ Registration failed. Try again!')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Server error. Please try later.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full transform hover:scale-[1.02] transition-all duration-500 border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl inline-block mb-4 transform rotate-0 hover:rotate-12 transition-transform duration-500">
            <span className="text-4xl">📝</span>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Join Us
          </h1>
          <p className="text-gray-600 text-lg font-medium">Create your account to get started</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 animate-slide-up">
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <label className="block text-gray-800 font-bold mb-3 text-lg">👤 Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
              required 
            />
          </div>

          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <label className="block text-gray-800 font-bold mb-3 text-lg">📧 Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
              required 
            />
          </div>

          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <label className="block text-gray-800 font-bold mb-3 text-lg">🔒 Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
              </button>
            </div>
          </div>

          {message && (
            <div className={`p-6 rounded-2xl font-bold text-lg transform animate-pulse ${
              message.includes('✅') 
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-200' 
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-200'
            }`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:transform-none shadow-lg flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Create Account</span>
              </>
            )}
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-bold text-lg transition-colors duration-300 flex items-center justify-center space-x-2">
              <span>🔐</span>
              <span>Already have an account? Sign In</span>
            </Link>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </div>
  )
}

export default Register