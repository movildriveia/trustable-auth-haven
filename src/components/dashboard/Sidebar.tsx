
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FileText, 
  Settings, 
  User, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
];

const Sidebar = ({ collapsed, toggleSidebar }: { collapsed: boolean; toggleSidebar: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div 
      className={cn(
        "h-screen bg-white shadow-md border-r border-gray-200 transition-all duration-300 flex flex-col z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-gray-50">
        {!collapsed && (
          <h2 className="font-semibold text-custom-dark">Nexus FinLabs</h2>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className={cn("text-gray-500", collapsed ? "mx-auto" : "ml-auto")}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className={cn("mb-4 px-4", collapsed ? "hidden" : "block")}>
          <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Main Menu</h3>
        </div>
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.name} className="px-2">
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start py-2",
                    isActive ? "bg-gray-100 font-medium" : "text-gray-700",
                    collapsed ? "px-2 justify-center" : ""
                  )}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon size={18} className={cn(isActive ? "text-custom-dark" : "text-gray-500")} />
                  {!collapsed && (
                    <span className="ml-3">
                      {item.name}
                    </span>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {!collapsed && (
          <p className="text-xs text-gray-500">v1.0.0</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
