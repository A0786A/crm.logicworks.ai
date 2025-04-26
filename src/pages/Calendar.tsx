import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Tag,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  attendees?: string[];
  type: 'meeting' | 'appointment' | 'deadline' | 'other';
  status: 'upcoming' | 'completed' | 'cancelled';
  description?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events: Event[] = [
    {
      id: '1',
      title: 'Client Meeting - TechNova',
      date: '2024-03-20',
      time: '10:00 AM',
      location: 'Conference Room A',
      attendees: ['John Doe', 'Sarah Smith'],
      type: 'meeting',
      status: 'upcoming',
      description: 'Quarterly review meeting with TechNova team'
    },
    {
      id: '2',
      title: 'Project Deadline - AI Chatbot',
      date: '2024-03-22',
      time: '5:00 PM',
      type: 'deadline',
      status: 'upcoming',
      description: 'Final delivery of AI Chatbot project'
    },
    {
      id: '3',
      title: 'Team Standup',
      date: '2024-03-21',
      time: '9:00 AM',
      location: 'Virtual Meeting',
      attendees: ['Team Members'],
      type: 'meeting',
      status: 'upcoming',
      description: 'Daily team standup meeting'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);

  const renderCalendarDays = () => {
    const days = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day names
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`day-${i}`} className="text-center text-sm font-medium text-gray-500 py-2">
          {dayNames[i]}
        </div>
      );
    }

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events.filter(event => event.date === date.toISOString().split('T')[0]);
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-2 ${
            date.toDateString() === new Date().toDateString() ? 'bg-indigo-50' : ''
          }`}
          onClick={() => {
            setSelectedDate(date);
            setShowEventModal(true);
          }}
        >
          <div className="text-sm font-medium text-gray-900">{day}</div>
          <div className="mt-1 space-y-1">
            {dayEvents.map(event => (
              <div 
                key={event.id}
                className={`text-xs p-1 rounded ${
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'deadline' ? 'bg-rose-100 text-rose-800' :
                  'bg-gray-100 text-gray-800'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
              >
                {event.time} - {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const EventModal = () => {
    const [formData, setFormData] = useState<Partial<Event>>(
      selectedEvent || {
        title: '',
        date: selectedDate?.toISOString().split('T')[0] || '',
        time: '',
        type: 'meeting',
        status: 'upcoming'
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle event submission
      setShowEventModal(false);
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEventModal(false)} />
          
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={() => setShowEventModal(false)}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {selectedEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Title</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <input
                        type="time"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Type</label>
                    <select
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
                    >
                      <option value="meeting">Meeting</option>
                      <option value="appointment">Appointment</option>
                      <option value="deadline">Deadline</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowEventModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      {selectedEvent ? 'Save Changes' : 'Add Event'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your schedule and events
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => {
              setSelectedEvent(null);
              setShowEventModal(true);
            }}
          >
            Add Event
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-500" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {renderCalendarDays()}
            </div>
          </div>
        </Card>
      </div>

      {showEventModal && <EventModal />}
    </div>
  );
};

export default Calendar; 