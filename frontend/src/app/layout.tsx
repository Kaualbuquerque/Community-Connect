import "@/styles/global.scss";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider>
          <header>
            <Header />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
