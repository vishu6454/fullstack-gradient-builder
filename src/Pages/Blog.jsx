import React, { useState, useEffect } from 'react'

function Blog() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs')
      const data = await response.json()
      if (response.ok) {
        setBlogs(data.blogs || [])
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const token = localStorage.getItem('authToken')
      const user = JSON.parse(localStorage.getItem('loggedUser'))
      
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          author: user?._id
        })
      })

      const data = await response.json()
      setLoading(false)

      if (response.ok) {
        setMessage('✅ Blog created successfully!')
        setTitle('')
        setContent('')
        fetchBlogs()
      } else {
        setMessage(data.msg || '❌ Failed to create blog')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Server error')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 animate-gradient-x py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 transform hover:scale-[1.02] transition-all duration-500 border border-white/20">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-bounce-in">
            ✍️ Blog Management
          </h1>
          <p className="text-gray-600 text-lg mb-8 font-medium animate-fade-in">
            Create and manage your amazing blog posts
          </p>

          <form onSubmit={handleCreateBlog} className="space-y-6 mb-8 animate-slide-up">
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">📝 Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg"
                placeholder="✨ Enter your creative blog title..."
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-gray-800 font-bold mb-3 text-lg">📖 Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg resize-none"
                placeholder="🖋️ Write your inspiring blog content here..."
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
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:transform-none shadow-lg"
            >
              {loading ? '⏳ Creating Magic...' : '🚀 Publish Blog Post ✨'}
            </button>
          </form>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-500 border border-white/20">
          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 animate-bounce-in">
            📚 All Blog Posts
          </h2>
          <div className="space-y-6">
            {blogs.length === 0 ? (
              <div className="text-center py-12 animate-pulse">
                <p className="text-2xl text-gray-500 font-semibold">No blog posts yet. Create the first one! 🌟</p>
              </div>
            ) : (
              blogs.map((blog, index) => (
                <div 
                  key={blog._id} 
                  className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-2xl font-black text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">{blog.content}</p>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full">
                      👤 By: {blog.author?.email || 'Unknown Author'}
                    </span>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full">
                      📅 {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog