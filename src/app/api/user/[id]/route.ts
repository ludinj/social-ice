import { verifyJwt } from '@/libs/jwt';
import prisma from '@/libs/prismadb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get('authorization');
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: 'unauthorized'
      }),
      {
        status: 401
      }
    );
  }
  const userPosts = await prisma.post.findMany({
    where: { authorId: params.id },
    include: {
      author: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });

  return new Response(JSON.stringify(userPosts));
}
