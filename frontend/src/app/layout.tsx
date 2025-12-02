'use client';

import "@/styles/global.scss";
import Header from "../components/Header/Header";
import { usePathname } from "next/navigation";
import { useAutoLogout } from "@/utils/useAutoLogout";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noHeaderRoutes = ['/auth/login', '/auth/register'];
  const shouldShowHeader = !noHeaderRoutes.includes(pathname);

  const noSidebarRoutes = ['/', '/auth/login', '/auth/register'];
  const shouldShowSidebar = !noSidebarRoutes.includes(pathname);

  useAutoLogout("/dashboard");

  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider>
          {shouldShowHeader && (
            <header>
              <Header />
            </header>
          )}
          <main>
            {shouldShowSidebar && (<Sidebar />)}
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
