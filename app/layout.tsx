import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const lato = localFont({
  variable: "--font-lato",
  display: "swap",
  src: [
    {
      path: "./fonts/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lato-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Lato-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Lato-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Eduardo | Terapeuta em Dependência Química",
  description:
    "Terapia com foco em dependência química para compreender o uso, mudar de verdade e reconstruir uma vida com sentido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={lato.variable}>{children}</body>
    </html>
  );
}
