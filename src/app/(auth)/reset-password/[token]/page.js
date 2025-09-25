"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import axiosClient from "@/utils/axiosClient";

export default function ResetPasswordPage() {
  const { token } = useParams(); // get token from URL
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosClient.post(`/auth/reset-password/${token}`, {
        password: data.password,
      });

      if (res.data.status === "Success") {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        console.log("res", res);
        setMessage(res?.data?.data?.message || "Failed to reset password. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          {...register("password", { required: "Password is required" })}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm New Password"
          {...register("confirmPassword", {
            required: "Please confirm password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded mt-2 disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && (
          <p className="text-center mt-3 text-sm font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
