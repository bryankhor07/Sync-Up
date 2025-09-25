"use client";

import { PrivateNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivateNavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-20 bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 lg:px-10 shadow-lg">
      {/* Logo with glow effect */}
      <Link
        href="/events"
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

      {/* Navigation Links */}
      <section className="flex items-center">
        <div className="flex items-center gap-2 lg:gap-4">
          {PrivateNavLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group",
                  "hover:bg-white/60 hover:shadow-md hover:scale-105",
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-indigo-600"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-90"></div>
                )}

                <div className="relative z-10 flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1.5 rounded-lg transition-colors duration-300",
                      isActive
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-indigo-100"
                    )}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={cn(
                        "transition-all duration-300",
                        isActive && "brightness-0 invert"
                      )}
                    />
                  </div>

                  <span
                    className={cn(
                      "font-semibold text-sm lg:text-base max-lg:hidden transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : "text-gray-700 group-hover:text-indigo-600"
                    )}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* User Profile */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 scale-150"></div>
        <div className="relative z-10 transition-transform duration-300 hover:scale-110">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-white/50 shadow-lg hover:ring-indigo-300 transition-all duration-300",
                  userButtonPopoverCard:
                    "shadow-xl border-0 bg-white/90 backdrop-blur-lg",
                  userButtonPopoverHeader:
                    "bg-gradient-to-r from-indigo-50 to-purple-50",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
