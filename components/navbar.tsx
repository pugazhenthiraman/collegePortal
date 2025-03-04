"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

const pageTitles: { [key: string]: string } = {
  // Admin Pages
  "/admin/dashboard/adminhome": "Admin Home",
  "/admin/dashboard/collegeOnboarding": "College Onboarding",
  "/admin/login": "Admin Login",
  "/admin/register": "Admin Register",

  // College Portal Pages
  "/college/login": "College Login",
  "/college/register": "College Register",
  "/college/dashboard": "College Dashboard",
};

export default function Navbar() {
  const pathname = usePathname();

  // ✅ Find the closest match instead of direct lookup
  const pageTitle =
    Object.keys(pageTitles).find((key) => pathname.startsWith(key))?.length !== 0
      ? pageTitles[pathname] || "Dashboard"
      : "";

  return (
    <nav className="bg-indigo-600 text-white font-extrabold p-4 flex justify-between items-center shadow-md h-20 fixed top-0 left-0 w-full z-50">
      {/* Left Side: Logo + Company Name */}
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
        <h1 className="text-3xl font-bold">Education Master</h1>
      </div>
      {/* Right Side: Page Name (Only Text, No Functionality) */}
      <h2 className="text-2xl text-white font-bold">
        Welcome to {pageTitle ? pageTitle : "Home"}
      </h2>
    </nav>
  );
}
