import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { EventCard } from '../components/EventCard';
import { MOCK_EVENTS } from '../data/mockData';
import { Shield, Calendar, CheckCircle, XCircle, Clock, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { Event } from '../types';

export function AdminPanel() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const pendingEvents = events.filter(e => e.status === 'pending');
  const approvedEvents = events.filter(e => e.status === 'approved');
  const rejectedEvents = events.filter(e => e.status === 'rejected');
  const totalParticipants = events.reduce((sum, event) => sum + event.registeredCount, 0);

  const handleApprove = (eventId: string) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId ? { ...event, status: 'approved' as const } : event
    ));
  };

  const handleReject = (eventId: string) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId ? { ...event, status: 'rejected' as const } : event
    ));
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

  const getFilterCount = (filterType: string) => {
    switch (filterType) {
      case 'pending': return pendingEvents.length;
      case 'approved': return approvedEvents.length;
      case 'rejected': return rejectedEvents.length;
      default: return events.length;
    }
  };

  return (
    <Layout title="Admin Panel">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold mb-2">Admin Control Panel</h1>
              <p className="text-purple-100">
                Manage event approvals, monitor system activity, and oversee campus events.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{events.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingEvents.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            {pendingEvents.length > 0 && (
              <div className="mt-2 flex items-center space-x-1 text-yellow-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Requires attention</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Events</p>
                <p className="text-3xl font-bold text-green-600">{approvedEvents.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-3xl font-bold text-blue-600">{totalParticipants}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Management</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'all', label: 'All Events', icon: Calendar },
              { key: 'pending', label: 'Pending', icon: Clock },
              { key: 'approved', label: 'Approved', icon: CheckCircle },
              { key: 'rejected', label: 'Rejected', icon: XCircle },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  filter === key ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {getFilterCount(key)}
                </span>
              </button>
            ))}
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  showAdminActions={true}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {filter !== 'all' ? filter : ''} events found
              </h3>
              <p className="text-gray-600">
                {filter === 'pending' 
                  ? "No events are waiting for approval."
                  : filter === 'approved'
                  ? "No events have been approved yet."
                  : filter === 'rejected'
                  ? "No events have been rejected."
                  : "No events in the system."}
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {pendingEvents.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-800">Pending Approvals</h3>
            </div>
            <p className="text-yellow-700 mb-4">
              You have {pendingEvents.length} event{pendingEvents.length !== 1 ? 's' : ''} waiting for approval. 
              Review and approve events to make them visible to students.
            </p>
            <button
              onClick={() => setFilter('pending')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium text-sm"
            >
              Review Pending Events
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}