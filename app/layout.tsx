import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: "Mega Wings Cuenca | El plan perfecto está aquí",
  description: "Alitas, miches, bytes, jugos y buena vibra en Plaza Roma, Cuenca.",
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "dark", themeColor: "#0b0b0b", viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
