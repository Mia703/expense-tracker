import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A table based expense tracker for dummies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledEngineProvider injectFirst>
      <body
      id="body"
        className={`${notoSans.className} bg-primaryBackground antialiased`}
      >
        <div
          id="main-grid"
          className="grid grid-cols-4 p-4 md:grid-cols-6 lg:grid-cols-12"
        >
          {children}
        </div>
      </body>

      </StyledEngineProvider>
    </html>
  );
}
