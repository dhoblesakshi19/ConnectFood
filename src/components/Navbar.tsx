import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface NavbarProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const { notifications } = useNotification();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FoodShare Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link 
                  to={user.type === 'organizer' ? '/organizer' : '/ngo'} 
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-700 hover:text-green-600 cursor-pointer" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-gray-700">{user.name}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {user.type}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onAuthClick('login')}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onAuthClick('register')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              <Link to="/" className="block py-2 text-gray-700 hover:text-green-600">
                Home
              </Link>
              {user && (
                <Link 
                  to={user.type === 'organizer' ? '/organizer' : '/ngo'} 
                  className="block py-2 text-gray-700 hover:text-green-600"
                >
                  Dashboard
                </Link>
              )}
              {user ? (
                <div className="pt-2 border-t">
                  <div className="flex items-center space-x-2 py-2">
                    <User className="h-5 w-5 text-gray-700" />
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-gray-700 hover:text-green-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t space-y-2">
                  <button
                    onClick={() => onAuthClick('login')}
                    className="block w-full text-left py-2 text-gray-700 hover:text-green-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onAuthClick('register')}
                    className="block w-full text-left py-2 text-green-600 font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}