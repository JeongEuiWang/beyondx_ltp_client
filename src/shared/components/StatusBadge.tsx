import { Badge } from "@/shared/ui";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const getStatusVariant = (status: string) => {
  const statusMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    ESTIMATE: "default",
    SUBMIT: "secondary", 
    REJECT: "destructive",
    ACCEPT: "default",
    COMPLETED: "default",
  };
  return statusMap[status] || "secondary";
};

const getStatusColor = (status: string) => {
  const colorMap: { [key: string]: string } = {
    ESTIMATE: "bg-gray-100 text-gray-800",
    SUBMIT: "bg-yellow-100 text-yellow-800", 
    REJECT: "bg-red-100 text-red-800",
    ACCEPT: "bg-green-100 text-green-800",
    COMPLETED: "bg-green-100 text-green-800",
  };
  return colorMap[status] || "bg-slate-100 text-slate-800";
};

const getDisplayStatus = (status: string) => {
  const displayMap: { [key: string]: string } = {
    ESTIMATE: "Estimate",
    SUBMIT: "Submit",
    REJECT: "Reject",
    ACCEPT: "Accept",
    COMPLETED: "Completed",
  };
  return displayMap[status] || status;
};

const StatusBadge = ({ status, variant }: StatusBadgeProps) => (
  <Badge 
    variant={variant || getStatusVariant(status)}
    className={`${getStatusColor(status)} border-0`}
  >
    {getDisplayStatus(status)}
  </Badge>
); 

export default StatusBadge;