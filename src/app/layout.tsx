import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSans.className} antialiased`}>
        <Provider>
          <div
            id="main-grid"
            className="grid grid-cols-4 p-4 md:grid-cols-6 lg:grid-cols-12"
          >
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
