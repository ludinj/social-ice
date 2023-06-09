'use client';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import PostCard from './components/PostCard';

export default function Home() {
  return (
    <ClientOnly>
      <Container>
        <div className="w-full grid grid-cols-3 h-[200vh] bg-red-500 ">
          <div className="col-span-2 h-full bg-white px-8 py-2">
            <PostCard />
          </div>
          <div className="col-span-1 h-full bg-white px-8 py-2">col3</div>
        </div>
      </Container>
    </ClientOnly>
  );
}
