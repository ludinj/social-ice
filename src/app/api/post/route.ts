import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { type NextApiResponse } from 'next';
import { type Post } from '@prisma/client';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!currentUser) {
    return null;
  }
  const body: Post = await req.json();

  const { description, imageUrl, parentPostId } = body;

  try {
    const post = await prisma.post.create({
      data: {
        description,
        imageUrl,
        author: {
          connect: { id: currentUser.id }
        },
        ...(parentPostId && {
          parentPost: {
            connect: { id: parentPostId }
          }
        })
      }
    });
    console.log(post);
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
  }
}

export async function GET(res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
      where: { parentPost: null },
      include: {
        replies: true, // Include comments in the response',
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    console.log(posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
