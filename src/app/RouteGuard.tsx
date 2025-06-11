import { useUserStore } from "@/features/user";
import { useRefresh } from "@/features/auth";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate, Navigate } from "react-router";
import { UserRoleEnum } from "@/entities/user";

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

const AdminAuth = () => {
  const { getUser } = useUserStore((state) => state.actions);
  if (getUser().role_id === UserRoleEnum.ADMIN) {
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
  const { data: user } = useRefresh();
  if (user.role_id === UserRoleEnum.ADMIN) {
    return <Navigate to={"/admin"} />;
  }
  if (user.role_id === UserRoleEnum.USER) {
    return <Navigate to={"/service"} />;
  }
  return <Outlet />;
};

export { Auth, AdminAuth, Init };
