"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Calendar,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const colleges = [
  {
    id: 1,
    name: "Oxford University",
    image: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    admissionDate: "2025-10-01",
    events: ["Science Fair", "Tech Fest", "Research Symposium"],
    researchHistory: 120,
    sports: ["Football", "Basketball", "Tennis", "Rowing"],
    rating: 4.9,
    location: "Oxford, UK",
    students: 24500,
    established: 1096,
    featured: true,
  },
  {
    id: 2,
    name: "Harvard University",
    image: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    admissionDate: "2025-11-15",
    events: ["Cultural Fest", "Alumni Meet", "Leadership Summit"],
    researchHistory: 200,
    sports: ["Cricket", "Baseball", "Swimming", "Soccer"],
    rating: 4.7,
    location: "Cambridge, MA",
    students: 21000,
    established: 1636,
    featured: true,
  },
  {
    id: 3,
    name: "Cambridge University",
    image: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    admissionDate: "2025-12-05",
    events: ["Debate Competition", "Science Congress", "Arts Festival"],
    researchHistory: 90,
    sports: ["Hockey", "Swimming", "Tennis", "Athletics"],
    rating: 4.5,
    location: "Cambridge, UK",
    students: 19800,
    established: 1209,
    featured: false,
  },
  {
    id: 4,
    name: "Stanford University",
    image: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    admissionDate: "2025-09-20",
    events: ["Hackathon", "Music Fest", "Startup Pitch"],
    researchHistory: 150,
    sports: ["Tennis", "Rugby", "Basketball", "Golf"],
    rating: 4.8,
    location: "Stanford, CA",
    students: 17000,
    established: 1885,
    featured: true,
  },
];

export default function CollegeShowcase() {
  const [topColleges, setTopColleges] = useState([]);

  useEffect(() => {
    // Sort by rating and pick top 3 featured colleges
    const sorted = [...colleges]
      .filter((college) => college.featured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    setTopColleges(sorted);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-base to-muted/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              TOP RATED
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Colleges
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover world-class institutions that have consistently excelled in
            education, research, and student experience.
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {topColleges.map((college, index) => (
            <CollegeCard key={college.id} college={college} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to Find Your Perfect College?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our comprehensive database of 500+ colleges and
              universities worldwide. Compare programs, admission requirements,
              and campus life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Browse All Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300">
                Compare Colleges
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollegeCard({ college, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative">
      {/* Featured Badge */}
      {college.featured && (
        <div className="absolute -top-3 left-6 z-10">
          <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Ranking Badge */}
      <div className="absolute -top-3 -right-3 z-10">
        <div className="w-12 h-12 bg-foreground text-base rounded-full flex items-center justify-center shadow-lg">
          <span className="text-lg font-bold text-primary-content">
            #{index + 1}
          </span>
        </div>
      </div>

      <div className="bg-base rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse"></div>
          )}
          <Image
            src={college.image}
            alt={college.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Rating Overlay */}
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center space-x-1 bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-foreground">
                {college.rating}
              </span>
            </div>
          </div>

          {/* Established Year */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-foreground">
                Est. {college.established}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {college.name}
          </h3>

          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{college.location}</span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">
                {college?.students?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-foreground font-medium">
                {new Date(college.admissionDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Research Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-primary">
                Research Papers: {college.researchHistory}+
              </span>
            </div>
          </div>

          {/* Events Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Featured Events:
            </h4>
            <div className="flex flex-wrap gap-1">
              {college.events.slice(0, 2).map((event, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-muted text-foreground px-2 py-1 rounded-md"
                >
                  {event}
                </span>
              ))}
              {college.events.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{college.events.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Sports Preview */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Sports:
            </h4>
            <div className="flex flex-wrap gap-1">
              {college.sports.slice(0, 3).map((sport, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md"
                >
                  {sport}
                </span>
              ))}
              {college.sports.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{college.sports.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto pt-4 border-t border-border">
            <button className="w-full bg-primary text-primary-content py-2 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
