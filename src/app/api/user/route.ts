import prisma from '@/libs/prismadb';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword: await bcrypt.hash(body.password, 10)
    }
  });

  const { hashedPassword, ...result } = user;
  return new Response(JSON.stringify(result));
}
