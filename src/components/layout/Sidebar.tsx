import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  CheckSquare, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Zap,
  X,
  UserCircle2,
  Megaphone,
  UserPlus,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active, onClick }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
        active 
          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      <span className={`mr-3 h-5 w-5 ${active ? 'text-indigo-500' : 'text-gray-400'}`}>
        {icon}
      </span>
      {label}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigation = [
    { name: 'Dashboard', to: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Leads', to: '/leads', icon: <UserPlus size={20} /> },
    { name: 'Clients', to: '/clients', icon: <Users size={20} /> },
    { name: 'Projects', to: '/projects', icon: <FolderKanban size={20} /> },
    { name: 'Employees', to: '/employees', icon: <UserCircle2 size={20} /> },
    { name: 'Interns', to: '/interns', icon: <GraduationCap size={20} /> },
    { name: 'Tasks', to: '/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Calendar', to: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Communication', to: '/communication', icon: <MessageSquare size={20} /> },
    { name: 'AI Services', to: '/services', icon: <Zap size={20} /> },
    { name: 'Marketing', to: '/marketing', icon: <Megaphone size={20} /> },
    { name: 'Reports', to: '/reports', icon: <BarChart3 size={20} /> },
    { name: 'Settings', to: '/settings', icon: <Settings size={20} /> },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`${
          isOpen ? 'fixed inset-0 z-40 flex' : 'hidden'
        } lg:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none transform transition ease-in-out duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                LogicWorks.AI
              </h2>
            </div>
            <nav className="mt-8 space-y-1 px-2">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  to={item.to}
                  icon={item.icon}
                  label={item.name}
                  active={currentPath === item.to}
                  onClick={handleNavClick}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                LogicWorks.AI
              </h2>
            </div>
            <nav className="mt-8 flex-1 flex flex-col space-y-1 px-2">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  to={item.to}
                  icon={item.icon}
                  label={item.name}
                  active={currentPath === item.to}
                  onClick={() => {}}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;