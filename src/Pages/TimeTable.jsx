import React, { useState, useEffect } from 'react'

function TimeTable() {
  const [tables, setTables] = useState([])
  const [formData, setFormData] = useState({
    Day: '',
    Time: '',
    Subject: '',
    Teacher: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tables/get-table')
      const data = await response.json()
      if (response.ok) {
        setTables(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching tables:', error)
    }
  }

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
      const response = await fetch('http://localhost:5000/api/tables/create-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setLoading(false)

      if (response.ok) {
        setMessage('✅ TimeTable entry created successfully!')
        setFormData({
          Day: '',
          Time: '',
          Subject: '',
          Teacher: ''
        })
        fetchTables()
      } else {
        setMessage(data.msg || '❌ Failed to create timetable entry')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Server error')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/tables/table/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      if (response.ok) {
        setMessage('✅ Entry deleted successfully!')
        fetchTables()
      } else {
        setMessage(data.msg || '❌ Failed to delete entry')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Server error')
    }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 animate-gradient-x py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-500 border border-white/20">
          <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-bounce-in">
            📅 TimeTable Management
          </h1>
          <p className="text-gray-600 text-lg mb-8 font-medium animate-fade-in">
            Create and manage your class timetable with style
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">📅 Day</label>
              <select
                name="Day"
                value={formData.Day}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                required
              >
                <option value="">Select Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">⏰ Time</label>
              <input
                type="text"
                name="Time"
                value={formData.Time}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                placeholder="e.g., 9:00-10:00"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">📚 Subject</label>
              <input
                type="text"
                name="Subject"
                value={formData.Subject}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                placeholder="Enter subject"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">👨‍🏫 Teacher</label>
              <input
                type="text"
                name="Teacher"
                value={formData.Teacher}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                placeholder="Enter teacher name"
                required
              />
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              {message && (
                <div className={`p-6 rounded-2xl font-bold text-lg mb-6 transform animate-pulse ${
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
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-black text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:transform-none shadow-lg"
              >
                {loading ? '⏳ Creating Entry...' : '➕ Add TimeTable Entry ✨'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-500 border border-white/20">
          <h2 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-8 animate-bounce-in">
            📋 Current TimeTable
          </h2>
          {tables.length === 0 ? (
            <div className="text-center py-12 animate-pulse">
              <p className="text-2xl text-gray-500 font-semibold">No timetable entries yet. Create the first one! 🌟</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border-2 border-gray-100 shadow-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 to-pink-500">
                    <th className="border-2 border-orange-100 px-6 py-4 text-left font-black text-white text-lg">📅 Day</th>
                    <th className="border-2 border-orange-100 px-6 py-4 text-left font-black text-white text-lg">⏰ Time</th>
                    <th className="border-2 border-orange-100 px-6 py-4 text-left font-black text-white text-lg">📚 Subject</th>
                    <th className="border-2 border-orange-100 px-6 py-4 text-left font-black text-white text-lg">👨‍🏫 Teacher</th>
                    <th className="border-2 border-orange-100 px-6 py-4 text-left font-black text-white text-lg">⚡ Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((table, index) => (
                    <tr 
                      key={table._id} 
                      className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300 animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="border-2 border-gray-100 px-6 py-4 font-semibold text-gray-800 text-lg">{table.Day}</td>
                      <td className="border-2 border-gray-100 px-6 py-4 font-semibold text-gray-800 text-lg">{table.Time}</td>
                      <td className="border-2 border-gray-100 px-6 py-4 font-semibold text-gray-800 text-lg">{table.Subject}</td>
                      <td className="border-2 border-gray-100 px-6 py-4 font-semibold text-gray-800 text-lg">{table.Teacher}</td>
                      <td className="border-2 border-gray-100 px-6 py-4">
                        <button
                          onClick={() => handleDelete(table._id)}
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TimeTable