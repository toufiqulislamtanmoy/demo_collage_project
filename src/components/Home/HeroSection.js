"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Award,
  ArrowRight,
} from "lucide-react";

const dummyColleges = [
  {
    id: 1,
    name: "Harvard University",
    admissionDates: "Jan 10 - Mar 15",
    image: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    events: ["Orientation", "Tech Fest", "Sports Day"],
    research: 25,
    sports: ["Basketball", "Football", "Swimming"],
    rating: 4.8,
    location: "Cambridge, MA",
    students: 21000,
    established: 1636,
  },
  {
    id: 2,
    name: "MIT",
    admissionDates: "Feb 1 - Apr 20",
    image: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    events: ["Robotics Competition", "Hackathon"],
    research: 40,
    sports: ["Soccer", "Tennis", "Athletics"],
    rating: 4.9,
    location: "Cambridge, MA",
    students: 11000,
    established: 1861,
  },
  {
    id: 3,
    name: "Stanford University",
    admissionDates: "Jan 15 - Mar 30",
    image: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    events: ["Startup Week", "Cultural Fest"],
    research: 30,
    sports: ["Basketball", "Baseball"],
    rating: 4.7,
    location: "Stanford, CA",
    students: 17000,
    established: 1885,
  },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredColleges = dummyColleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,var(--color-primary)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              College
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover the best colleges and universities that match your dreams.
            Your educational journey starts here.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">50K+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="search-container max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for colleges by name or location..."
              className="w-full pl-5 pr-3 py-3 text-lg bg-base/80 backdrop-blur-md border border-border rounded-lg shadow-2xl focus:outline-none focus:ring focus:ring-primary/20 focus:border-primary text-foreground placeholder-muted-foreground transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />

            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery && filteredColleges.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-base/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl overflow-hidden z-20 max-h-[400px] overflow-y-auto">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      Found {filteredColleges.length} college
                      {filteredColleges.length !== 1 ? "s" : ""}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Matching "{searchQuery}"
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {filteredColleges.map((college) => (
                    <CollegeSearchResult
                      key={college.id}
                      college={college}
                      onSelect={() => setIsSearchFocused(false)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {isSearchFocused &&
              searchQuery &&
              filteredColleges.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-base/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-6 text-center z-[50] max-h-[520px]">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No colleges found
                  </h3>
                  <p className="text-muted-foreground">
                    Try searching with different keywords or browse our college
                    directory.
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex lg:flex-row flex-col w-full gap-3 justify-center  mt-8">
          <Link
            href="/colleges"
            className="px-8 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <span>Browse All Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/compare"
            className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Compare Colleges</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// College Search Result Component
function CollegeSearchResult({ college, onSelect }) {
  return (
    <Link href={`/colleges/${college.id}`} onClick={onSelect}>
      <div className="p-4 hover:bg-primary/5 transition-colors duration-200 cursor-pointer group">
        <div className="flex items-start space-x-4">
          {/* College Image */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* College Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {college.name}
              </h3>
              <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-semibold text-foreground">
                  {college.rating}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{college.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{college.students.toLocaleString()} students</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Admission: {college.admissionDates}</span>
              </div>
              <span>Est. {college.established}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HeroSection;
