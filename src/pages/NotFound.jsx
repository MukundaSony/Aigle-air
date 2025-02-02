import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#f7fafc]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1a202c] mb-4">404 - Page Not Found</h1>
        <p className="text-[#718096] mb-8">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="bg-aigle-primary text-white px-6 py-3 rounded-lg hover:bg-[#2f855a] transition-colors"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;