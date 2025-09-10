import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { EventCard } from '../components/EventCard';
import { QRCodeModal } from '../components/QRCodeModal';
import { MOCK_EVENTS, MOCK_REGISTRATIONS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Calendar, QrCode } from 'lucide-react';
import { Event, Registration } from '../types';

export function StudentDashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [events] = useState(MOCK_EVENTS.filter(e => e.status === 'approved'));
  const [registrations, setRegistrations] = useState(MOCK_REGISTRATIONS);
  const [selectedQR, setSelectedQR] = useState<{ eventTitle: string; qrData: string } | null>(null);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event || !user) return;

    const newRegistration: Registration = {
      id: Date.now().toString(),
      userId: user.id,
      eventId,
      registeredAt: new Date().toISOString(),
      qrCode: `EVENT_${eventId}_USER_${user.id}_${Date.now()}`,
    };

    setRegistrations(prev => [...prev, newRegistration]);
    
    // Show QR code immediately after registration
    setSelectedQR({
      eventTitle: event.title,
      qrData: newRegistration.qrCode,
    });
  };

  const showQRCode = (eventId: string) => {
    const registration = registrations.find(r => r.eventId === eventId && r.userId === user?.id);
    const event = events.find(e => e.id === eventId);
    
    if (registration && event) {
      setSelectedQR({
        eventTitle: event.title,
        qrData: registration.qrCode,
      });
    }
  };

  const isRegistered = (eventId: string) => {
    return registrations.some(r => r.eventId === eventId && r.userId === user?.id);
  };

  const categories = ['Technology', 'Career', 'Environment', 'Arts'];

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100">
            Discover and register for exciting campus events. Your registered events will generate QR codes for easy check-in.
          </p>
        </div>

        {/* My Registrations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <QrCode className="w-5 h-5 mr-2 text-blue-600" />
            My Registered Events
          </h2>
          
          {registrations.filter(r => r.userId === user?.id).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registrations
                .filter(r => r.userId === user?.id)
                .map(registration => {
                  const event = events.find(e => e.id === registration.eventId);
                  if (!event) return null;
                  
                  return (
                    <div key={registration.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{event.location}</p>
                      <button
                        onClick={() => showQRCode(event.id)}
                        className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Show QR Code</span>
                      </button>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No registered events yet. Browse events below to get started!</p>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[160px]"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Events</h2>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                  isRegistered={isRegistered(event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search or filters to find more events.</p>
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        <QRCodeModal
          isOpen={!!selectedQR}
          onClose={() => setSelectedQR(null)}
          eventTitle={selectedQR?.eventTitle || ''}
          qrData={selectedQR?.qrData || ''}
        />
      </div>
    </Layout>
  );
}