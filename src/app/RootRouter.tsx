import { Routes, Route, Navigate } from "react-router";
import { Init, Auth } from "@/app/RouteGuard";
import Landing from "@/pages/landing";
import { SignIn, SignUp } from "@/pages/auth";

const RootRouter = () => {
  return (
    <Routes>
      <Route element={<Init />}>
        <Route index element={<Landing />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="/service" element={<Auth />}>
        <Route index element={<div>Dashboard</div>} />
        {/* <Route element={<MainLayout />}>
          <Route index path={"/"} element={<Dashboard />} />
          <Route path="apply" element={<ApplySwMileage />} />
          <Route path="history/*">
            <Route index element={<SwMileageHistory />} />
            <Route path=":id" element={<SwMileageHistoryDetail />} />
          </Route>
        </Route> */}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
