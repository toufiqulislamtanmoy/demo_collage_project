"use client";
import { useEffect, useState } from "react";

export default function Loader({ 
  size = "medium", // small, medium, large
  color = "primary", // primary, secondary, accent, white
  text = "Loading...",
  showText = true,
  fullScreen = false 
}) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    white: "text-white"
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  const spinnerColor = colorClasses[color] || colorClasses.primary;

  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className={`${spinnerSize} relative`}>
        <div className={`absolute inset-0 rounded-full border-2 border-current opacity-20`}></div>
        <div className={`absolute inset-0 rounded-full border-2 border-current border-t-transparent animate-spin`}></div>
      </div>
      
      {/* Text */}
      {showText && (
        <p className={`mt-3 text-sm font-medium ${colorClasses[color]} flex items-center`}>
          {text}
          <span className="inline-block w-4 text-left">{dots}</span>
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <LoaderContent />
      </div>
    );
  }

  return <LoaderContent />;
}