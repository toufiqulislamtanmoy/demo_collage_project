"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/utils/axiosClient";
import Loader from "@/components/Common/Loader";
import ContentNotFound from "@/components/Common/ContentNotFound";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Star,
  Users,
  BookOpen,
  Trophy,
  FileText,
  Camera,
  ArrowRight,
  GraduationCap,
  Clock,
  Download,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import moment from "moment";

const CollegeDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch college details
  const {
    data: college,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["COLLEGE_DETAILS", id],
    queryFn: async () => {
      const res = await axiosClient.get(`/universities/${id}`);
      if (res?.data?.status === "success") {
        return res.data.data;
      } else throw { ...res, message: res.data?.reason || "Request failed!" };
    },
  });

  if (isLoading) {
    return (
      <Loader
        size="large"
        fullScreen={true}
        text="Loading college details..."
      />
    );
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!college) {
    return (
      <ContentNotFound
        title="College Not Found"
        message="The college you're looking for doesn't exist."
      />
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "events", label: "Events", icon: Calendar },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "research", label: "Research", icon: FileText },
    { id: "gallery", label: "Gallery", icon: Camera },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return <EventsTab events={college.events} />;
      case "sports":
        return <SportsTab sports={college.sports} />;
      case "research":
        return <ResearchTab researchPapers={college.researchPapers} />;
      case "gallery":
        return <GalleryTab photos={college.photos} />;
      default:
        return <OverviewTab college={college} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/20">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={college.image || "/default-college.jpg"}
          alt={college.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="text-primary-content">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {college.name}
            </h1>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{college.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{college.rating} Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-16 relative z-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-base rounded-2xl shadow-lg border border-border p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              Admission Open
            </div>
            {moment().isBetween(
              college?.admissionStart,
              college?.admissionEnd,
              "day",
              "[]"
            ) ? (
              <div className="text-sm text-muted-foreground">
                {moment(college.admissionStart).format("Do MMMM YYYY")} -{" "}
                {moment(college.admissionEnd).format("Do MMMM YYYY")}
              </div>
            ) : (
              <span className="text-red-500 font-semibold">Closed</span>
            )}
          </div>

          <div className="bg-base rounded-2xl shadow-lg border border-border p-6 text-center">
            <FileText className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {college.researchPapers?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">Research Papers</div>
          </div>

          <div className="bg-base rounded-2xl shadow-lg border border-border p-6 text-center">
            <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {college.sports?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Sports Facilities
            </div>
          </div>

          <div className="bg-base rounded-2xl shadow-lg border border-border p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {college.events?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming Events</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-base rounded-2xl shadow-lg border border-border mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary text-primary font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

// Tab Components
const OverviewTab = ({ college }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-4">About</h3>
      <p className="text-muted-foreground leading-relaxed">{college.about}</p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Admission Process
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {college.admissionProcess}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-semibold text-foreground mb-2">
          Admission Timeline
        </h4>
        {moment().isBetween(
          college?.admissionStart,
          college?.admissionEnd,
          "day",
          "[]"
        ) ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Starts:</span>
              <span className="font-medium">
                {moment(college.admissionStart).format("Do MMMM YYYY")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ends:</span>
              <span className="font-medium">
                {moment(college.admissionEnd).format("Do MMMM YYYY")}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-red-500 font-semibold">Closed</span>
        )}
      </div>

      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-semibold text-foreground mb-2">Quick Facts</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Established:</span>
            <span className="font-medium">
              {new Date(college.createdAt).getFullYear()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{college.location}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EventsTab = ({ events }) => (
  <div>
    {events?.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-muted/30 rounded-xl p-6 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">
                {event.title}
              </h3>
              <div className="flex items-center space-x-1 text-primary">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {moment(event.date).format("Do MMMM YYYY")}
                </span>
              </div>
            </div>
            {event.description && (
              <p className="text-muted-foreground text-sm">
                {event.description}
              </p>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No upcoming events scheduled.</p>
      </div>
    )}
  </div>
);

const SportsTab = ({ sports }) => (
  <div>
    {sports?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sports.map((sport) => (
          <div
            key={sport._id}
            className="bg-muted/30 rounded-xl p-4 text-center hover:bg-muted/50 transition-colors"
          >
            <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground">{sport.name}</h3>
            {sport.description && (
              <p className="text-muted-foreground text-sm mt-1">
                {sport.description}
              </p>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          No sports facilities information available.
        </p>
      </div>
    )}
  </div>
);

const ResearchTab = ({ researchPapers }) => (
  <div>
    {researchPapers?.length > 0 ? (
      <div className="space-y-4">
        {researchPapers.map((paper) => (
          <div
            key={paper._id}
            className="bg-muted/30 rounded-xl p-6 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">
                {paper.title}
              </h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {paper.category}
              </span>
            </div>

            <p className="text-muted-foreground mb-4">{paper.abstract}</p>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>By {paper.authors?.join(", ")}</span>
                <span>•</span>
                <span>{paper.totalPages} pages</span>
                <span>•</span>
                <span>{paper.totalDownloads} downloads</span>
              </div>

              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary hover:text-primary-focus"
              >
                <span>Read Paper</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No research papers available.</p>
      </div>
    )}
  </div>
);

const GalleryTab = ({ photos }) => (
  <div>
    {photos?.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="group relative rounded-xl overflow-hidden"
          >
            <Image
              src={photo.image}
              alt={photo.caption}
              width={300}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-primary-content text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          No photos available in the gallery.
        </p>
      </div>
    )}
  </div>
);

export default CollegeDetails;
