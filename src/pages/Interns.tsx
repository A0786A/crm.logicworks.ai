import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronDown,
  Mail,
  Phone,
  FileEdit,
  Trash2,
  X,
  UserCircle2,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Intern } from '../types';
import { supabase } from '../lib/supabase';

const Interns: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNewInternModal, setShowNewInternModal] = useState(false);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const { data, error } = await supabase
        .from('interns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInterns(data || []);
    } catch (error) {
      console.error('Error fetching interns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const NewInternModal = () => {
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      department: '',
      start_date: '',
      end_date: '',
      skills: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const { error } = await supabase
          .from('interns')
          .insert([{
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim()),
            status: 'pending'
          }]);

        if (error) throw error;
        
        await fetchInterns();
        setShowNewInternModal(false);
      } catch (error) {
        console.error('Error adding intern:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowNewInternModal(false)} />
          
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={() => setShowNewInternModal(false)}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Add New Intern
                </h3>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Development">Development</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Research">Research</option>
                      <option value="Product">Product</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="e.g., Python, React, Machine Learning"
                      required
                    />
                  </div>
                  
                  <div className="mt-6 sm:flex sm:flex-row-reverse">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full sm:ml-3 sm:w-auto"
                      isLoading={isSubmitting}
                    >
                      Add Intern
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3 w-full sm:mt-0 sm:w-auto"
                      onClick={() => setShowNewInternModal(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
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

  const statusOptions = [
    { value: null, label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: 'bg-emerald-100 text-emerald-800',
      completed: 'bg-blue-100 text-blue-800',
      pending: 'bg-amber-100 text-amber-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  const handleViewIntern = (intern: Intern) => {
    setSelectedIntern(intern);
    setShowViewModal(true);
  };

  const handleEditIntern = (intern: Intern) => {
    setSelectedIntern(intern);
    setShowEditModal(true);
  };

  const filteredInterns = interns.filter((intern) => {
    const searchString = searchQuery.toLowerCase();
    const matchesSearch = 
      `${intern.first_name} ${intern.last_name}`.toLowerCase().includes(searchString) ||
      intern.email.toLowerCase().includes(searchString);
    
    const matchesStatus = statusFilter === null || intern.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const InternCard: React.FC<{ intern: Intern }> = ({ intern }) => {
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this intern?')) {
        try {
          const { error } = await supabase
            .from('interns')
            .delete()
            .eq('id', intern.id);

          if (error) throw error;
          
          await fetchInterns();
        } catch (error) {
          console.error('Error deleting intern:', error);
        }
      }
    };

    return (
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              {intern.avatar_url ? (
                <img
                  className="h-12 w-12 rounded-full"
                  src={intern.avatar_url}
                  alt={`${intern.first_name} ${intern.last_name}`}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircle2 className="h-6 w-6 text-gray-500" />
                </div>
              )}
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {intern.first_name} {intern.last_name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{intern.department}</p>
              </div>
            </div>
            <div className="flex items-center">
              {getStatusBadge(intern.status)}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-500">
              <Mail className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{intern.email}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Phone className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{intern.phone}</span>
            </div>
          </div>

          {intern.skills && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {intern.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(intern.start_date)} - {intern.end_date ? formatDate(intern.end_date) : 'Present'}</span>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between">
            <div className="space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<FileEdit className="h-4 w-4" />}
                onClick={() => handleEditIntern(intern)}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<Trash2 className="h-4 w-4 text-rose-500" />}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => handleViewIntern(intern)}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interns</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track internship program participants
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowNewInternModal(true)}
          >
            Add Intern
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="w-full sm:max-w-xs">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search interns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              {statusFilter === null ? 'All Status' : statusOptions.find(o => o.value === statusFilter)?.label}
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
            </button>
            {showFilterMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {statusOptions.map((option) => (
                    <button
                      key={option.label}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === option.value
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStatusFilter(option.value);
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
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          filteredInterns.map((intern) => (
            <InternCard key={intern.id} intern={intern} />
          ))
        )}
      </div>

      {!isLoading && filteredInterns.length === 0 && (
        <div className="mt-6 flex flex-col items-center justify-center text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No interns found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? `No interns matching "${searchQuery}" found. Try a different search term.`
              : 'No interns match the current filters.'}
          </p>
        </div>
      )}

      {showNewInternModal && <NewInternModal />}
    </div>
  );
};

export default Interns;