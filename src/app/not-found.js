"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search, BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingIcons = [
    { icon: BookOpen, size: 40, delay: 0 },
    { icon: GraduationCap, size: 50, delay: 1 },
    { icon: Search, size: 35, delay: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div
        className="absolute inset-0 transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${
            mousePosition.y * 0.02
          }px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute text-primary/20 animate-float"
          style={{
            top: `${20 + index * 25}%`,
            left: `${10 + index * 30}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <item.icon size={item.size} />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl">
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <div className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
              404
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent opacity-50 animate-ping-slow">
                404
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Oops! It seems you've ventured into uncharted academic territory.
            The page you're looking for has either moved or doesn't exist in our
            knowledge base.
          </p>

          {/* Creative Message */}
          <div className="bg-base/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-center space-x-2 text-primary mb-3">
              <GraduationCap className="w-6 h-6" />
              <span className="font-semibold">Academic Navigation Tip</span>
            </div>
            <p className="text-foreground/80">
              Even the brightest minds sometimes take wrong turns. Let's get you
              back to familiar grounds!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => router.back()}
              className="group flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>

            <Link
              href="/"
              className="group flex items-center justify-center space-x-2 px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Homepage</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
            <Link
              href="/colleges"
              className="p-4 bg-base/50 border border-border rounded-xl hover:bg-primary/5 transition-all duration-200 group"
            >
              <BookOpen className="w-6 h-6 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-foreground">
                Browse Colleges
              </span>
            </Link>

            <Link
              href="/courses"
              className="p-4 bg-base/50 border border-border rounded-xl hover:bg-primary/5 transition-all duration-200 group"
            >
              <GraduationCap className="w-6 h-6 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-foreground">
                Explore Courses
              </span>
            </Link>

            <Link
              href="/search"
              className="p-4 bg-base/50 border border-border rounded-xl hover:bg-primary/5 transition-all duration-200 group"
            >
              <Search className="w-6 h-6 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-foreground">
                Search Portal
              </span>
            </Link>
          </div>

          {/* Fun Educational Fact */}
          <div className="mt-12 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Did you know?</span>{" "}
              The number 404 is often associated with "Not Found" because it was
              the room number where the first web server was located at CERN.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Corner Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl animate-fade-in"></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-secondary/30 rounded-tr-2xl animate-fade-in"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl animate-fade-in"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-2xl animate-fade-in"></div>
    </div>
  );
}
