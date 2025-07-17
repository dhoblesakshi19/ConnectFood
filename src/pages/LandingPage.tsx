import React from 'react';
import { ArrowRight, Users, MapPin, Clock, Heart, Truck, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export default function LandingPage({ onAuthClick }: LandingPageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate(user.type === 'organizer' ? '/organizer' : '/ngo');
    } else {
      onAuthClick('register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-30"></div>
                <Heart className="relative h-16 w-16 text-green-600 mx-auto" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect Food
              <span className="text-green-600"> with Purpose</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Bridge the gap between event organizers with surplus food and NGOs serving communities. 
              Every meal saved is a step toward reducing waste and feeding hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onAuthClick('login')}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 border-2 border-green-600 hover:border-green-700"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, efficient, and impactful food sharing in three easy steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-green-100 rounded-2xl p-6 inline-block mb-6 group-hover:bg-green-200 transition-colors">
                <Bell className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Report Surplus Food
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Event organizers quickly report leftover food with details about quantity, type, and location
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 rounded-2xl p-6 inline-block mb-6 group-hover:bg-blue-200 transition-colors">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Notifications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                NGOs receive real-time alerts about available food donations in their area
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-purple-100 rounded-2xl p-6 inline-block mb-6 group-hover:bg-purple-200 transition-colors">
                <Truck className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Coordinate Pickup
              </h3>
              <p className="text-gray-600 leading-relaxed">
                NGOs can locate and collect food efficiently with integrated mapping and communication
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Meals Saved</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">250+</div>
              <div className="text-gray-600">NGO Partners</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Event Organizers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations already making an impact in their communities
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Join the Movement
          </button>
        </div>
      </section>
    </div>
  );
}