import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Nihal Shah | Portfolio",
  description: "Projects, experience, skills, and writing by Nihal Shah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>

          <footer
            className="border-t mt-16"
            style={{ borderColor: "rgb(var(--border))" }}
          >
            <div className="container-page py-10 text-sm muted flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} Nihal Shah</span>
              <span>Built with Next.js, Tailwind, Framer Motion.</span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
