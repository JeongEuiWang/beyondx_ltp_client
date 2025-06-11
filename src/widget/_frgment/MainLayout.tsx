import { Outlet, useNavigate } from "react-router";
import { User, LogOut } from "lucide-react";
import { useUserStore } from "@/features/user/store";
import { Button } from "@/shared/ui";
import { useSignOut } from "@/features/auth";
import { toast } from "sonner";

const MainLayout = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.actions.getUser());
  const { mutate } = useSignOut({
    onSuccess: () => {
      toast.success("Signed out successfully");
      navigate("/");
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div>
                <h1 className="cursor-pointer text-lg font-semibold text-slate-900" onClick={() => navigate("/service")}>
                  BeyondX Logistics
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate("/service/settings")}
                className="p-2 text-slate-800 hover:text-slate-700 hover:bg-slate-100 rounded-md"
              >
                <User size={16} />
              </button>
              <span className="text-sm text-slate-600 font-medium">
                {user.first_name} {user.last_name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => mutate()}>
                <LogOut size={14} className="text-gray-800" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-24 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
