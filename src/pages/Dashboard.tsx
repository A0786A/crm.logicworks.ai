import React, { useState, useEffect } from 'react';
import MetricsCard from '../components/dashboard/MetricsCard';
import RecentProjects from '../components/dashboard/RecentProjects';
import RecentClients from '../components/dashboard/RecentClients';
import TasksOverview from '../components/dashboard/TasksOverview';
import CommunicationActivity from '../components/dashboard/CommunicationActivity';
import { supabase } from '../lib/supabase';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState({
    clients: [],
    projects: [],
    tasks: [],
    metrics: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      
      // Fetch all data in parallel
      const [
        { data: clients, error: clientsError },
        { data: projects, error: projectsError },
        { data: tasks, error: tasksError },
        { data: allClients, error: allClientsError },
        { data: allProjects, error: allProjectsError }
      ] = await Promise.all([
        supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('projects')
          .select(`
            *,
            client:clients(name)
          `)
          .order('start_date', { ascending: false })
          .limit(5),
        supabase
          .from('tasks')
          .select('*')
          .order('due_date', { ascending: true })
          .limit(5),
        supabase.from('clients').select('status'),
        supabase.from('projects').select('status, budget')
      ]);

      // Check for errors
      if (clientsError) throw new Error(`Error fetching clients: ${clientsError.message}`);
      if (projectsError) throw new Error(`Error fetching projects: ${projectsError.message}`);
      if (tasksError) throw new Error(`Error fetching tasks: ${tasksError.message}`);
      if (allClientsError) throw new Error(`Error fetching all clients: ${allClientsError.message}`);
      if (allProjectsError) throw new Error(`Error fetching all projects: ${allProjectsError.message}`);

      // Calculate metrics
      const activeClients = allClients?.filter(c => c.status === 'active').length || 0;
      const projectsInProgress = allProjects?.filter(p => p.status === 'in-progress').length || 0;
      const totalRevenue = allProjects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0;
      const completedProjects = allProjects?.filter(p => p.status === 'completed').length || 0;
      const totalProjects = allProjects?.length || 0;
      const avgCompletion = totalProjects ? (completedProjects / totalProjects) * 100 : 0;

      const metrics = [
        {
          id: 'metric-1',
          label: 'Active Clients',
          value: activeClients,
          change: 0,
          trend: 'neutral'
        },
        {
          id: 'metric-2',
          label: 'Projects in Progress',
          value: projectsInProgress,
          change: 0,
          trend: 'neutral'
        },
        {
          id: 'metric-3',
          label: 'Revenue This Month',
          value: totalRevenue,
          change: 0,
          trend: 'neutral'
        },
        {
          id: 'metric-4',
          label: 'Avg. Project Completion',
          value: Math.round(avgCompletion),
          change: 0,
          trend: 'neutral'
        }
      ];

      setDashboardData({
        clients: clients || [],
        projects: projects || [],
        tasks: tasks || [],
        metrics
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your agency today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white shadow-sm rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))
        ) : (
          dashboardData.metrics.map((metric) => (
            <MetricsCard key={metric.id} metric={metric} />
          ))
        )}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {isLoading ? (
            <div className="bg-white shadow-sm rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <RecentProjects projects={dashboardData.projects} />
          )}
          {isLoading ? (
            <div className="bg-white shadow-sm rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <TasksOverview tasks={dashboardData.tasks} />
          )}
        </div>
        <div className="space-y-6">
          {isLoading ? (
            <div className="bg-white shadow-sm rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <RecentClients clients={dashboardData.clients} />
          )}
          {isLoading ? (
            <div className="bg-white shadow-sm rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <CommunicationActivity communications={[]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;