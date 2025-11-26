import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ username = "John Doe", onLogout }) => {
  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log('Logging out...');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - App Name */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ContentIQ
            </h1>
          </div>

          {/* Right - User Info and Logout */}
          <div className="flex items-center space-x-4">
            {/* User Avatar and Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-lg">
                  {getInitial(username)}
                </span>
              </div>
              <span className="text-gray-700 font-medium hidden sm:block">
                {username}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;