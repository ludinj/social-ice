import { signJwtAccessToken } from '@/libs/jwt';
import prisma from '@/libs/prismadb';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  console.log('called');
  try {
    const body: RequestBody = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    });

    if (!user) {
      return new Response('USER NO FOUD');
    }
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.hashedPassword as string
    );

    if (user && isPasswordCorrect) {
      const { hashedPassword, ...userWithoutPass } = user;
      const accessToken = signJwtAccessToken(userWithoutPass);
      const result = {
        ...userWithoutPass,
        accessToken
      };
      return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
  } catch (error) {
    console.log(error);
  }
}
