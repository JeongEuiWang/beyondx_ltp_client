import { Routes, Route, Navigate, useLocation } from "react-router";
import { Init, Auth, AdminAuth } from "@/app/RouteGuard";
import Landing from "@/pages/landing";
import { SignIn, SignUp } from "@/pages/auth";
import { useEffect } from "react";
import MainLayout from "@/widget/_frgment/MainLayout";
import Dashboard from "@/pages/dashboard";
import { QuoteCreate, QuoteDetail, QuoteEdit } from "@/pages/quotes";
import Setting from "@/pages/setting/Setting";
import { AdminDashboard, AdminQuoteDetail } from "@/pages/admin";
import AdminLayout from "@/widget/_frgment/AdminLayout";

const RootRouter = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Init />}>
        <Route index element={<Landing />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="/service" element={<Auth />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="quote" element={<QuoteCreate />} />
          <Route path="quote/:id" element={<QuoteDetail />} />
          <Route path="quote/:id/edit" element={<QuoteEdit />} />
          <Route path="settings" element={<Setting />} />
        </Route>
        <Route path="*" element={<Navigate to={"/service"} />} />
      </Route>
      <Route path="/admin" element={<AdminAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="quote/:id" element={<AdminQuoteDetail />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RootRouter;
