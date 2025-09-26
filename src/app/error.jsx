"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  ArrowLeft,
  Home,
  AlertTriangle,
  Bug,
  Server,
} from "lucide-react";

export default function Error({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  const handleReset = async () => {
    setIsLoading(true);
    try {
      await reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const errorCode = error?.status || 500;
  const errorMessage = error?.message || "Something unexpected went wrong!";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-base to-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-error/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-error/20 animate-float">
        <AlertTriangle size={40} />
      </div>
      <div className="absolute top-40 right-32 text-primary/20 animate-float delay-1000">
        <Bug size={35} />
      </div>
      <div className="absolute bottom-40 left-32 text-secondary/20 animate-float delay-500">
        <Server size={45} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-error/10 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-error" />
              </div>
              <div className="absolute -inset-4 bg-error/20 rounded-2xl blur-xl animate-ping-slow"></div>
            </div>
          </div>

          {/* Error Code */}
          <div className="relative mb-6">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-error to-primary bg-clip-text text-transparent">
              {errorCode}
              <div className="absolute inset-0 bg-gradient-to-r from-error to-primary bg-clip-text text-transparent opacity-50 animate-ping-slow">
                {errorCode}
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Oops! Something went wrong
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {errorMessage}
          </p>

          {/* Technical Info Box */}
          <div className="bg-base/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-center space-x-2 text-error mb-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Technical Information</span>
            </div>
            <p className="text-foreground/80 text-sm mb-4">
              Our team has been notified about this issue. Please try the
              actions below.
            </p>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-primary hover:text-primary-focus font-medium transition-colors"
            >
              {showDetails ? "Hide" : "Show"} Error Details
            </button>

            {showDetails && (
              <div className="mt-4 p-3 bg-muted rounded-lg text-left">
                <pre className="text-xs text-foreground/60 overflow-auto">
                  {error?.stack || "No stack trace available"}
                </pre>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="group flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-5 h-5 ${
                  isLoading
                    ? "animate-spin"
                    : "group-hover:rotate-180 transition-transform"
                }`}
              />
              <span>{isLoading ? "Refreshing..." : "Try Again"}</span>
            </button>

            <button
              onClick={handleGoBack}
              className="group flex items-center justify-center space-x-2 px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>

            <button
              onClick={handleGoHome}
              className="group flex items-center justify-center space-x-2 px-8 py-4 bg-base border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all duration-300"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Go Home</span>
            </button>
          </div>

          {/* Quick Support Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
            <a
              href="mailto:support@eduportal.com"
              className="p-3 bg-base/50 border border-border rounded-xl hover:bg-primary/5 transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-foreground group-hover:text-primary">
                Email Support
              </span>
            </a>

            <a
              href="/help"
              className="p-3 bg-base/50 border border-border rounded-xl hover:bg-primary/5 transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-foreground group-hover:text-primary">
                Help Center
              </span>
            </a>

            <a
              href="/status"
              className="p-3 bg-base/50 border border-border rounded-xl hover:bg-primary/5 transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-foreground group-hover:text-primary">
                System Status
              </span>
            </a>
          </div>

          {/* Status Message */}
          <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Note:</span> If this
              error persists, please contact our support team with the error
              details.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Corner Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-error/30 rounded-tl-2xl animate-fade-in"></div>
      <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl animate-fade-in"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-secondary/30 rounded-bl-2xl animate-fade-in"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-error/30 rounded-br-2xl animate-fade-in"></div>
    </div>
  );
}
