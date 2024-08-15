// import SmoothScroll from '@/components/LenisLayout';
import { Roboto, Source_Sans_3 } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { CustomProvider } from 'rsuite';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';


const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Aphrodite Yacht Charters',
  description:
    'Aphrodite Yacht Charters, Aventura-Fl. We offer luxury yachts, rentals, and charter services in north Miami, Florida. features the finest selection of professionally crewed Luxury Yacht Rentals and Yacht Charters in Miami, Miami Beach, Fort Lauderdale, West Palm Beach.',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={sourceSans3.className}>
        <SessionProvider session={session}>
          <CustomProvider>
          <Nav />
          {children}
          <Footer />
          </CustomProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
