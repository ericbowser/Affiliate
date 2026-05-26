import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div className="text-6xl mb-6">🪨</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Nothing Found Here</h1>
      <p className="text-gray-500 mb-8">
        Looks like you wandered off the trail. This page doesn't exist — try heading back to the main dig site.
      </p>
      <Link
        to="/"
        className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
