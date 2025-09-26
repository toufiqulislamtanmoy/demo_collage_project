"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return pathname === path;
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges" },
    { name: "Admission", href: "/admission" },
    { name: "My College", href: "/my-college" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-base/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5m-9 5v9"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">
                EduPortal
              </span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            
            {status === "loading" ? (
              <div className="w-20 h-9 bg-muted rounded-lg animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-sm font-medium text-foreground cursor-pointer">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-content text-sm font-semibold">
                        {session.user?.name?.charAt(0) ||
                          session.user?.email?.charAt(0) ||
                          "U"}
                      </span>
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-base rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-4 border-b border-border">
                      <p className="text-sm font-medium text-foreground">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/profile"
                        className="block px-3 py-2 text-sm text-foreground hover:bg-primary/5 rounded-md transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-3 py-2 text-sm text-foreground hover:bg-primary/5 rounded-md transition-colors"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="block cursor-pointer w-full text-left px-3 py-2 text-sm text-error hover:bg-error/5 rounded-md transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-primary text-primary-content text-sm font-medium rounded-lg hover:bg-primary-focus transition-colors shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-primary/5 transition-colors"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-base/95 backdrop-blur-md rounded-lg border border-border mt-2 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              <div className="border-t border-border pt-3 mt-3">
                {status === "loading" ? (
                  <div className="px-3 py-2">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                  </div>
                ) : session ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error hover:bg-error/5"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-content hover:bg-primary-focus mt-2"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
