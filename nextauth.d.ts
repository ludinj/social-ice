import { type SafeUser } from '@/types';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: SafeUser | null;
  }
}
