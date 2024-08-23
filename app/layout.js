// import SmoothScroll from '@/components/LenisLayout';
import { GlobalProvider } from './GlobalContext';
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
  title: 'Aphrodite Yacht Charters | Luxury Yacht Rentals in Miami',
  description: 'Aphrodite Yacht Charters offers luxury yacht rentals and charter services in Aventura, Miami, Fort Lauderdale, and West Palm Beach. Experience the finest selection of professionally crewed yachts.',
  keywords: 'yacht charter, luxury yacht rental, yacht rental Miami, private yacht charter, charter yacht Miami, Fort Lauderdale yacht rental, South Florida yacht charters, Miami Beach yacht rental, West Palm Beach yacht charter, crew yacht charter, sailing yacht rental, motor yacht charter, yacht charter with crew, event yacht rental, yacht rental for parties, luxury sailing experience, private yacht experience, exclusive yacht charter, yacht vacation Miami, luxury yacht holiday, corporate yacht charters, family yacht vacations, romantic yacht getaway, VIP yacht rental, yacht charter for events, yacht amenities, yacht charter services, charter yacht booking, yacht charter deals, best yacht charters Miami',

};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={sourceSans3.className}>
        <SessionProvider session={session}>
          <GlobalProvider>
            <CustomProvider>
              <Nav />
              {children}
              <Footer />
            </CustomProvider>
          </GlobalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
