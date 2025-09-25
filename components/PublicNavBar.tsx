import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function PublicNavBar() {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-20 bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 lg:px-10 shadow-lg">
      {/* Logo with glow effect */}
      <Link
        href="/login"
        className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          <Image
            src="/assets/SyncUpIcon.png"
            width={50}
            height={50}
            alt="SyncUp Logo"
            className="relative z-10 drop-shadow-lg"
          />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
          SyncUp
        </span>
      </Link>

      {/* Authentication Buttons */}
      <section className="flex items-center gap-3">
        <SignInButton>
          <Button className="relative overflow-hidden bg-white/60 hover:bg-white/80 text-gray-700 font-semibold px-6 py-2.5 border border-gray-200/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm group">
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </SignInButton>

        <SignUpButton>
          <Button className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Shine effect */}
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700 transform skew-x-12"></div>
          </Button>
        </SignUpButton>
      </section>
    </nav>
  );
}
