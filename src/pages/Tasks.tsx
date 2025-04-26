import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Filter, 
  ChevronDown, 
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  X,
  Check,
  AlertCircle,
  MoreVertical,
  Trash2,
  Edit,
  Users
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { Task } from '../types';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  department: string;
}

interface Intern {
  id: string;
  first_name: string;
  last_name: string;
  department: string;
}

interface Project {
  id: string;
  name: string;
}

const Tasks: React.FC = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    fetchInterns();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('id, first_name, last_name, department')
        .eq('status', 'active');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchInterns = async () => {
    try {
      const { data, error } = await supabase
        .from('interns')
        .select('id, first_name, last_name, department')
        .eq('status', 'active');

      if (error) throw error;
      setInterns(data || []);
    } catch (error) {
      console.error('Error fetching interns:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-rose-500 bg-rose-50';
      case 'medium':
        return 'text-amber-500 bg-amber-50';
      case 'low':
        return 'text-emerald-500 bg-emerald-50';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'text-gray-500 bg-gray-50';
      case 'in-progress':
        return 'text-blue-500 bg-blue-50';
      case 'completed':
        return 'text-green-500 bg-green-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAssigneeName = (assignedTo: string) => {
    const employee = employees.find(e => e.id === assignedTo);
    if (employee) {
      return `${employee.first_name} ${employee.last_name}`;
    }
    
    const intern = interns.find(i => i.id === assignedTo);
    if (intern) {
      return `${intern.first_name} ${intern.last_name} (Intern)`;
    }
    
    return 'Unassigned';
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'No Project';
  };

  const NewTaskModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      project_id: '',
      due_date: '',
      priority: 'medium' as Task['priority'],
      status: 'todo' as Task['status'],
      assigned_to: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const { error } = await supabase
          .from('tasks')
          .insert([formData]);

        if (error) throw error;
        await fetchTasks();
        setShowNewTaskModal(false);
      } catch (error) {
        console.error('Error creating task:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowNewTaskModal(false)} />
          
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={() => setShowNewTaskModal(false)}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  New Task
                </h3>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Task Title</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project</label>
                    <select
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.project_id}
                      onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                    >
                      <option value="">Select Project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <select
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.assigned_to}
                      onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                    >
                      <option value="">Select Assignee</option>
                      <optgroup label="Employees">
                        {employees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.first_name} {employee.last_name} - {employee.department}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Interns">
                        {interns.map((intern) => (
                          <option key={intern.id} value={intern.id}>
                            {intern.first_name} {intern.last_name} - {intern.department} (Intern)
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.due_date}
                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <select
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewTaskModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                    >
                      Create Task
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', taskId);

        if (error) throw error;
        await fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) throw error;
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your tasks and assignments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowNewTaskModal(true)}
          >
            New Task
          </Button>
        </div>
      </div>

      <div className="mt-8">
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
                    placeholder="Search tasks..."
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

            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery
                      ? `No tasks matching "${searchQuery}" found. Try a different search term.`
                      : 'Get started by creating a new task.'}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-500">{task.description}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            <Calendar className="inline-block h-3 w-3 mr-1" />
                            {formatDate(task.due_date)}
                          </span>
                          <span className="text-xs text-gray-500">
                            <User className="inline-block h-3 w-3 mr-1" />
                            {getAssigneeName(task.assigned_to)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <button
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => {
                            const newStatus = task.status === 'todo' ? 'in-progress' : 
                                           task.status === 'in-progress' ? 'completed' : 'todo';
                            handleUpdateTaskStatus(task.id, newStatus);
                          }}
                        >
                          {task.status === 'completed' ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Check className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <button
                        className="text-gray-400 hover:text-rose-500"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>

      {showNewTaskModal && <NewTaskModal />}
    </div>
  );
};

export default Tasks;