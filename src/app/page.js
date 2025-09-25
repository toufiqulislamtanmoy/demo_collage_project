"use client";

import React from "react";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-10 py-6 text-2xl font-bold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
