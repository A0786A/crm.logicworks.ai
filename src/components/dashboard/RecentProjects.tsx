import React from 'react';
import { MoreHorizontal, CheckCircle2, Clock, Activity, CheckCheck } from 'lucide-react';
import { Project } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { clients } from '../../data/mockData';

interface RecentProjectsProps {
  projects: Project[];
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress':
        return <Activity className="w-4 h-4 text-amber-500" />;
      case 'review':
        return <CheckCircle2 className="w-4 h-4 text-purple-500" />;
      case 'completed':
        return <CheckCheck className="w-4 h-4 text-emerald-500" />;
      default:
        return null;
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const sortedProjects = [...projects]
    .sort((a, b) => {
      const dateA = new Date(a.startDate || 0).getTime();
      const dateB = new Date(b.startDate || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Projects</CardTitle>
        <button className="text-gray-400 hover:text-gray-500">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedProjects.map((project) => (
            <div key={project.id} className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
                {getStatusIcon(project.status)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{project.name}</h3>
                  <div 
                    className="ml-2 flex-shrink-0 flex"
                    style={{ width: '80px' }}
                  >
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>{getClientName(project.clientId)}</span>
                  <span className="mx-1">•</span>
                  <span>Started {formatDate(project.startDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentProjects;