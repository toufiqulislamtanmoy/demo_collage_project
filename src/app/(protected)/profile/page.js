"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/utils/axiosClient";
import Loader from "@/components/Common/Loader";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  BookOpen,
  GraduationCap,
  Award,
  Settings,
  Globe,
  Building,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

const UserProfilePage = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  // Fetch user profile
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["USER_PROFILE"],
    queryFn: async () => {
      const res = await axiosClient.get("/auth/me");
      if (res?.data?.status === "success") return res.data.data;
      throw new Error(res?.data?.reason || "Failed to fetch profile");
    },
    onSuccess: (data) => {
      // Populate form with user data
      reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        university: data.university || "",
        bio: data.bio || "",
      });
      if (data.photo) setPreviewImage(data.photo);
    },
  });

  // Update profile mutation
  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosClient.put("/auth/update-profile", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["USER_PROFILE"]);
      setIsEditing(false);
      alert("Profile updated successfully!");
    },
    onError: (err) => {
      alert(err?.response?.data?.reason || "Failed to update profile");
    },
  });

  // Upload avatar mutation (only for non-Google users)
  const { mutate: uploadAvatar, isLoading: isUploading } = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosClient.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      // Update profile with new avatar URL
      updateProfile({ photo: data.data.url });
    },
    onError: (err) => {
      setUploadError(err?.response?.data?.reason || "Failed to upload image");
    },
  });

  const handleImageChange = async (e) => {
    // If user is from Google, show message
    if (user?.provider === "google") {
      alert(
        "Google account users cannot change profile picture here. Please update your Google account profile."
      );
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      return;
    }
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

    // Upload image
    uploadAvatar(file);
  };

  const onSubmit = (data) => {
    // Don't allow email update for Google users
    if (user?.provider === "google") {
      delete data.email;
    }
    updateProfile(data);
  };

  const handleCancel = () => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      university: user?.university || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
    setUploadError("");
  };

  const isGoogleUser = user?.provider === "google";

  if (isLoading) {
    return <Loader size="large" fullScreen text="Loading your profile..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">
            Error Loading Profile
          </div>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <User className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              USER PROFILE
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card */}
            <div className="bg-base rounded-2xl shadow-lg border border-border p-6 text-center">
              <div className="relative inline-block">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                  <Image
                    src={previewImage || user?.photo || "/default-avatar.jpg"}
                    alt={user?.name}
                    fill
                    className="object-cover"
                  />
                  {isEditing && !isGoogleUser && (
                    <label className="absolute inset-0 bg-foreground/50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity rounded-full">
                      <Camera className="w-6 h-6 text-primary-content" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 rounded-full">
                    <div className="w-6 h-6 border-2 border-primary-content border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">
                {user?.name}
              </h2>
              <p className="text-muted-foreground mb-3">{user?.email}</p>

              {/* Google Badge */}
              {isGoogleUser && (
                <div className="inline-flex items-center space-x-1 bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-sm mb-4">
                  <Globe className="w-3 h-3" />
                  <span>Google Account</span>
                </div>
              )}

              {uploadError && (
                <p className="text-red-500 text-sm mb-4">{uploadError}</p>
              )}

              {/* Edit Button */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isUpdating}
                    className="flex-1 py-2 bg-primary text-primary-content rounded-lg font-semibold hover:bg-primary-focus disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    {isUpdating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-content border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Account Information */}
            <div className="bg-base rounded-2xl shadow-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Account Info</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium text-foreground">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Account Type</span>
                  <span className="font-medium text-foreground capitalize">
                    {user?.provider || "Email"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Email Verified</span>
                  <span
                    className={`font-medium ${
                      user?.isEmailVerified
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {user?.isEmailVerified ? (
                      <CheckCircle className="w-4 h-4 inline" />
                    ) : (
                      "Pending"
                    )}
                  </span>
                </div>
              </div>

              {/* Google Account Note */}
              {isGoogleUser && (
                <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                  <p className="text-xs text-blue-600">
                    Your profile picture and email are managed through your
                    Google account.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="lg:col-span-2">
            <div className="bg-base rounded-2xl shadow-lg border border-border overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-primary" />
                  <span>Personal Information</span>
                </h2>
                <p className="text-muted-foreground mt-1">
                  {isEditing
                    ? "Update your personal details"
                    : "Your profile information"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <User className="w-4 h-4 text-primary" />
                      <span>Full Name</span>
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="px-4 py-3 text-foreground bg-muted/30 rounded-xl">
                        {user?.name || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>Email Address</span>
                      {isGoogleUser && (
                        <span className="text-xs text-blue-600 bg-blue-500/10 px-2 py-1 rounded">
                          Google
                        </span>
                      )}
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+\.\S+$/,
                              message: "Enter a valid email address",
                            },
                          })}
                          disabled={isGoogleUser}
                          className={`w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                            isGoogleUser ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        />
                        {isGoogleUser && (
                          <p className="text-xs text-blue-600 mt-1">
                            Email cannot be changed for Google accounts
                          </p>
                        )}
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-xl">
                        <p className="text-foreground">{user?.email}</p>
                        {isGoogleUser && (
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* University */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <Building className="w-4 h-4 text-secondary" />
                      <span>University</span>
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          {...register("university")}
                          placeholder="Enter your university"
                          className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        />
                      </>
                    ) : (
                      <p className="px-4 py-3 text-foreground bg-muted/30 rounded-xl">
                        {user?.university || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span>Phone Number</span>
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="tel"
                          {...register("phone", {
                            pattern: {
                              value: /^[+]?[\d\s-()]{10,}$/,
                              message: "Enter a valid phone number",
                            },
                          })}
                          className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="px-4 py-3 text-foreground bg-muted/30 rounded-xl">
                        {user?.phone || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address - Full Width */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Address</span>
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        {...register("address")}
                        placeholder="Enter your address"
                        className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </>
                  ) : (
                    <p className="px-4 py-3 text-foreground bg-muted/30 rounded-xl">
                      {user?.address || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Bio - Full Width */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
                    <BookOpen className="w-4 h-4 text-secondary" />
                    <span>Bio</span>
                  </label>
                  {isEditing ? (
                    <>
                      <textarea
                        {...register("bio")}
                        rows={3}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-3 border border-border rounded-xl bg-base focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                      />
                    </>
                  ) : (
                    <p className="px-4 py-3 text-foreground bg-muted/30 rounded-xl">
                      {user?.bio || "No bio added yet"}
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Security Section */}
            {!isGoogleUser && (
              <div className="bg-base rounded-2xl shadow-lg border border-border mt-6 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
                  <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-primary" />
                    <span>Security</span>
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Manage your account security
                  </p>
                </div>
                <div className="p-6">
                  <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;