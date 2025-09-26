import { DashboardLayout } from "@/components/dashboard-layout";
import { VesselCountPanel } from "@/components/vessel-count-panel";
import { InteractiveMap } from "@/components/interactive-map";
import { AlertsPanel } from "@/components/alerts-panel";
import { SocialMediaReports } from "@/components/social-media-reports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Activity, Waves, Shield } from "lucide-react";
import oceanBg from "@/assets/ocean-bg.jpg";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${oceanBg})` }}
        />
        <div className="relative ocean-gradient p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 animate-fade-in">Ocean Sentinel</h1>
              <p className="text-lg text-white/90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Advanced Maritime Monitoring & Safety Platform
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Real-time Monitoring
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Border Security
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Waves className="h-3 w-3 mr-1" />
                  Disaster Prediction
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold animate-pulse-glow">24/7</div>
              <div className="text-sm text-white/80">Active Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-8">
        {/* Vessel Statistics */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Vessel Statistics
          </h2>
          <VesselCountPanel />
        </section>

        {/* Map and Alerts Row */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Waves className="h-6 w-6 text-accent animate-wave" />
              Maritime Overview
            </h2>
            <InteractiveMap />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-destructive animate-pulse-glow" />
              Critical Alerts
            </h2>
            <AlertsPanel />
          </div>
        </section>

        {/* Reports and Analytics Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Activity className="h-6 w-6 text-accent animate-float" />
              Community Intelligence
            </h2>
            <SocialMediaReports />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">System Health</h2>
            <div className="space-y-4">
              <Card className="glass-card border-border/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Sensor Network Status
                    <Badge variant="secondary" className="bg-status-seafoam/20 text-status-seafoam border-status-seafoam/40">
                      Online
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">GPS Buoys</span>
                      <span className="text-sm font-semibold">47/50 Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Weather Stations</span>
                      <span className="text-sm font-semibold">12/12 Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Radar Coverage</span>
                      <span className="text-sm font-semibold">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ML Predictions</span>
                      <span className="text-sm font-semibold text-status-seafoam">Running</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <button className="w-full p-2 text-left text-sm rounded-md hover:bg-accent/10 transition-colors">
                      📊 Generate Daily Report
                    </button>
                    <button className="w-full p-2 text-left text-sm rounded-md hover:bg-accent/10 transition-colors">
                      🚨 Broadcast Emergency Alert
                    </button>
                    <button className="w-full p-2 text-left text-sm rounded-md hover:bg-accent/10 transition-colors">
                      📡 Check Sensor Status
                    </button>
                    <button className="w-full p-2 text-left text-sm rounded-md hover:bg-accent/10 transition-colors">
                      🗺️ Export Map Data
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
