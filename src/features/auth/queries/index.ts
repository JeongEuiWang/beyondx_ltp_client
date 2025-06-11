import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { SuspenseQuery, Mutation } from "@/features/_core/api";
import { refreshAPI, signInAPI, signOutAPI } from "@/features/auth/api";
import {
  useRefreshRequest,
  useRefreshResponse,
  useSignInRequest,
  useSignInResponse,
  useSignOutRequest,
  useSignOutResponse,
} from "./type";
import { useUserStore } from "@/features/user";
import { queryClient } from "@/app/App";
// post 요청은 mutation이어야 한다는 법칙은 없음
const useRefresh: SuspenseQuery<useRefreshRequest, useRefreshResponse> = () => {
  const { setUser } = useUserStore((state) => state.actions);
  return useSuspenseQuery({
    queryKey: ["refresh"],
    queryFn: async () => {
      const result = await refreshAPI();
      setUser(result);
      return result;
    },
    retry: false,
  });
};

const useSignIn: Mutation<useSignInRequest, useSignInResponse> = (args) => {
  const { onSuccess, onError } = args;
  const { setUser } = useUserStore((state) => state.actions);

  return useMutation({
    mutationFn: async (data) => {
      const result = await signInAPI({
        email: data.email,
        password: data.password,
      });
      setUser(result);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useSignOut: Mutation<useSignOutRequest, useSignOutResponse> = (args) => {
  const { onSuccess, onError } = args;
  const { actions } = useUserStore();
  return useMutation({
    mutationFn: async () => {
      const result = await signOutAPI();
      actions.reset();
      queryClient.clear();
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export { useRefresh, useSignIn, useSignOut };
