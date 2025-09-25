"use client";

import { useState } from "react";
import axios from "axios";
import axiosClient from "@/utils/axiosClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axiosClient.post("/auth/forgot-password", { email });
      if (res?.data?.status === "Success") {
        router.push(res.data?.data?.resetLink);
      }
      setMessage(res.data?.data?.message || "Reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.reason || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <p className="mb-4 text-gray-600 text-center">
          Enter your email address and we will send you a password reset link.
        </p>

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <div>
            <p className="mt-4 text-green-600 text-center font-medium">
              {message}
            </p>
            {resetLink && (
              <Link href={resetLink} className="mt-2 text-gray-600 text-center">
                {resetLink}
              </Link>
            )}
          </div>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
        )}
      </form>
    </div>
  );
}
