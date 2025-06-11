import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/ui";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: string;
  trendColor: string;
  iconBg: string;
  iconColor: string;
}

const MetricCard = ({
  icon: Icon,
  title,
  value,
  trend,
  trendColor,
  iconBg,
  iconColor,
}: MetricCardProps) => (
  <Card className="shadow-sm border-slate-200">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 font-medium">{title}</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{value}</div>
          <div className={`flex items-center mt-1 text-xs font-medium ${trendColor}`}>
            <span>{trend}</span>
          </div>
        </div>
        <div className={`w-9 h-9 ${iconBg} rounded-md flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </CardContent>
  </Card>
); 

export default MetricCard;