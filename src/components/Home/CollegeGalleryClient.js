"use client";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Users, ExternalLink, Heart, Share2 } from "lucide-react";

export default function CollegeGalleryClient({ galleryItems }) {
  
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // 🔹 Group by university
  const groupedByUniversity = galleryItems.reduce((acc, item) => {
    const uniId = item.university._id;
    if (!acc[uniId]) {
      acc[uniId] = {
        id: uniId,
        name: item.university.name,
        photos: [],
      };
    }
    acc[uniId].photos.push({
      url: item.image,
      caption: item.caption,
      type: item.type,
      createdAt: item.createdAt,
    });
    return acc;
  }, {});

  const colleges = Object.values(groupedByUniversity);

  // 🔹 Flatten all photos with college info
  const allPhotos = colleges.flatMap((college) =>
    college.photos.map((photo) => ({
      ...photo,
      collegeId: college.id,
      collegeName: college.name,
    }))
  );

  // 🔹 Apply filter
  const filteredPhotos =
    selectedCollege === "all"
      ? allPhotos
      : allPhotos.filter((photo) => photo.collegeId === selectedCollege);

  const getImageHeightClass = (url) => {
    // Fallback: random-ish layout, since new API doesn’t return width/height
    return Math.random() > 0.5 ? "row-span-2" : "row-span-1";
  };

  const handleImageLoad = (url) => {
    setLoadedImages((prev) => new Set(prev).add(url));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-base to-muted/30 relative overflow-hidden">
      {/* Header */}
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
          Discover the vibrant campus environments, student life, and facilities
          of top universities worldwide.
        </p>
      </div>

      {/* Tabs */}
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
            onClick={() => setSelectedCollege(college.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCollege === college.id
                ? "bg-primary text-primary-content shadow-lg"
                : "bg-base text-foreground border border-border hover:bg-primary/5"
            }`}
          >
            {college.name}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)] lg:px-10 px-3">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={`${photo.collegeId}-${idx}`}
            className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500  ${!loadedImages.has(photo.url) ? "animate-pulse" : ""}`}
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

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-foreground line-clamp-1">
                    {photo?.collegeName}
                  </span>
                </div>
              </div>

              {/* Hover Info */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 text-primary-content transform transition-transform duration-300 ${
                  hoveredImage === `${photo.collegeId}-${idx}`
                    ? "translate-y-0"
                    : "translate-y-full"
                }`}
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{photo.caption}</h3>
                  {/* You can add more details if API sends them later */}
                </div>

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

              {/* Quick Info */}
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
    </section>
  );
}
