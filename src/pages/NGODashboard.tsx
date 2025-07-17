import React, { useState } from 'react';
import { Bell, MapPin, Clock, Filter, CheckCircle, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import FoodListingCard from '../components/FoodListingCard';
import NotificationPanel from '../components/NotificationPanel';

export default function NGODashboard() {
  const { user } = useAuth();
  const { notifications } = useNotification();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const [foodListings] = useState([
    {
      id: '1',
      eventName: 'Annual Charity Gala',
      foodType: 'Prepared Meals',
      quantity: '50 portions',
      location: 'Grand Hotel, Downtown',
      address: '123 Main St, City Center',
      contactName: 'Sarah Johnson',
      contactPhone: '+1 (555) 123-4567',
      description: 'Gourmet dinner leftovers including vegetarian options',
      expiryTime: '2024-12-20T22:00:00Z',
      status: 'available',
      createdAt: '2024-12-20T18:00:00Z',
      distance: '2.3 km away'
    },
    {
      id: '2',
      eventName: 'Corporate Conference',
      foodType: 'Packaged Snacks',
      quantity: '200 items',
      location: 'Business Center',
      address: '456 Oak Ave, Business District',
      contactName: 'Mike Chen',
      contactPhone: '+1 (555) 987-6543',
      description: 'Unopened snack boxes and beverages',
      expiryTime: '2024-12-25T20:00:00Z',
      status: 'available',
      createdAt: '2024-12-19T14:30:00Z',
      distance: '5.1 km away'
    },
    {
      id: '3',
      eventName: 'Wedding Reception',
      foodType: 'Prepared Meals',
      quantity: '80 portions',
      location: 'Sunset Venue',
      address: '789 Garden Lane, Suburbs',
      contactName: 'Emma Wilson',
      contactPhone: '+1 (555) 456-7890',
      description: 'Fresh wedding dinner with vegetarian and non-vegetarian options',
      expiryTime: '2024-12-21T20:00:00Z',
      status: 'available',
      createdAt: '2024-12-20T16:00:00Z',
      distance: '3.7 km away'
    }
  ]);

  const filteredListings = foodListings.filter(listing => {
    if (selectedFilter === 'all') return true;
    return listing.foodType.toLowerCase().includes(selectedFilter);
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {user?.name}
              </h1>
              <p className="text-gray-600">
                Discover available food donations in your area
              </p>
            </div>
            <button
              onClick={() => setShowNotifications(true)}
              className="relative bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bell className="h-6 w-6 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3 mr-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{foodListings.length}</p>
                <p className="text-gray-600">Available Listings</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-gray-600">Collections This Month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2.1 km</p>
                <p className="text-gray-600">Average Distance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filter by food type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'prepared', 'packaged', 'fresh'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Food Listings */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            Available Food Donations ({filteredListings.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <FoodListingCard key={listing.id} listing={listing} isNGO={true} />
            ))}
          </div>
        </div>

        {/* Notification Panel */}
        <NotificationPanel
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>
    </div>
  );
}