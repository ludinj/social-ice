import prisma from '../libs/prismadb';
import { type Session } from 'next-auth';

export default async function getCurrentUser(session: Session) {
  try {
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
