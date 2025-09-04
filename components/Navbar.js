import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/">Blogify</Link>
      </h1>
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-400">Home</Link>
        <Link href="/create" className="hover:text-gray-400">Create</Link>
      </div>
    </nav>
  );
}
