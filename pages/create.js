// pages/create.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query; // check if editing

  // 🔹 If editing, fetch post details
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title || "");
          setContent(data.content || "");
          setAuthor(data.author || "");
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) return;

    setLoading(true);

    try {
      if (id) {
        // 🔹 Update existing post
        await fetch(`/api/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, author }),
        });
      } else {
        // 🔹 Create new post
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, author }),
        });
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/"); // back to homepage
      }, 1500);
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black animate-gradient px-6 overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl relative hover:scale-[1.02] hover:shadow-purple-500/40 transition-all duration-300 z-10">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center mb-6 animate-text">
          {id ? "✏️ Edit Post" : "✍️ Create a New Post"}
        </h1>

        {/* Success Toast */}
        {success && (
          <div className="absolute top-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce backdrop-blur-md border border-white/20">
            {id ? "✅ Post Updated Successfully!" : "🎉 Post Published Successfully!"}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-300"
              placeholder="Enter your post title"
            />
          </div>

          {/* Author Input */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-300"
              placeholder="Enter your name"
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-300"
              placeholder="Write your amazing content here..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-5 py-2 rounded-xl font-semibold text-gray-200 bg-gradient-to-r from-gray-700 to-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300"
            >
              ⬅ Back
            </button>

            <button
              type="submit"
              disabled={!title || !content || !author || loading}
              className={`px-6 py-2 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 
                ${
                  !title || !content || !author || loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-400 to-purple-500 hover:scale-105 hover:shadow-purple-500/50"
                }`}
            >
              {loading ? "⏳ Saving..." : id ? "💾 Update Post" : "🚀 Publish Post"}
            </button>
          </div>
        </form>
      </div>

      {/* Aurora Gradient Animation + Animated Text */}
      <style jsx>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

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
      `}</style>
    </div>
  );
}
