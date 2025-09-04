// pages/posts.js
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts"); // ✅ Your API route
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black px-8 py-12">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold animate-text">🚀 Blogforge</h1>
        <Link href="/create">
          <button className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-400 to-purple-500 shadow-lg hover:scale-105 transition-all">
            ➕ New Post
          </button>
        </Link>
      </nav>

      {/* Posts */}
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        📖 All Blog Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-300 text-center">No posts available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.03] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
              <p className="text-gray-300 text-sm mb-4">
                {post.content.slice(0, 120)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  ✍️ {post.author || "Anonymous"} ·{" "}
                  {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                </span>
                <Link href={`/post/${post._id}`}>
                  <button className="text-sm font-semibold text-white px-3 py-1 bg-gradient-to-r from-teal-400 to-purple-500 rounded-lg shadow hover:scale-105 transition">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
