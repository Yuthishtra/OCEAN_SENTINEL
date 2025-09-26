import { useState } from "react";
import { MapPin, Ship, AlertTriangle, Cloud, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import oceanBg from "@/assets/ocean-bg.jpg";

interface MapMarker {
  id: string;
  type: 'vessel' | 'alert' | 'weather' | 'report';
  position: { x: number; y: number };
  status: 'safe' | 'warning' | 'danger';
  name: string;
  details?: string;
}

const mapMarkers: MapMarker[] = [
  { id: '1', type: 'vessel', position: { x: 25, y: 45 }, status: 'safe', name: 'Fishing Vessel TN-001', details: '12 crew members' },
  { id: '2', type: 'vessel', position: { x: 60, y: 30 }, status: 'warning', name: 'Trawler TN-045', details: 'Near border zone' },
  { id: '3', type: 'vessel', position: { x: 80, y: 25 }, status: 'danger', name: 'Boat TN-078', details: 'Border crossed - alert active' },
  { id: '4', type: 'alert', position: { x: 70, y: 60 }, status: 'warning', name: 'Weather Alert', details: 'Strong winds expected' },
  { id: '5', type: 'weather', position: { x: 40, y: 70 }, status: 'danger', name: 'Cyclone Warning', details: 'Category 2 storm approaching' },
  { id: '6', type: 'report', position: { x: 35, y: 35 }, status: 'warning', name: 'Citizen Report', details: 'Distress signal spotted' },
];

export function InteractiveMap() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapLayer, setMapLayer] = useState<'vessels' | 'weather' | 'reports'>('vessels');

  const getMarkerIcon = (marker: MapMarker) => {
    switch (marker.type) {
      case 'vessel': return Ship;
      case 'alert': return AlertTriangle;
      case 'weather': return Cloud;
      case 'report': return MapPin;
      default: return MapPin;
    }
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-status-seafoam';
      case 'warning': return 'text-status-amber';
      case 'danger': return 'text-status-coral';
      default: return 'text-muted-foreground';
    }
  };

  const filteredMarkers = mapMarkers.filter(marker => {
    switch (mapLayer) {
      case 'vessels': return marker.type === 'vessel';
      case 'weather': return marker.type === 'weather' || marker.type === 'alert';
      case 'reports': return marker.type === 'report';
      default: return true;
    }
  });

  return (
    <Card className="glass-card border-border/40 h-96 relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Waves className="h-5 w-5 text-primary animate-wave" />
            Live Maritime Map
          </CardTitle>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={mapLayer === 'vessels' ? 'default' : 'outline'}
              onClick={() => setMapLayer('vessels')}
              className="text-xs"
            >
              Vessels
            </Button>
            <Button
              size="sm"
              variant={mapLayer === 'weather' ? 'default' : 'outline'}
              onClick={() => setMapLayer('weather')}
              className="text-xs"
            >
              Weather
            </Button>
            <Button
              size="sm"
              variant={mapLayer === 'reports' ? 'default' : 'outline'}
              onClick={() => setMapLayer('reports')}
              className="text-xs"
            >
              Reports
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full relative">
        {/* Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${oceanBg})` }}
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

        {/* Border Zone Indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-status-amber/10 border-l-2 border-status-amber/30">
          <div className="absolute top-4 left-2 text-xs text-status-amber font-semibold rotate-90 origin-left">
            BORDER ZONE
          </div>
        </div>

        {/* Map Markers */}
        {filteredMarkers.map((marker) => {
          const Icon = getMarkerIcon(marker);
          return (
            <button
              key={marker.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border-2 transition-all duration-200 hover:scale-125 ${
                selectedMarker?.id === marker.id ? 'ring-2 ring-primary' : ''
              }`}
              style={{
                left: `${marker.position.x}%`,
                top: `${marker.position.y}%`,
                borderColor: marker.status === 'safe' ? 'hsl(var(--success-seafoam))' 
                           : marker.status === 'warning' ? 'hsl(var(--warning-amber))'
                           : 'hsl(var(--danger-coral))'
              }}
              onClick={() => setSelectedMarker(marker)}
            >
              <Icon className={`h-4 w-4 ${getMarkerColor(marker.status)}`} />
            </button>
          );
        })}

        {/* Info Panel */}
        {selectedMarker && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="glass-card border-border/60">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{selectedMarker.name}</h4>
                  <Badge 
                    variant={selectedMarker.status === 'safe' ? 'secondary' 
                           : selectedMarker.status === 'warning' ? 'outline' 
                           : 'destructive'}
                    className="text-xs"
                  >
                    {selectedMarker.status.toUpperCase()}
                  </Badge>
                </div>
                {selectedMarker.details && (
                  <p className="text-xs text-muted-foreground">{selectedMarker.details}</p>
                )}
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2 text-xs h-7"
                  onClick={() => setSelectedMarker(null)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}