import { AuthUser, UserLevelEnum } from "@/entities/user";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState: AuthUser = {
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  total_payment_amount: 0,
  user_level: {
    id: 0,
    level: UserLevelEnum.DEFAULT,
    required_amount: 0,
    discount_rate: 0,
  },
  access: {
    token: "",
    expires: "",
  },
};

export const useUserStore = create(
  combine(initialState, (set, get) => ({
    actions: {
      setUser: (authUser: AuthUser) => set({ ...authUser }),
      getUser: () => get(),
      reset: () => set(initialState),
    },
  }))
);
