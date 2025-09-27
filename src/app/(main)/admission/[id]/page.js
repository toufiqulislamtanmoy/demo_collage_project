"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/utils/axiosClient";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Common/Loader";
import {
  ArrowLeft,
  Upload,
  Calendar,
  MapPin,
  Star,
  User,
  Mail,
  Phone,
  Home,
  BookOpen,
  Send,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { uploadImage } from "@/lib/utils";

const AdmissionFormPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("session", session);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  // Fetch college details
  const {
    data: college,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["COLLEGE_DETAILS", id],
    queryFn: async () => {
      const res = await axiosClient.get(`/universities/${id}`);
      if (res?.data?.status === "success") return res.data.data;
      throw new Error(res?.data?.reason || "Failed to fetch college");
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image size should be less than 2MB");
      return;
    }

    setUploadError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image to backend
    try {
      const photo = await uploadImage(file);
      if (photo?.status === "success") {
        setValue("image", photo?.uploaded_url);
      } else {
        throw new Error(photo?.reason || "Failed to upload image");
      }
    } catch (err) {
      setUploadError(err.response?.data?.reason || "Failed to upload image");
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    if (!data.image) {
      setUploadError("Please upload a passport photo");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...data,
        college: id,
        submitted_by: session?.user?.email,
      };
      console.log("submissionData", submissionData);
      const res = await axiosClient.post("/admission/create", submissionData);

      alert(res.data.message || "Admission submitted successfully!");
      router.push("/admission");
    } catch (err) {
      alert(err?.response?.data?.reason || "Failed to submit admission");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader size="large" fullScreen text="Loading college details..." />;
  }

    if (error) {
    throw new Error(error.message || "Failed to fetch college details");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <button
            onClick={() => router.push("/admission")}
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-focus mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Colleges</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Admission Application
          </h1>
          <p className="text-xl text-muted-foreground">
            Apply to {college?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* College Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base rounded-2xl shadow-lg border border-border p-6 sticky top-6">
              {/* College Image */}
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={college?.image || "/default-college.jpg"}
                  alt={college?.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-foreground">
                      {college?.rating}
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                {college?.name}
              </h2>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm">{college?.location}</span>
                </div>

                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="text-sm">
                    Admission:{" "}
                    {new Date(college?.admissionStart).toLocaleDateString()} -{" "}
                    {new Date(college?.admissionEnd).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-muted-foreground">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span className="text-sm">
                    {college?.researchPapers?.length || 0} Research Papers
                  </span>
                </div>
              </div>

              {/* Application Tips */}
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Application Tips</span>
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Ensure all information is accurate</li>
                  <li>• Upload a clear passport photo</li>
                  <li>• Double-check contact details</li>
                  <li>• Submit before the deadline</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-base rounded-2xl shadow-lg border border-border overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                  <User className="w-6 h-6 text-primary" />
                  <span>Personal Information</span>
                </h2>
                <p className="text-muted-foreground mt-1">
                  Fill in your details carefully
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Candidate Name */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <User className="w-4 h-4 text-primary" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      {...register("candidateName", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      placeholder="Enter your full name"
                      defaultValue={session?.user?.name}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    {errors.candidateName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.candidateName.message}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <BookOpen className="w-4 h-4 text-secondary" />
                      <span>Desired Subject *</span>
                    </label>
                    <input
                      type="text"
                      {...register("subject", {
                        required: "Subject is required",
                        minLength: {
                          value: 2,
                          message: "Subject must be at least 2 characters",
                        },
                      })}
                      placeholder="Enter your desired subject"
                      className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      placeholder="your.email@example.com"
                      defaultValue={session?.user?.email}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+]?[\d\s-()]{10,}$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                      placeholder="+880 123-4567"
                      className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>Date of Birth *</span>
                    </label>
                    <input
                      type="date"
                      {...register("dob", {
                        required: "Date of birth is required",
                        validate: {
                          futureDate: (value) => {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            return (
                              selectedDate <= today ||
                              "Date cannot be in the future"
                            );
                          },
                        },
                      })}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dob.message}
                      </p>
                    )}
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <Upload className="w-4 h-4 text-primary" />
                      <span>Passport Photo *</span>
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-4 transition-colors ${
                        uploadError
                          ? "border-red-300"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer block"
                      >
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload passport photo
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, JPEG up to 2MB
                          </p>
                        </div>
                      </label>
                    </div>
                    {previewImage && (
                      <div className="mt-2">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                        <p className="text-green-600 text-sm mt-1">
                          ✓ Photo uploaded successfully
                        </p>
                      </div>
                    )}
                    {uploadError && (
                      <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                    )}
                    <input
                      type="hidden"
                      {...register("image", { required: "Photo is required" })}
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address - Full Width */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                    <Home className="w-4 h-4 text-primary" />
                    <span>Full Address *</span>
                  </label>
                  <input
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 10,
                        message: "Address must be at least 10 characters",
                      },
                    })}
                    placeholder="Enter your complete address"
                    className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={() => router.push("/admission")}
                    className="flex items-center space-x-2 px-6 py-3 border border-border text-foreground rounded-xl hover:bg-muted transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Colleges</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-8 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-content border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionFormPage;
