import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">
        {post.content.length > 100
          ? post.content.substring(0, 100) + "..."
          : post.content}
      </p>
      <Link
        href={`/post/${post._id}`}
        className="text-blue-500 hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}
