import { Bell, Search, User, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export function DashboardHeader() {
  const [isOnline, setIsOnline] = useState(true);
  const alertCount = 3;

  return (
    <header className="h-16 bg-card/80 backdrop-blur-sm border-b border-border px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-foreground" />
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-status-seafoam" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {isOnline ? "Connected" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vessels, alerts, reports..."
            className="pl-10 bg-background/50 border-border focus:bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {alertCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse-glow"
            >
              {alertCount}
            </Badge>
          )}
        </Button>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              CM
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-sm">
            <div className="font-medium">Coast Monitor</div>
            <div className="text-xs text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}