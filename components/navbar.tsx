"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pageTitles: { [key: string]: string } = {
  "/admin/login": "Admin Login",
  "/admin/adminhome": "Admin Dashboard",
  "/admin/dashboard/collegeOnboarding": "College Onboarding",
  "/admin/subscription-status": "Subscription Status",
  "/admin/reports": "Reports",
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  // Ensure consistent hydration by updating title after mount
  useEffect(() => {
    setTitle(pageTitles[pathname] || "Admin Panel");
  }, [pathname]);

  const handleLogoClick = () => {
    router.back(); // Navigate back
  };

  return (
    <nav className="bg-indigo-600 text-white font-extrabold p-4 flex justify-between items-center shadow-md h-20 fixed top-0 left-0 w-full z-50">
      {/* Left Side: Logo + Company Name */}
      <div className="flex items-center space-x-4 cursor-pointer" onClick={handleLogoClick}>
        <Image src="/logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
        <h1 className="text-3xl font-bold">Education Master</h1>
      </div>
      {/* Right Side: Page Title (Fixing Hydration Issue) */}
      <h2 className="text-2xl text-white font-bold">Welcome to {title}</h2>
    </nav>
  );
}
