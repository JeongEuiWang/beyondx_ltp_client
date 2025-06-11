import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui";

interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  action?: React.ReactNode;
}

const PageHeader = ({
  title,
  description,
  showBackButton = false,
  onBack,
  action,
}: PageHeaderProps) => (
  <div className="flex justify-between items-start mb-6">
    <div className="flex items-center">
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 mr-2 hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      )}
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {description && (
          <p className="text-sm text-slate-600">{description}</p>
        )}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
); 

export default PageHeader;