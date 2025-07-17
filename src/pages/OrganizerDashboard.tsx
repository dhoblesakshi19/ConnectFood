import React, { useState } from 'react';
import { Plus, Clock, CheckCircle, MapPin, Users, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import FoodReportForm from '../components/FoodReportForm';
import FoodListingCard from '../components/FoodListingCard';

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [foodListings, setFoodListings] = useState([
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
      createdAt: '2024-12-20T18:00:00Z'
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
      status: 'collected',
      createdAt: '2024-12-19T14:30:00Z'
    }
  ]);

  const handleFormSubmit = (formData: any) => {
    const newListing = {
      id: Date.now().toString(),
      ...formData,
      status: 'available',
      createdAt: new Date().toISOString()
    };
    
    setFoodListings(prev => [newListing, ...prev]);
    setIsFormOpen(false);
    
    // Send notification to NGOs
    addNotification({
      id: Date.now().toString(),
      type: 'food_available',
      title: 'New Food Available',
      message: `${formData.quantity} of ${formData.foodType} available at ${formData.location}`,
      timestamp: new Date().toISOString(),
      read: false
    });
  };

  const availableListings = foodListings.filter(listing => listing.status === 'available');
  const collectedListings = foodListings.filter(listing => listing.status === 'collected');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">
            Manage your food donations and help reduce waste in your community
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3 mr-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{availableListings.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{collectedListings.length}</p>
                <p className="text-gray-600">Successfully Collected</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-gray-600">NGOs Helped</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Report Food Available</span>
          </button>
        </div>

        {/* Food Listings */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-600" />
              Available Food ({availableListings.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableListings.map(listing => (
                <FoodListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
              Collected Food ({collectedListings.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collectedListings.map(listing => (
                <FoodListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <FoodReportForm
            onSubmit={handleFormSubmit}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
}