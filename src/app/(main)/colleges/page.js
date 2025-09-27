"use client";

import Loader from "@/components/Common/Loader";
import ContentNotFound from "@/components/Common/ContentNotFound";
import axiosClient from "@/utils/axiosClient";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Users,
  Star,
  GraduationCap,
  ArrowRight,
  Filter,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import moment from "moment";

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const {
    data: collegeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["COLLEGE_DATA"],
    queryFn: async () => {
      const res = await axiosClient.get("/universities");
      if (res?.data?.status === "success") {
        return res.data;
      } else throw { ...res, message: res.data?.reason || "Request failed!" };
    },
  });

  // Filter and sort colleges
  const filteredColleges = collegeData?.data
    ?.filter(
      (college) =>
        college.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "research":
          return (b.researches?.length || 0) - (a.researches?.length || 0);
        default:
          return a.name?.localeCompare(b.name);
      }
    });

  if (isLoading) {
    return <Loader size="large" fullScreen={true} text="Loading colleges..." />;
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!collegeData?.data?.length) {
    return (
      <ContentNotFound
        title="No Colleges Found"
        message="There are currently no colleges available in our database."
        type="college"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Colleges
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover top universities and colleges worldwide. Find your perfect
            educational institution.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-base rounded-2xl shadow-lg border border-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search colleges by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-border rounded-lg px-4 py-2 bg-base focus:ring-2 focus:ring-primary focus:border-primary text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="research">Sort by Research</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredColleges.length}
            </span>{" "}
            colleges
            {searchTerm && (
              <>
                {" "}
                for "
                <span className="font-semibold text-foreground">
                  {searchTerm}
                </span>
                "
              </>
            )}
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <CollegeCard key={college._id} college={college} />
          ))}
        </div>

        {/* No Results State */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No colleges found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// College Card Component
function CollegeCard({ college }) {
  return (
    <div className="group bg-base rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={college.image || "/default-college.jpg"}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        {college.rating && (
          <div className="absolute top-4 right-4 bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-foreground">
              {college.rating}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {college.name}
        </h2>

        {/* Location */}
        {college.location && (
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{college.location}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">
              {college.students?.toLocaleString() || "N/A"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap className="w-4 h-4 text-secondary" />
            <span className="text-foreground font-medium">
              {college?.researchPapers?.length || 0} research
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm col-span-2">
            <Calendar className="w-4 h-4 text-secondary" />{" "}
            <strong>Admission:</strong>
            <span className="text-foreground font-medium">
              {moment().isBetween(
                college?.admissionStart,
                college?.admissionEnd,
                "day",
                "[]"
              ) ? (
                <>
                  {moment(college?.admissionStart).format("DD MMM YYYY")} to{" "}
                  {moment(college?.admissionEnd).format("DD MMM YYYY")}
                </>
              ) : (
                <span className="text-red-500 font-semibold">Closed</span>
              )}
            </span>
          </div>
        </div>

        {/* Admission Date */}
        {college.admissionDate && (
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-primary">
                Admission: {college.admissionDate}
              </span>
            </div>
          </div>
        )}

        {/* Description (if available) */}
        {college.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {college.description}
          </p>
        )}

        {/* Action Button */}
        <Link
          href={`/colleges/${college._id}`}
          className="mt-auto flex items-center justify-center space-x-2 bg-primary text-primary-content py-3 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-all duration-300 group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default CollegesPage;
