import { MessageSquare, Camera, MapPin, ThumbsUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SocialReport {
  id: string;
  type: 'citizen' | 'twitter' | 'facebook' | 'youtube';
  author: string;
  content: string;
  location?: string;
  timestamp: Date;
  verified: boolean;
  urgency: 'low' | 'medium' | 'high';
  engagement: number;
  mediaCount?: number;
}

const mockReports: SocialReport[] = [
  {
    id: '1',
    type: 'citizen',
    author: 'Fisherman Ravi',
    content: 'Strong waves and wind near Pamban area. Several boats heading back to shore for safety.',
    location: 'Pamban Bridge, Rameswaram',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    verified: true,
    urgency: 'high',
    engagement: 0,
    mediaCount: 3
  },
  {
    id: '2',
    type: 'twitter',
    author: '@TamilFishers',
    content: 'Weather conditions deteriorating rapidly. All boats advised to return immediately. #SafetyFirst #TamilNadu',
    location: 'Coastal Tamil Nadu',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    verified: true,
    urgency: 'high',
    engagement: 47
  },
  {
    id: '3',
    type: 'facebook',
    author: 'Coastal Watch Group',
    content: 'Spotted unusual vessel movement near border waters. Sharing coordinates with authorities.',
    location: 'International Waters',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    verified: false,
    urgency: 'medium',
    engagement: 23,
    mediaCount: 1
  },
  {
    id: '4',
    type: 'citizen',
    author: 'Marine Officer K. Kumar',
    content: 'Oil spill detected in sector 7. Immediate cleanup required. Wildlife at risk.',
    location: 'Gulf of Mannar',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    verified: true,
    urgency: 'high',
    engagement: 0,
    mediaCount: 5
  }
];

export function SocialMediaReports() {
  const getPlatformIcon = (type: string) => {
    switch (type) {
      case 'citizen': return '👤';
      case 'twitter': return '🐦';
      case 'facebook': return '📘';
      case 'youtube': return '📹';
      default: return '📱';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
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
          <MessageSquare className="h-5 w-5 text-accent animate-float" />
          Social Media & Reports
          <Badge variant="secondary" className="ml-auto">
            {mockReports.filter(report => report.verified).length} Verified
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-72 px-4">
          <div className="space-y-3 pb-4">
            {mockReports.map((report) => (
              <div 
                key={report.id} 
                className="p-3 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {getPlatformIcon(report.type)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{report.author}</span>
                        {report.verified && (
                          <CheckCircle className="h-4 w-4 text-status-seafoam" />
                        )}
                      </div>
                      <Badge variant={getUrgencyColor(report.urgency) as any} className="text-xs">
                        {report.urgency.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-foreground">{report.content}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {report.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{report.location}</span>
                          </div>
                        )}
                        {report.mediaCount && (
                          <div className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            <span>{report.mediaCount} media</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {report.engagement > 0 && (
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{report.engagement}</span>
                          </div>
                        )}
                        <span>{formatTimeAgo(report.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}