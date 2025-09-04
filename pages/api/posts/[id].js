// pages/api/posts/[id].js
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(post);
      } catch (err) {
        console.error("GET error:", err);
        res.status(500).json({ error: "Failed to fetch post" });
      }
      break;

    case "PUT":
      try {
        const { title, content, author } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          { title, content, author },
          { new: true, runValidators: true }
        );
        if (!updatedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(updatedPost);
      } catch (err) {
        console.error("PUT error:", err);
        res.status(500).json({ error: "Failed to update post" });
      }
      break;

    case "DELETE":
      try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
      } catch (err) {
        console.error("DELETE error:", err);
        res.status(500).json({ error: "Failed to delete post" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
