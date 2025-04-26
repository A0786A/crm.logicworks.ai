import React from 'react';
import { MoreHorizontal, Mail, Phone, Users, MessageSquare } from 'lucide-react';
import { Communication } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { clients } from '../../data/mockData';

interface CommunicationActivityProps {
  communications: Communication[];
}

const CommunicationActivity: React.FC<CommunicationActivityProps> = ({ communications }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4 text-indigo-500" />;
      case 'call':
        return <Phone className="w-4 h-4 text-emerald-500" />;
      case 'meeting':
        return <Users className="w-4 h-4 text-amber-500" />;
      case 'note':
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  };

  const sortedCommunications = [...communications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        <button className="text-gray-400 hover:text-gray-500">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
          
          <div className="space-y-6 relative">
            {sortedCommunications.map((comm) => (
              <div key={comm.id} className="flex">
                <div className="flex-shrink-0 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white ring-1 ring-gray-200">
                  {getActivityIcon(comm.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900 flex justify-between">
                    <span className="capitalize">{comm.type}</span>
                    <span className="text-xs text-gray-500">{formatDate(comm.date)}</span>
                  </div>
                  <div className="mt-1">
                    <h4 className="text-sm">{comm.subject}</h4>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-1">{comm.content}</p>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Client: {getClientName(comm.clientId)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationActivity;