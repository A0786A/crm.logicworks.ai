import React from 'react';
import { MoreHorizontal, AlertCircle, Clock } from 'lucide-react';
import { Task } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { projects, users } from '../../data/mockData';

interface TasksOverviewProps {
  tasks: Task[];
}

const TasksOverview: React.FC<TasksOverviewProps> = ({ tasks }) => {
  const formatDueDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return (
        <span className="flex items-center text-rose-600">
          <AlertCircle className="w-3 h-3 mr-1" />
          Overdue by {Math.abs(diffDays)} days
        </span>
      );
    } else if (diffDays === 0) {
      return (
        <span className="flex items-center text-amber-600">
          <Clock className="w-3 h-3 mr-1" />
          Due today
        </span>
      );
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const getProjectName = (projectId?: string) => {
    if (!projectId) return 'No project';
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown project';
  };

  const getAssigneeName = (userId?: string) => {
    if (!userId) return 'Unassigned';
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown user';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-100 text-rose-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter to only todo and in-progress tasks, sorted by priority and due date
  const pendingTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => {
      // First sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then sort by due date
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
        <button className="text-gray-400 hover:text-gray-500">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {pendingTasks.map((task) => (
            <div key={task.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 line-clamp-1">{task.description}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {getProjectName(task.projectId)}
                </span>
                <span className="text-gray-500">
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Assigned to: {getAssigneeName(task.assignedTo)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksOverview;