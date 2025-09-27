"use client";
import { ArrowRight, Award, Calendar, MapPin, Star, Users } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";

export default function CollageShowcaseCard({ college, index }) {
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
            src={college?.image}
            alt={college?.name}
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
                Est. {college?.established}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {college?.name}
          </h3>

          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{college?.location}</span>
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
                {moment(college?.admissionStar).format("DD MMM YYYY")} to{" "}
                {moment(college?.admissionEnd).format("DD MMM YYYY")}
              </span>
            </div>
          </div>

          {/* Research Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-primary">
                Research Papers: {college?.researchHistory}+
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
              {college?.events.length > 2 && (
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
              {college?.sports.slice(0, 3).map((sport, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md"
                >
                  {sport}
                </span>
              ))}
              {college?.sports.length > 3 && (
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
