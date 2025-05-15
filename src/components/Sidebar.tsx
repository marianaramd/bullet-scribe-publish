
import React from 'react';
import { Home, MessageSquare, Code, Settings, FileText, BarChart3, CreditCard, Users, Share2, Key, User, Building, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  hasSubItems?: boolean;
  expanded?: boolean;
  badge?: React.ReactNode;
};

const SidebarItem = ({ icon: Icon, label, active = false, hasSubItems = false, expanded = false, badge }: SidebarItemProps) => (
  <div className={cn(
    "flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 cursor-pointer",
    active && "bg-gray-100"
  )}>
    <Icon className="h-5 w-5 mr-3 text-gray-500" />
    <span className="flex-1">{label}</span>
    {badge && badge}
    {hasSubItems && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 transition-transform ${expanded ? 'transform rotate-180' : ''}`}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    )}
  </div>
);

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-white h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-green-600" />
        <h1 className="text-lg font-medium">DevChangelog</h1>
      </div>
      
      <div className="flex-1 py-2">
        <SidebarItem icon={Home} label="Home" active />
        <SidebarItem icon={MessageSquare} label="Chat" />
        
        <div className="mt-1">
          <SidebarItem 
            icon={Code} 
            label="AI Code Review Bot" 
            hasSubItems 
            expanded={true} 
          />
          <div className="ml-8 my-1 space-y-1">
            <div className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100">
              Configure
            </div>
            <div className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100">
              Logs
            </div>
            <div className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100">
              Analytics
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-green-600 text-white font-medium">New</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 px-4 py-1 text-xs uppercase text-gray-500 font-medium">
          Billing & Usage
        </div>
        <SidebarItem icon={CreditCard} label="Billing" />
        <SidebarItem icon={Share2} label="Refer a Friend" />
        
        <div className="mt-4 px-4 py-1 text-xs uppercase text-gray-500 font-medium">
          API
        </div>
        <SidebarItem icon={Key} label="API Keys" />
        
        <div className="mt-4 px-4 py-1 text-xs uppercase text-gray-500 font-medium">
          Account
        </div>
        <SidebarItem icon={User} label="Profile" />
        <SidebarItem icon={Building} label="Organization" />
        <SidebarItem icon={GitBranch} label="Code Providers" />
      </div>
    </aside>
  );
};

export default Sidebar;
