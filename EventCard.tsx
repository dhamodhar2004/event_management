import React from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  onApprove?: (eventId: string) => void;
  onReject?: (eventId: string) => void;
  showActions?: boolean;
  showAdminActions?: boolean;
  isRegistered?: boolean;
}

export function EventCard({ 
  event, 
  onRegister, 
  onEdit, 
  onDelete, 
  onApprove, 
  onReject,
  showActions = false,
  showAdminActions = false,
  isRegistered = false 
}: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Career': return 'bg-green-100 text-green-800';
      case 'Environment': return 'bg-emerald-100 text-emerald-800';
      case 'Arts': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(event.status)}`}>
                {event.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {event.registeredCount}/{event.capacity} registered
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Organized by {event.organizerName}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Registration Progress</span>
            <span>{Math.round((event.registeredCount / event.capacity) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between space-x-3">
          {/* Student Actions */}
          {onRegister && (
            <button
              onClick={() => onRegister(event.id)}
              disabled={isRegistered || event.registeredCount >= event.capacity || event.status !== 'approved'}
              className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                isRegistered
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : event.registeredCount >= event.capacity
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : event.status !== 'approved'
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:transform active:scale-95'
              }`}
            >
              {isRegistered 
                ? 'Registered ✓' 
                : event.registeredCount >= event.capacity 
                ? 'Full' 
                : event.status !== 'approved'
                ? 'Pending Approval'
                : 'Register'
              }
            </button>
          )}

          {/* Organizer Actions */}
          {showActions && (
            <>
              <button
                onClick={() => onEdit?.(event.id)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(event.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm transition-colors"
              >
                Delete
              </button>
            </>
          )}

          {/* Admin Actions */}
          {showAdminActions && event.status === 'pending' && (
            <>
              <button
                onClick={() => onApprove?.(event.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => onReject?.(event.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-colors"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}