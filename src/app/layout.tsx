import { Inter } from "next/font/google";
import React from "react";
import "./global.css"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="kr">
        <head>
            <title title="Sfer's Devlog"></title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Gasoek+One&family=Noto+Sans+KR:wght@100..900&display=swap"
                rel="stylesheet"/>
        </head>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
