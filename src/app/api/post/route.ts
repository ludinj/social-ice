import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextApiRequest, NextApiResponse } from 'next';

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
  const body = await req.json();

  const { description, imageUrl } = body;

  try {
    const post = await prisma.post.create({
      data: {
        description,
        imageUrl,
        author: {
          connect: { id: currentUser.id }
        },
        commentsId: [],
        likesId: []
      }
    });

    return NextResponse.json(post);
  } catch (error) {}
}

export async function GET(res: NextApiResponse) {
  console.log('called');
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true, // Include comments in the response',
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
