import { AlertTriangle, Clock, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Alert {
  id: string;
  type: 'border' | 'weather' | 'distress' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  source: 'sensor' | 'citizen' | 'social_media' | 'ml_prediction';
  acknowledged: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'border',
    severity: 'critical',
    title: 'Unauthorized Border Crossing',
    description: 'Vessel TN-078 has crossed international boundary',
    location: 'Coordinates: 9.9312°N, 78.1348°E',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    source: 'sensor',
    acknowledged: false
  },
  {
    id: '2',
    type: 'weather',
    severity: 'high',
    title: 'Cyclone Warning',
    description: 'Category 2 cyclone approaching coastal areas',
    location: 'Bay of Bengal - Southeast Region',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    source: 'ml_prediction',
    acknowledged: false
  },
  {
    id: '3',
    type: 'distress',
    severity: 'high',
    title: 'Distress Signal Detected',
    description: 'Emergency beacon activated from fishing vessel',
    location: 'Coordinates: 9.8567°N, 78.0234°E',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    source: 'citizen',
    acknowledged: true
  },
  {
    id: '4',
    type: 'system',
    severity: 'medium',
    title: 'Social Media Alert',
    description: 'Multiple reports of rough seas in fishing areas',
    location: 'Rameswaram Coastal Zone',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    source: 'social_media',
    acknowledged: false
  }
];

export function AlertsPanel() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'outline';
      case 'medium': return 'secondary';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-4 border-destructive bg-destructive/5';
      case 'high': return 'border-l-4 border-status-amber bg-status-amber/5';
      case 'medium': return 'border-l-4 border-accent bg-accent/5';
      case 'low': return 'border-l-4 border-muted bg-muted/5';
      default: return '';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'sensor': return '📡';
      case 'citizen': return '👤';
      case 'social_media': return '📱';
      case 'ml_prediction': return '🤖';
      default: return '📊';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  return (
    <Card className="glass-card border-border/40 h-96">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive animate-pulse-glow" />
          Active Alerts
          <Badge variant="destructive" className="ml-auto animate-pulse">
            {mockAlerts.filter(alert => !alert.acknowledged).length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-72 px-4">
          <div className="space-y-3 pb-4">
            {mockAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg transition-all duration-200 hover:shadow-md ${getSeverityStyle(alert.severity)} ${
                  alert.acknowledged ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getSourceIcon(alert.source)}</span>
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    {alert.acknowledged && (
                      <CheckCircle className="h-4 w-4 text-status-seafoam" />
                    )}
                  </div>
                  <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(alert.timestamp)}</span>
                  </div>
                </div>
                
                {!alert.acknowledged && (
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}