"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const IMMERSIVE_ROUTES = ["/coaching-form"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isImmersive = IMMERSIVE_ROUTES.some((r) => pathname.startsWith(r));

  if (isImmersive) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
