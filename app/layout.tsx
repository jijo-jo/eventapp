import "./globals.css";

import { NavBar } from "@components";

export const metadata = {
  title: "GoEve",
  description: "GoEve",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <NavBar />
        <div className="container mx-auto mt-4 p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
