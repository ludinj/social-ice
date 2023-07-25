import { type Post, type User } from '@prisma/client';

/* eslint-disable */
export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified' | 'hashedPassword'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  role?: string;
  accessToken: string;
};

export interface IPost extends Post {
  author: SafeUser;
}
