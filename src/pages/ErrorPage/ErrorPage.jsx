import React from 'react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-yellow-900">404</h1>
        <h2 className="text-2xl font-semibold">Oops! Page Not Found</h2>
        <p className="mt-4 text-lg">The page you’re looking for doesn’t exist or has been moved.</p>

        <div className="mt-6">
          <a href="/" className="btn bg-yellow-900 text-gray-50">Go Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
