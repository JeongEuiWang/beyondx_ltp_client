import { useUserStore } from "@/features/user/store";
import { User } from "lucide-react";

const UserInfo = () => {
  const user = useUserStore((state) => state.actions.getUser());
  return (
    <div className="bg-white rounded-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-800" />
          <h2 className="text-md font-semibold text-slate-800">
            Personal Information
          </h2>
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Name
          </label>
          <p className="text-sm text-slate-900">
            {user.first_name} {user.last_name}
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Email
          </label>
          <p className="text-sm text-slate-900">{user.email}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Phone
          </label>
          <p className="text-sm text-slate-900">{user.phone}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            User Level
          </label>
          <p className="text-sm text-slate-900">{user.user_level.level}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Total Payments
          </label>
          <p className="text-sm text-slate-900">
            ${user.total_payment_amount.toFixed(2)}
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Discount Rate
          </label>
          <p className="text-sm text-slate-900">
            {(user.user_level.discount_rate * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;