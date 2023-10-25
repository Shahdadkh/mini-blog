import "./globals.css";
import type { Metadata } from "next";
import iransans from "@/public/assets/fonts/IranSans/iransans";
import MainHeader from "@/components/common/MainHeader";
import PanelHeader from "@/components/common/PanelHeader";

export const metadata: Metadata = {
  title: "My Gray Life",
  description: "Generated by next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${iransans.className} font-iran`}>
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
