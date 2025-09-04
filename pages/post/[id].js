// pages/post/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
        <h2 className="text-2xl font-semibold animate-pulse">Loading Post...</h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
        <h2 className="text-2xl font-semibold">Post not found 🚫</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Post Card */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
          {post.title}
        </h1>

        <p className="text-gray-200 leading-relaxed mb-6">{post.content}</p>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-400">
            ✍️ Author: <span className="text-gray-200">{post.author}</span>
          </p>

          <div className="flex gap-4">
            {/* Fix: Send to create page with ?id */}
            <button
              onClick={() => router.push(`/create?id=${post._id}`)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow hover:scale-105 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow hover:scale-105 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
