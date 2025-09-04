import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // ✅ Fetch posts from backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Floating Glow Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* Navbar */}
      <nav className="relative flex justify-between items-center px-8 py-6 z-10">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🚀</span>
          <h1 className="text-2xl font-extrabold logo-text">Blogforge</h1>
        </div>
        <Link href="/create">
          <button className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-400 to-purple-500 shadow-lg hover:scale-105 transition-all duration-300">
            ➕ New Post
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative text-center py-20 px-6 z-10">
        <h2 className="text-6xl font-extrabold mb-6 animate-text">
          Your Voice. Amplified ✍️
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Share your thoughts, ideas, and stories with the world. ✨ Start
          writing today and inspire others with your words.
        </p>
      </section>

      {/* Features Section */}
      <section className="relative px-8 py-16 text-center z-10">
        <h3 className="text-3xl font-bold text-white mb-12">✨ Features</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Create",
              desc: "👉 Start new blog posts with title, content, and author details. Express your ideas in seconds",
              color: "text-teal-400",
              link: "/create",
            },
            {
              title: "Read",
              desc: "👉 Browse posts in a clean, responsive UI — with options to edit ✏️ or delete 🗑️ your posts anytime.",
              color: "text-blue-400",
              link: "/post",
            },

          ].map((f, idx) => (
            <Link key={idx} href={f.link}>
              <div className="feature-card p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md hover:scale-105 hover:shadow-teal-400/40 transition cursor-pointer">
                <h4 className={`text-xl font-semibold ${f.color} mb-2`}>
                  {f.title}
                </h4>
                <p className="text-gray-300">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative px-8 py-16 text-center bg-white/5 backdrop-blur-md border-y border-white/10 z-10">
        <h3 className="text-3xl font-bold text-white mb-10">🛠 Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {["Next.js", "React", "TailwindCSS", "MongoDB", "Vercel"].map(
            (tech, idx) => (
              <span
                key={idx}
                className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 font-semibold shadow hover:scale-105 hover:shadow-purple-500/40 transition"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="relative px-8 py-12 z-10">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <p className="text-gray-300 text-lg">
              ✨ No posts yet. Create your first one below!
            </p>
            <Link href="/create">
              <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-purple-500 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
                ➕ Create Post
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.03] hover:shadow-2xl hover:border-teal-400/60 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    ✍️ {post.author || "Anonymous"} ·{" "}
                    {new Date(
                      post.timestamp || Date.now()
                    ).toLocaleDateString()}
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
      </main>

      {/* Footer */}
      <footer className="relative text-center py-8 text-gray-400 border-t border-white/10 mt-12 z-10">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold">
            Blogforge
          </span>{" "}
          · Built using Next.js & TailwindCSS.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="hover:text-teal-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            className="hover:text-teal-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </footer>

      {/* Extra Styling */}
      <style jsx>{`
        .animate-text {
          background: linear-gradient(to right, #14b8a6, #9333ea, #3b82f6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShine 3s linear infinite;
        }
        @keyframes textShine {
          to {
            background-position: 200% center;
          }
        }

        .logo-text {
          background: linear-gradient(to right, #14b8a6, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
        }

        .feature-card:hover {
          border-color: #14b8a6;
          box-shadow: 0 0 25px rgba(20, 184, 166, 0.3);
        }
      `}</style>
    </div>
  );
}
