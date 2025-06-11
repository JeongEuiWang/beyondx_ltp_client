import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/ui";

interface SectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ 
  icon: Icon, 
  title, 
  children, 
  className = "" 
}: SectionProps) => (
  <Card className={`shadow-sm border-slate-200 ${className}`}>
    <CardHeader className="p-4 border-b border-slate-200">
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-3 text-slate-500" />
        <h2 className="text-md font-semibold text-slate-800">{title}</h2>
      </div>
    </CardHeader>
    <CardContent className="p-6">
      {children}
    </CardContent>
  </Card>
); 