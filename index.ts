export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer' | 'admin';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  registeredCount: number;
  organizerId: string;
  organizerName: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  image?: string;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
  qrCode: string;
}