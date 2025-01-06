import AppLayout from '../components/layout/AppLayout';
import { FaUserFriends, FaComments, FaCog } from 'react-icons/fa';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-800 text-white p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Welcome to Pulse
        </h1>
        
        <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 px-4">
          Start connecting with friends and family through instant messaging
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gray-700 p-4 sm:p-6 rounded-lg transition-colors">
            <FaUserFriends className="text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4 text-blue-400" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Add Friends</h3>
            <p className="text-xs sm:text-sm text-gray-400">Connect with your contacts</p>
          </div>

          <div className="bg-gray-700 p-4 sm:p-6 rounded-lg transition-colors">
            <FaComments className="text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4 text-green-400" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Start Chat</h3>
            <p className="text-xs sm:text-sm text-gray-400">Begin a new conversation</p>
          </div>

          <div className="bg-gray-700 p-4 sm:p-6 rounded-lg transition-colors sm:col-span-2 md:col-span-1">
            <FaCog className="text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4 text-purple-400" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Settings</h3>
            <p className="text-xs sm:text-sm text-gray-400">Customize your experience</p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 sm:p-6 rounded-lg mx-4 sm:mx-0">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Start Guide</h3>
          <ul className="text-left text-gray-300 space-y-2 text-sm sm:text-base">
            <li className="flex items-center"><span className="mr-2">👥</span> Select a contact from the left sidebar</li>
            <li className="flex items-center"><span className="mr-2">💬</span> Start a new conversation</li>
            <li className="flex items-center"><span className="mr-2">⚙️</span> Customize your profile from the right sidebar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AppLayout()(Home);
