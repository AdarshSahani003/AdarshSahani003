import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, likes: true, comments: true },
    take: 20,
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") || "";
  let content = "";
  if (contentType.includes("application/json")) {
    const body = await req.json();
    content = (body?.content || "").toString();
  } else {
    const form = await req.formData();
    content = (form.get("content") || "").toString();
  }

  if (!content.trim()) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { content, authorId: userId },
  });
  return NextResponse.json(post, { status: 201 });
}