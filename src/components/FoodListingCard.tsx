import React from 'react';
import { MapPin, Clock, Phone, User, Package, CheckCircle } from 'lucide-react';

interface FoodListing {
  id: string;
  eventName: string;
  foodType: string;
  quantity: string;
  location: string;
  address: string;
  contactName: string;
  contactPhone: string;
  description: string;
  expiryTime: string;
  status: 'available' | 'collected';
  createdAt: string;
  distance?: string;
}

interface FoodListingCardProps {
  listing: FoodListing;
  isNGO?: boolean;
}

export default function FoodListingCard({ listing, isNGO = false }: FoodListingCardProps) {
  const getTimeLeft = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    }
    return `${minutes}m left`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'collected':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCollect = () => {
    // Handle collection logic
    console.log('Collecting food listing:', listing.id);
  };

  const handleViewLocation = () => {
    // Open maps application
    const address = encodeURIComponent(listing.address);
    window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {listing.eventName}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                {listing.status}
              </span>
              {listing.distance && (
                <span className="text-xs text-gray-500">{listing.distance}</span>
              )}
            </div>
          </div>
          <Package className="h-6 w-6 text-green-600" />
        </div>

        {/* Food Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-700">
            <Package className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">{listing.foodType}</span>
            <span className="ml-2">• {listing.quantity}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span>{listing.location}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-orange-600 font-medium">
              {getTimeLeft(listing.expiryTime)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {listing.description}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center text-gray-700">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">{listing.contactName}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span>{listing.contactPhone}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleViewLocation}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <MapPin className="h-4 w-4" />
            <span>View Location</span>
          </button>
          
          {isNGO && listing.status === 'available' && (
            <button
              onClick={handleCollect}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Collect</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}