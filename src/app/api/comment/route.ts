// pages/api/comments.ts
import { NextResponse } from 'next/server';

import prisma from '../../../libs/prismadb';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    const body = await req.json();
    const { postId, userId, text } = body;

    try {
      const comment = await prisma.comment.create({
        data: {
          text,
          userId,
          postId
        }
      });

      return NextResponse.json(comment);
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({ status: 405, error: 'Method not allowed' });
  }
}
