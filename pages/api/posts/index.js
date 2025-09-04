import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
      }
      break;

    case "POST":
      try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
          return res.status(400).json({ error: "Missing fields" });
        }
        const newPost = await Post.create({ title, content, author });
        res.status(201).json(newPost);
      } catch (err) {
        res.status(500).json({ error: "Failed to create post" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
