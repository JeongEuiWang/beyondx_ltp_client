import { useUserStore } from "@/features/user";
import { useRefresh } from "@/features/auth";
import { removeLocalStorageData } from "@/shared/utils";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate, Navigate } from "react-router";

const Init = () => {
  //로그인이 완료된 사용자는 진입 할 수 없음.
  const { getUser } = useUserStore((state) => state.actions);
  if (getUser().id !== 0) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};


const Auth = () => {
  const { getUser } = useUserStore((state) => state.actions);
  if (getUser().id !== 0) {
    return <Outlet />;
  }
  return (
    <ErrorBoundary FallbackComponent={AuthBoundary}>
      <Suspense fallback={<></>}>
        <AuthGuard />
      </Suspense>
    </ErrorBoundary>
  );
};

const AuthBoundary = () => {
  const navigate = useNavigate();

  const handleInvalidRefreshToken = () => {
    navigate("/sign-in");
  };
  useEffect(() => {
    handleInvalidRefreshToken();
  }, []);

  return <></>;
};

const AuthGuard = () => {
  useRefresh();
  return <Outlet />;
};


export {
  Auth,
  Init
}
