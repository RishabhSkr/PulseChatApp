import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Error404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        
        <div className="animate-bounce mt-4">
          <span className="text-6xl">🤔</span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-bold text-white mt-8">
          Oops! Page Not Found
        </h2>
        
        <p className="text-gray-400 text-lg mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <FaHome className="mr-2" />
          Return Home
        </Link>
        
        <div className="mt-8 text-gray-500">
          Lost? Try checking the URL or navigating from the home page.
        </div>
      </div>
    </div>
  );
}

export default Error404;