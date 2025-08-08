import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, handle } = body as {
      email: string;
      password: string;
      name: string;
      handle: string;
    };

    if (!email || !password || !name || !handle) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { handle }] } });
    if (existing) {
      return NextResponse.json({ error: "Email or handle already in use" }, { status: 409 });
    }

    const passwordHash = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name, handle },
      select: { id: true, email: true, name: true, handle: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}