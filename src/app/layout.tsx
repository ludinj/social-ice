import './globals.css';
import { Inter } from 'next/font/google';

import Sidebar from './components/sidebar/Sidebar';
import Container from './components/Container';
// import getCurrentUser from '../actions/getCurrentUser';

import UnderDevModal from './components/underDevModal/UnderDevModal';
import CommentModal from './components/commentModal/CommentModal';
import Providers from '@/providers/Providers';
import RegisterModal from './components/modal/RegisterModal';
import LoginModal from './components/modal/LoginModal';
import getCurrentUser from '@/actions/getCurrentUser';
import RightBar from './components/RightBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="w-full flex justify-center">
            <UnderDevModal />
            <RegisterModal />
            <LoginModal />
            <CommentModal currentUser={currentUser} />
            <Container>
              <Sidebar />
              {children}
            </Container>
          </div>
        </Providers>
      </body>
    </html>
  );
}
