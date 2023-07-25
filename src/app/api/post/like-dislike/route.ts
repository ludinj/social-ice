import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prismadb';

export async function POST(req: Request) {
  const body = await req.json();
  if (req.method !== 'POST') {
    return NextResponse.json({ status: 405, error: 'Method not allowed' });
  }

  try {
    // Extract the necessary data from the request body
    const { postId, userId, action } = body;
    console.log(postId, userId);
    // Find the post in the database
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      return NextResponse.json({ status: 404, error: 'Post not found' });
    }

    let updatedPost;

    if (action === 'like') {
      // Like the post by adding the user's ID to the `likesId` array
      updatedPost = await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          likesId: {
            push: userId
          }
        },
        include: {
          author: true // Include user information for the post
        }
      });
    } else if (action === 'dislike') {
      // Dislike the post by removing the user's ID from the `likesId` array
      updatedPost = await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          likesId: {
            set: post.likesId.filter((id) => id !== userId)
          }
        },
        include: {
          author: true // Include user information for the post
        }
      });
    } else {
      return NextResponse.json({ status: 400, error: 'Invalid action' });
    }

    // Return the updated post as the API response

    return NextResponse.json({ status: 201, post: updatedPost });
  } catch (error: any) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
