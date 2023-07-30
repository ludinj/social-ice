import NextAuth from 'next-auth/next';
import { type SessionStrategy, type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import getCurrentUser from '@/actions/getCurrentUser';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // check to see if email and password is there

        if (!credentials?.email || !credentials.password) {
          throw new Error('Please enter an email and password');
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        // if no user was found
        if (!user ?? !user?.hashedPassword) {
          throw new Error('No user found');
        }

        // check to see if password git as
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // if password does not match
        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return user;
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      const currentUser = await getCurrentUser(session);
      session.user = currentUser;
      return session;
    }
  },
  secret: process.env.SECRET_KEY,
  session: {
    strategy: 'jwt' as SessionStrategy
  },
  debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
