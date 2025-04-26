import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Video, 
  Search, 
  Filter,
  ChevronDown,
  Plus,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  X,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Message {
  id: string;
  type: 'email' | 'chat' | 'call' | 'video';
  sender: string;
  recipient: string;
  subject?: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: string[];
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  status: 'active' | 'archived';
}

const Communications: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const conversations: Conversation[] = [
    {
      id: '1',
      participants: ['John Doe', 'Sarah Smith'],
      lastMessage: {
        id: '1',
        type: 'email',
        sender: 'John Doe',
        recipient: 'Sarah Smith',
        subject: 'Project Update',
        content: 'Here\'s the latest update on the AI Chatbot project...',
        timestamp: '2024-03-15T10:30:00Z',
        status: 'read'
      },
      unreadCount: 0,
      status: 'active'
    },
    {
      id: '2',
      participants: ['TechNova Team'],
      lastMessage: {
        id: '2',
        type: 'chat',
        sender: 'TechNova Team',
        recipient: 'You',
        content: 'When can we schedule the next review meeting?',
        timestamp: '2024-03-15T09:15:00Z',
        status: 'delivered'
      },
      unreadCount: 2,
      status: 'active'
    },
    {
      id: '3',
      participants: ['Michael Rodriguez'],
      lastMessage: {
        id: '3',
        type: 'call',
        sender: 'Michael Rodriguez',
        recipient: 'You',
        content: 'Missed call',
        timestamp: '2024-03-14T16:45:00Z',
        status: 'sent'
      },
      unreadCount: 1,
      status: 'active'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Communications' },
    { value: 'email', label: 'Emails' },
    { value: 'chat', label: 'Chats' },
    { value: 'call', label: 'Calls' },
    { value: 'video', label: 'Video Calls' }
  ];

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'chat':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'call':
        return <Phone className="h-5 w-5 text-purple-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-rose-500" />;
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4 text-gray-400" />;
      case 'delivered':
        return <Check className="h-4 w-4 text-blue-500" />;
      case 'read':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
    }
  };

  const NewMessageModal = () => {
    const [formData, setFormData] = useState({
      type: 'email' as Message['type'],
      recipient: '',
      subject: '',
      content: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle message submission
      setShowNewMessageModal(false);
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowNewMessageModal(false)} />
          
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={() => setShowNewMessageModal(false)}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  New Message
                </h3>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message Type</label>
                    <select
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Message['type'] })}
                    >
                      <option value="email">Email</option>
                      <option value="chat">Chat</option>
                      <option value="call">Call</option>
                      <option value="video">Video Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recipient</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.recipient}
                      onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                      required
                    />
                  </div>

                  {formData.type === 'email' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewMessageModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Send Message
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
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your messages and communications
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowNewMessageModal(true)}
          >
            New Message
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        {/* Conversations List */}
        <div className="lg:w-1/3">
          <Card>
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                  >
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    {filterOptions.find(o => o.value === selectedFilter)?.label}
                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                  </button>
                  {showFilterMenu && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu">
                        {filterOptions.map((option) => (
                          <button
                            key={option.value}
                            className={`block px-4 py-2 text-sm w-full text-left ${
                              selectedFilter === option.value
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => {
                              setSelectedFilter(option.value);
                              setShowFilterMenu(false);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-indigo-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getMessageIcon(conversation.lastMessage.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {conversation.participants.join(', ')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conversation.lastMessage.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conversation.unreadCount > 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {conversation.unreadCount}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(conversation.lastMessage.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Message View */}
        <div className="lg:w-2/3">
          <Card>
            <div className="p-4">
              {selectedConversation ? (
                <div className="h-[600px] flex flex-col">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-3">
                      {getMessageIcon(selectedConversation.lastMessage.type)}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {selectedConversation.participants.join(', ')}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.lastMessage.type === 'email' && selectedConversation.lastMessage.subject}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.lastMessage && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {getMessageIcon(selectedConversation.lastMessage.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {selectedConversation.lastMessage.sender}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {new Date(selectedConversation.lastMessage.timestamp).toLocaleString()}
                              </span>
                              {getStatusIcon(selectedConversation.lastMessage.status)}
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {selectedConversation.lastMessage.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Smile className="h-5 w-5" />
                      </button>
                      <div className="flex-1">
                        <input
                          type="text"
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Type your message..."
                        />
                      </div>
                      <Button
                        variant="primary"
                        leftIcon={<Send className="h-4 w-4" />}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[600px] flex items-center justify-center text-gray-500">
                  Select a conversation to view messages
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {showNewMessageModal && <NewMessageModal />}
    </div>
  );
};

export default Communications; 