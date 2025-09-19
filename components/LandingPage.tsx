"use client";
import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="flex items-center justify-between p-8 lg:p-16 gap-16 max-lg:flex-col">
        {/* Left Content */}
        <section className="flex-1 max-w-2xl animate-fade-in">
          {/* Logo and Badge */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-200 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
              <Image
                src="/assets/SyncUpIcon.png"
                width={80}
                height={80}
                alt="SyncUp Logo"
                className="relative z-10 drop-shadow-lg"
              />
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
              #1 Scheduling Tool
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            Your time,
            <span className="block">perfectly planned</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join millions of professionals who easily book meetings with
            intelligent scheduling that adapts to your workflow
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: Calendar, text: "Smart calendar sync" },
              { icon: Clock, text: "Instant availability" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-700 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full border-2 border-white"
                ></div>
              ))}
            </div>
            <span>Trusted by 2M+ professionals worldwide</span>
          </div>
        </section>

        {/* Right Content - Sign In */}
        <section className="flex-shrink-0 relative">
          {/* Background Elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl opacity-10 blur-2xl animate-pulse"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
          <div
            className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Sign In Container */}
          <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Get Started Today
              </h2>
              <p className="text-gray-600">
                Sign in to unlock your scheduling superpower
              </p>
            </div>

            <SignIn
              routing="hash"
              appearance={{
                baseTheme: neobrutalism,
                elements: {
                  rootBox: "shadow-none",
                  card: "shadow-none bg-transparent",
                },
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
