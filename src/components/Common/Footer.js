"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Colleges", href: "/colleges" },
    { name: "Courses", href: "/courses" },
    { name: "Admissions", href: "/admissions" },
  ];

  const resources = [
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "FAQs", href: "/faqs" },
    { name: "Support", href: "/support" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-br from-foreground to-foreground/90 text-primary-content relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-primary)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="xl:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-content">
                    E
                  </span>
                </div>
                <span className="text-2xl font-bold">EduPortal</span>
              </Link>

              <p className="text-primary-content/80 text-lg mb-6 leading-relaxed">
                Your gateway to world-class education. Discover the perfect
                college, explore courses, and shape your future with confidence.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-primary-content/80">
                    hello@eduportal.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-primary-content/80">
                    +880 55523-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-primary-content/80">
                    123 Education Street, Learning City
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-content/70 hover:text-primary transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary">
                Resources
              </h3>
              <ul className="space-y-3">
                {resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-content/70 hover:text-primary transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary">
                Stay Updated
              </h3>
              <p className="text-primary-content/70 mb-4">
                Get the latest news and updates about colleges and admissions.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-primary-content/10 border border-primary-content/20 rounded-lg text-primary-content placeholder-primary-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-content p-2 rounded-lg hover:bg-primary-focus transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {isSubscribed && (
                  <div className="p-3 bg-accent/20 border border-accent/30 rounded-lg">
                    <p className="text-accent text-sm text-center">
                      🎉 Thank you for subscribing!
                    </p>
                  </div>
                )}
              </form>

              {/* Social Links */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-4 text-primary-content/80">
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-primary-content/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-content transition-all duration-200 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-content/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-primary-content/60 text-sm">
                © {new Date().getFullYear()} EduPortal. Made with{" "}
                <Heart className="w-4 h-4 text-red-500 inline mx-1" />
                for education.
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center space-x-6">
                {legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-primary-content/60 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* App Badges */}
              <div className="flex space-x-3">
                <button className="bg-primary-content/10 hover:bg-primary-content/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  📱 iOS App
                </button>
                <button className="bg-primary-content/10 hover:bg-primary-content/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  🤖 Android App
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-content rounded-full shadow-lg hover:bg-primary-focus transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
