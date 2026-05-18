import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AppShell } from "./layouts/AppShell";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { RoleRoute } from "./routes/RoleRoute";
import { useAuthStore } from "./store/authStore";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LeadsPage = lazy(() => import("./pages/leads/LeadsPage"));
const LeadDetailsPage = lazy(() => import("./pages/leads/LeadDetailsPage"));
const LeadFormPage = lazy(() => import("./pages/leads/LeadFormPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App(): JSX.Element {
  const theme = useAuthStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-slate-300">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="leads/new" element={<RoleRoute allowed={["Admin"]}><LeadFormPage mode="create" /></RoleRoute>} />
            <Route path="leads/:id" element={<LeadDetailsPage />} />
            <Route path="leads/:id/edit" element={<RoleRoute allowed={["Admin"]}><LeadFormPage mode="edit" /></RoleRoute>} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
