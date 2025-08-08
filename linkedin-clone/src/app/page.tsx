import { getServerSession } from "next-auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getServerSession();
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, likes: true, comments: true },
    take: 20,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <aside className="md:col-span-1 space-y-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold">Profile</h2>
          {session?.user ? (
            <div className="mt-2 text-sm">
              <p>{session.user.name}</p>
            </div>
          ) : (
            <div className="mt-2 text-sm">
              <Link className="text-blue-600" href="/login">Sign in</Link>
            </div>
          )}
        </div>
      </aside>

      <section className="md:col-span-2 space-y-4">
        <div className="bg-white rounded shadow p-4">
          <Composer />
        </div>
        <div className="space-y-4">
          {posts.map((p) => (
            <article key={p.id} className="bg-white rounded shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.author.name}</p>
                  <p className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap">{p.content}</p>
              <div className="mt-3 text-sm text-gray-600 flex gap-4">
                <span>{p.likes.length} likes</span>
                <span>{p.comments.length} comments</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="md:col-span-1 space-y-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold">Add to your feed</h2>
          <ul className="mt-2 space-y-2 text-sm text-blue-600">
            <li><Link href="#">#react</Link></li>
            <li><Link href="#">#javascript</Link></li>
            <li><Link href="#">#nextjs</Link></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Composer() {
  return (
    <form action="/api/posts" method="post" className="space-y-2">
      <textarea name="content" className="w-full border rounded px-3 py-2" placeholder="Start a post" required />
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 text-sm">Post</button>
      </div>
    </form>
  );
}
