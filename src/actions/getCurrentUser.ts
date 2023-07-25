import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import prisma from '../libs/prismadb';

// export async function getSession() {
//   return await getServerSession(authOptions);
// }
export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session?.user);
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });
    console.log(currentUser?.id);
    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() ?? null
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
