import { Roboto, Source_Sans_3 } from 'next/font/google';
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
// const madimiOne = MadimiOne({
//   subsets: ['latin'],
// });
const roboto = Roboto({
  subsets: ['latin'],
  weight: '500'
})


const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300','400', '500', '600', '700']
})



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sourceSans3.className}>{children}</body>
    </html>
  );
}
