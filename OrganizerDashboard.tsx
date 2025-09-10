import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { EventCard } from '../components/EventCard';
import { MOCK_EVENTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Plus, Calendar, Users, TrendingUp, Edit, X } from 'lucide-react';
import { Event } from '../types';

export function OrganizerDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    category: 'Technology'
  });

  const myEvents = events.filter(e => e.organizerId === user?.id);
  const totalParticipants = myEvents.reduce((sum, event) => sum + event.registeredCount, 0);
  const approvedEvents = myEvents.filter(e => e.status === 'approved').length;
  const pendingEvents = myEvents.filter(e => e.status === 'pending').length;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      registeredCount: 0,
      organizerId: user?.id || '',
      organizerName: user?.name || '',
      status: 'pending',
      category: formData.category
    };

    setEvents(prev => [newEvent, ...prev]);
    setShowCreateForm(false);
    resetForm();
  };

  const handleEditEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingEvent) return;

    const updatedEvent: Event = {
      ...editingEvent,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      category: formData.category
    };

    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id ? updatedEvent : event
    ));
    setEditingEvent(null);
    resetForm();
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const openEditForm = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        capacity: event.capacity.toString(),
        category: event.category
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      capacity: '',
      category: 'Technology'
    });
  };

  const closeForm = () => {
    setShowCreateForm(false);
    setEditingEvent(null);
    resetForm();
  };

  return (
    <Layout title="Organizer Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Event Organizer Portal</h1>
          <p className="text-indigo-100">
            Create and manage your events, track registrations, and engage with your audience.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{myEvents.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedEvents}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingEvents}</p>
              </div>
              <Edit className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-3xl font-bold text-purple-600">{totalParticipants}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </button>
        </div>

        {/* Events List */}
        {myEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                showActions={true}
                onEdit={openEditForm}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events created yet</h3>
            <p className="text-gray-600 mb-6">Create your first event to start engaging with students.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Your First Event
            </button>
          </div>
        )}

        {/* Create/Edit Event Modal */}
        {(showCreateForm || editingEvent) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h2>
                  <button
                    onClick={closeForm}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={editingEvent ? handleEditEvent : handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity
                      </label>
                      <input
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Career">Career</option>
                        <option value="Environment">Environment</option>
                        <option value="Arts">Arts</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </button>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}