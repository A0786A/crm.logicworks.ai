import React from 'react';
import { MoreHorizontal, Users } from 'lucide-react';
import { Client } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface RecentClientsProps {
  clients: Client[];
}

const RecentClients: React.FC<RecentClientsProps> = ({ clients }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        );
      case 'lead':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Lead
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    try {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return 'Today';
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        return `${Math.floor(diffDays / 7)} weeks ago`;
      } else {
        return new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric'
        }).format(date);
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const sortedClients = [...clients]
    .sort((a, b) => {
      const dateA = new Date(a.lastContact || 0).getTime();
      const dateB = new Date(b.lastContact || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Clients</CardTitle>
        <button className="text-gray-400 hover:text-gray-500">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedClients.map((client) => (
            <div key={client.id} className="flex items-center">
              <div className="flex-shrink-0">
                {client.avatar ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={client.avatar}
                    alt={client.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{client.name}</h3>
                  {getStatusBadge(client.status)}
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>{client.company}</span>
                  <span className="mx-1">•</span>
                  <span>Last contact: {formatDate(client.lastContact)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentClients;