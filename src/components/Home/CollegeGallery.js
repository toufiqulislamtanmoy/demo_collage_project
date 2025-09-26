"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Users,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";

const colleges = [
  {
    id: 1,
    name: "Oxford University",
    location: "Oxford, UK",
    students: 24500,
    photos: [
      {
        url: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2047,
        height: 1365,
        caption: "Historic Campus Building",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1922,
        height: 1281,
        caption: "Graduation Ceremony",
      },
      {
        url: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Student Library",
      },
    ],
  },
  {
    id: 2,
    name: "Harvard University",
    location: "Cambridge, MA",
    students: 21000,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Campus Grounds",
      },
      {
        url: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Graduate Celebration",
      },
    ],
  },
  {
    id: 3,
    name: "Stanford University",
    location: "Stanford, CA",
    students: 17000,
    photos: [
      {
        url: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2072,
        height: 1381,
        caption: "Modern Campus Architecture",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1691962725045-57ff9e77f0bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1974,
        height: 1316,
        caption: "Research Laboratory",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1663079426406-1b82fed16a79?q=80&w=2115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2115,
        height: 1410,
        caption: "Sports Facility",
      },
      {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Graduation Day",
      },
    ],
  },
];

export default function CollegeGallery() {
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Flatten all photos with college info
  const allPhotos = colleges.flatMap((college) =>
    college.photos.map((photo) => ({
      ...photo,
      collegeId: college.id,
      collegeName: college.name,
      collegeLocation: college.location,
      collegeStudents: college.students,
    }))
  );

  const filteredPhotos =
    selectedCollege === "all"
      ? allPhotos
      : allPhotos.filter(
          (photo) => photo.collegeId === parseInt(selectedCollege)
        );

  const getImageHeightClass = (width, height) => {
    const ratio = height / width;
    if (ratio > 1.4) return "row-span-2";
    if (ratio < 0.7) return "row-span-1";
    return "row-span-1";
  };

  const handleImageLoad = (url) => {
    setLoadedImages((prev) => new Set(prev).add(url));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-base to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">
              CAMPUS GALLERY
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Campus Life
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the vibrant campus environments, student life, and
            beautiful facilities of top universities worldwide.
          </p>
        </div>

        {/* College Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCollege("all")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCollege === "all"
                ? "bg-primary text-primary-content shadow-lg"
                : "bg-base text-foreground border border-border hover:bg-primary/5"
            }`}
          >
            All Colleges
          </button>
          {colleges.map((college) => (
            <button
              key={college.id}
              onClick={() => setSelectedCollege(college.id.toString())}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCollege === college.id.toString()
                  ? "bg-primary text-primary-content shadow-lg"
                  : "bg-base text-foreground border border-border hover:bg-primary/5"
              }`}
            >
              {college.name}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={`${photo.collegeId}-${idx}`}
              className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${getImageHeightClass(
                photo.width,
                photo.height
              )} ${!loadedImages.has(photo.url) ? "animate-pulse" : ""}`}
              onMouseEnter={() => setHoveredImage(`${photo.collegeId}-${idx}`)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                {!loadedImages.has(photo.url) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 z-0"></div>
                )}
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onLoad={() => handleImageLoad(photo.url)}
                  unoptimized
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* College Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-foreground">
                      {photo.collegeName}
                    </span>
                  </div>
                </div>

                {/* Hover Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 text-primary-content transform transition-transform duration-300 ${
                    hoveredImage === `${photo.collegeId}-${idx}`
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{photo.caption}</h3>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{photo.collegeLocation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{photo.collegeStudents.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 mt-4">
                    <button className="p-2 bg-primary/20 rounded-full hover:bg-primary/30 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-primary/20 rounded-full hover:bg-primary/30 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="flex-1 bg-primary text-primary-content py-2 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-colors text-sm flex items-center justify-center space-x-1">
                      <span>View College</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Quick Info (Always Visible) */}
                <div
                  className={`absolute bottom-4 left-4 right-4 transition-opacity duration-300 ${
                    hoveredImage === `${photo.collegeId}-${idx}`
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                >
                  <span className="text-primary-content text-sm font-medium bg-foreground/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    {photo.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Want to See Your College Here?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of colleges showcasing their campus life and
              facilities to prospective students worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Add Your College</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300">
                Contact Admissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
