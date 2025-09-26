import { Ship, AlertTriangle, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VesselStats {
  total: number;
  nearBorder: number;
  crossed: number;
  inDanger: number;
}

const vesselStats: VesselStats = {
  total: 247,
  nearBorder: 18,
  crossed: 3,
  inDanger: 5
};

export function VesselCountPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass-card border-border/40 hover:ocean-shadow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Vessels
          </CardTitle>
          <Ship className="h-5 w-5 text-primary animate-float" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{vesselStats.total}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Active at sea
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/40 hover:ocean-shadow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Near Border
          </CardTitle>
          <MapPin className="h-5 w-5 text-accent animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-accent">{vesselStats.nearBorder}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs border-accent/40">
              Within 5km
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/40 hover:ocean-shadow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Border Crossed
          </CardTitle>
          <AlertTriangle className="h-5 w-5 text-status-amber animate-pulse-glow" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-status-amber">{vesselStats.crossed}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs border-status-amber/40 text-status-amber">
              Requires attention
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/40 hover:ocean-shadow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            In Danger
          </CardTitle>
          <AlertTriangle className="h-5 w-5 text-destructive animate-pulse-glow" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-destructive">{vesselStats.inDanger}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="destructive" className="text-xs animate-pulse">
              Emergency response
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}