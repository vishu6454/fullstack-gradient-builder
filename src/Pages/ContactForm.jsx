import React, { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messages: '',
    contact: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/forms/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setLoading(false)

      if (response.ok) {
        setMessage('✅ Form submitted successfully!')
        setFormData({
          name: '',
          email: '',
          messages: '',
          contact: ''
        })
      } else {
        setMessage(data.error || '❌ Failed to submit form')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Server error')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 animate-gradient-xy py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-500 border border-white/20">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-bounce-in">
            📞 Contact Us
          </h1>
          <p className="text-gray-600 text-lg mb-8 font-medium animate-fade-in">
            We'd love to hear from you. Send us a message! 💌
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <label className="block text-gray-800 font-bold mb-3 text-lg">👤 Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <label className="block text-gray-800 font-bold mb-3 text-lg">📧 Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">📱 Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                placeholder="Enter your contact number"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">💬 Message</label>
              <textarea
                name="messages"
                value={formData.messages}
                onChange={handleChange}
                rows="5"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg resize-none"
                placeholder="Write your message here..."
                required
              />
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
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-black text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:transform-none shadow-lg flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>📤</span>
                  <span>Send Message ✨</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm