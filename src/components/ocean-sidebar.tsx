import { useState } from "react";
import { 
  LayoutDashboard, 
  Map, 
  CloudRain, 
  MessageSquare, 
  AlertTriangle, 
  Target, 
  FileText, 
  Settings, 
  LogOut,
  Anchor,
  Languages
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navigationItems = [
  { title: "Dashboard Overview", url: "/", icon: LayoutDashboard },
  { title: "Live Vessel Map", url: "/vessel-map", icon: Map },
  { title: "Disaster Predictions", url: "/disaster-predictions", icon: CloudRain },
  { title: "Social Media & Reports", url: "/social-reports", icon: MessageSquare },
  { title: "Alerts & Notifications", url: "/alerts", icon: AlertTriangle },
  { title: "Dynamic Hotspots", url: "/hotspots", icon: Target },
  { title: "Reports & Logs", url: "/reports", icon: FileText },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

export function OceanSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 ${
      isActive 
        ? "bg-sidebar-accent text-sidebar-primary-foreground border-l-4 border-sidebar-primary shadow-sm" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    }`;

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLanguage.code);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
  };

  return (
    <Sidebar className="ocean-gradient border-r-2 border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Ocean Sentinel" className="h-8 w-8" />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">Ocean Sentinel</h2>
              <p className="text-xs text-sidebar-foreground/70">Maritime Monitoring</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-semibold px-4 pb-2">
            {!collapsed ? "Navigation" : "Nav"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="truncate text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-semibold px-4 pb-2">
            {!collapsed ? "System" : "Sys"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="truncate text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Section */}
      <div className="mt-auto p-4 border-t border-sidebar-border space-y-3">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={cycleLanguage}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <Languages className="h-4 w-4 flex-shrink-0" />
          {!collapsed && (
            <span className="truncate text-sm">{currentLanguage.nativeName}</span>
          )}
        </Button>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-status-seafoam rounded-full animate-pulse-glow"></div>
          {!collapsed && (
            <span className="text-xs text-sidebar-foreground/70">System Active</span>
          )}
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span className="truncate text-sm">Logout</span>}
        </Button>
      </div>
    </Sidebar>
  );
}