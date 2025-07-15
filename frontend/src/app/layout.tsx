'use client';

import "@/styles/global.scss";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noHeaderRoutes = ['/login', '/register'];
  const shouldShowHeader = !noHeaderRoutes.includes(pathname);

  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider>
          {shouldShowHeader && (
            <header>
              <Header />
            </header>
          )}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
