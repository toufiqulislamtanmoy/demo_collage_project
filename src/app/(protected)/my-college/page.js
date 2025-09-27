"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/utils/axiosClient";
import Loader from "@/components/Common/Loader";
import ContentNotFound from "@/components/Common/ContentNotFound";
import {
  Star,
  MapPin,
  Users,
  BookOpen,
  Calendar,
  Send,
  GraduationCap,
  FileText,
  CheckCircle,
  Edit3,
  User,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const MyCollege = () => {
  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeCollege, setActiveCollege] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch my admissions
  const {
    data: admissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["MY_ADMISSIONS"],
    queryFn: async () => {
      const res = await axiosClient.get("/admission/my-college");
      if (res?.data?.status === "success") return res.data.data;
      throw new Error(res?.data?.reason || "Failed to fetch admissions");
    },
  });

  // Mutation to add review
  const { mutate: addReview, isLoading: isSubmitting } = useMutation({
    mutationFn: async ({ collegeId, review, rating }) => {
      const res = await axiosClient.post(`/reviews/create`, {
        college: collegeId,
        review,
        rating,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["MY_ADMISSIONS"]);
      setReviewText("");
      setRating(0);
      setActiveCollege(null);
      alert("Review submitted successfully!");
    },
    onError: (err) => {
      alert(err?.response?.data?.reason || "Failed to add review");
    },
  });

  if (isLoading) {
    return <Loader size="large" fullScreen text="Loading your colleges..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">
            Error Loading Colleges
          </div>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!admissions?.length) {
    return (
      <ContentNotFound
        title="No College Applications"
        message="You haven't applied to any colleges yet. Start your educational journey by applying to your dream colleges."
        type="college"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              MY COLLEGES
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              College Applications
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your college applications and share your experiences with
            future students.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {admissions?.map((admission) => {
            const college = admission.college;
            const isReviewActive = activeCollege === college._id;

            return (
              <div
                key={admission._id}
                className="group bg-base rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* College Header with Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={college?.image || "/default-college.jpg"}
                    alt={college?.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-foreground">
                        {college?.rating}
                      </span>
                    </div>
                  </div>

                  {/* College Name Overlay */}
                  <div className="absolute bottom-4 left-4 text-primary-content">
                    <h2 className="text-xl font-bold line-clamp-1">
                      {college?.name}
                    </h2>
                  </div>
                </div>

                {/* Admission Details */}
                <div className="p-6 space-y-4">
                  {/* Application Status */}
                  <div className="flex items-center justify-between">
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                      Application Submitted
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(admission.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* College Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {college?.location}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-sm">
                      <BookOpen className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Applied for:{" "}
                        <span className="font-medium text-foreground">
                          {admission?.subject}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-sm">
                      <User className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">
                        DOB:{" "}
                        <span className="font-medium text-foreground">
                          {new Date(admission?.dob).toLocaleDateString()}
                        </span>
                      </span>
                    </div>

                    {college?.totalStudent && (
                      <div className="flex items-center space-x-3 text-sm">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {college.totalStudent.toLocaleString()} students
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Section */}
                <div className="p-6 border-t border-border bg-muted/10">
                  {isReviewActive ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center space-x-2">
                        <Edit3 className="w-4 h-4 text-primary" />
                        <span>Write Your Review</span>
                      </h3>

                      {/* Star Rating */}
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-6 h-6 cursor-pointer ${
                                (hoverRating || rating) >= star
                                  ? "text-yellow-500 fill-current"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      {/* Review Textarea */}
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience with this college... What did you like? What could be improved?"
                        rows={3}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                        required
                      />

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setActiveCollege(null);
                            setReviewText("");
                            setRating(0);
                          }}
                          className="flex-1 px-4 py-2 border border-border text-foreground rounded-xl hover:bg-muted transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            addReview({
                              collegeId: college._id,
                              review: reviewText,
                              rating,
                            })
                          }
                          disabled={
                            isSubmitting || !rating || !reviewText.trim()
                          }
                          className="flex-1 px-4 py-2 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary-content border-t-transparent rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Review</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveCollege(college._id)}
                      className="w-full py-3 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary/20 transition-colors flex items-center justify-center space-x-2 group/review"
                    >
                      <Edit3 className="w-4 h-4 group-hover/review:scale-110 transition-transform" />
                      <span>Share Your Experience</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <div className="bg-base/50 border border-border rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium text-foreground">
                {admissions.length} College Applications
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your educational journey starts here. Share your experiences to
              help other students make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCollege;
