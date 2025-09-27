"use client";

import CollegeCard from "@/components/Common/CollegeCard";
import ContentNotFound from "@/components/Common/ContentNotFound";
import Loader from "@/components/Common/Loader";
import axiosClient from "@/utils/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search, Calendar, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

const AdmissionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const {
    data: collegeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ADMISSION_COLLEGE_DATA"], // Changed query key
    queryFn: async () => {
      const res = await axiosClient.get("/universities/admission/active");
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
        case "admission": // New sort option for admission dates
          return new Date(a.admissionStart) - new Date(b.admissionStart);
        default:
          return a.name?.localeCompare(b.name);
      }
    });

  if (isLoading) {
    return (
      <Loader
        size="large"
        fullScreen={true}
        text="Loading colleges with active admission..."
      />
    );
  }

  if (error) {
    throw new Error(error.message || "Failed to fetch colleges");
  }

  if (!collegeData?.data?.length) {
    return (
      <ContentNotFound
        title="No Active Admissions"
        message="There are currently no colleges with active admission processes."
        type="college"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/20">
      {/* Header Section - for Admission Focus */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/20 p-3 rounded-2xl">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Active{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Admissions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover colleges with ongoing admission processes. Apply now before
            deadlines close!
          </p>

          {/* Admission Status Banner */}
          <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Clock className="w-5 h-5" />
              <span className="font-medium">
                {filteredColleges.length} colleges accepting applications
              </span>
            </div>
          </div>
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
                  placeholder="Search colleges with active admission..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Sort Filter - options */}
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
                <option value="admission">Sort by Admission Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count - message */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredColleges.length}
            </span>{" "}
            colleges with active admission
            {searchTerm && (
              <>
                {" "}
                matching "
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
            <CollegeCard
              key={college._id}
              college={college}
              redirect_for={"admission"}
              showAdmissionStatus={true}
            />
          ))}
        </div>

        {/* No Results State - message */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No active admissions found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or check back later for new
                admission openings.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionPage;
