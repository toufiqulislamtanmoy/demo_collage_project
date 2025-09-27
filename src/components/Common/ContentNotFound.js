"use client";
import Link from "next/link";
import { FileSearch, Home, ArrowLeft } from "lucide-react";

export default function ContentNotFound({ 
  title = "Content Not Found",
  message = "The content you're looking for doesn't exist or may have been moved.",
  showBackButton = true
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-md w-full">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
            <FileSearch className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-3">
          {title}
        </h1>

        {/* Message */}
        <p className="text-muted-foreground mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          )}
          
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-content rounded-lg font-medium hover:bg-primary-focus transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}