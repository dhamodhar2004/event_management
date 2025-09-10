import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Award, MapPin, Clock, ArrowRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { MOCK_EVENTS } from '../data/mockData';

export function LandingPage() {
  const upcomingEvents = MOCK_EVENTS.filter(event => event.status === 'approved').slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to Smart Campus Events
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover, register, and manage campus events all in one place. Connect with your community and never miss an opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                View Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 border-2 border-blue-500"
              >
                Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these exciting campus events. Register now to secure your spot!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <Link
                    to="/auth"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center block font-medium"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Platform */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Your Campus Event Hub
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Smart Campus Events is the ultimate platform for discovering, managing, and participating in campus activities. Whether you're a student looking for exciting events or an organizer planning the next big gathering, we've got you covered.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Easy Event Discovery</h3>
                    <p className="text-gray-600">Find events that match your interests with our intuitive search and filtering system.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Seamless Registration</h3>
                    <p className="text-gray-600">Register for events with just a click and get instant QR codes for easy check-in.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Event Management</h3>
                    <p className="text-gray-600">Organizers can create, manage, and track their events with powerful administrative tools.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Events Hosted</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Organizations</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Login Buttons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quick Access by Role
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose your role to get started with the right dashboard and features.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              to="/auth?role=student"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 group"
            >
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Login</h3>
              <p className="text-gray-600">Discover and register for campus events</p>
            </Link>
            <Link
              to="/auth?role=organizer"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 group"
            >
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Organizer Login</h3>
              <p className="text-gray-600">Create and manage your events</p>
            </Link>
            <Link
              to="/auth?role=admin"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 group"
            >
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Login</h3>
              <p className="text-gray-600">Oversee platform operations</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart Campus Events</h3>
              <p className="text-gray-300 mb-4">
                Connecting students and organizers through seamless event management.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-2 text-gray-300">
                <p>Smart University Campus</p>
                <p>123 Education Drive</p>
                <p>Campus City, CC 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: events@smartcampus.edu</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/auth" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Login / Sign Up
                </Link>
                <Link to="/events" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Browse Events
                </Link>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Help & Support
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Smart Campus Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}