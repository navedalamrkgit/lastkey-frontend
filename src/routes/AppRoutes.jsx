import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import LandingLayout from "../components/layout/LandingLayout";

import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import DocumentAnalysisPage from "../pages/documents/DocumentAnalysisPage";
import DocumentDetailsPage from "../pages/documents/DocumentDetailsPage";
import DocumentPreviewPage from "../pages/documents/DocumentPreviewPage";
import DocumentsPage from "../pages/documents/DocumentsPage";
import DocumentUploadPage from "../pages/documents/DocumentUploadPage";

import AddNomineePage from "../pages/nominees/AddNomineePage";
import NomineeDetailsPage from "../pages/nominees/NomineeDetailsPage";
import NomineePermissionsPage from "../pages/nominees/NomineePermissionsPage";
import NomineesPage from "../pages/nominees/NomineesPage";

import CreateEmergencyRequestPage from "../pages/emergency/CreateEmergencyRequestPage";
import EmergencyDashboardPage from "../pages/emergency/EmergencyDashboardPage";
import EmergencyDetailsPage from "../pages/emergency/EmergencyDetailsPage";
import EmergencyPortalPage from "../pages/emergency/EmergencyPortalPage";
import EmergencyVerifyPage from "../pages/emergency/EmergencyVerifyPage";

import NotificationsPage from "../pages/notifications/NotificationsPage";

import AccountSettingsPage from "../pages/profile/AccountSettingsPage";
import ChangePasswordPage from "../pages/profile/ChangePasswordPage";
import ProfilePage from "../pages/profile/ProfilePage";

import ActiveSessionsPage from "../pages/security/ActiveSessionsPage";
import LoginActivityPage from "../pages/security/LoginActivityPage";
import SecurityCenterPage from "../pages/security/SecurityCenterPage";

import AboutPage from "../pages/public/AboutPage";
import ContactPage from "../pages/public/ContactPage";
import FeaturesPage from "../pages/public/FeaturesPage";
import LandingPage from "../pages/public/LandingPage";
import LegalPage from "../pages/public/LegalPage";
import PricingPage from "../pages/public/PricingPage";
import SecurityPage from "../pages/public/SecurityPage";

import ForbiddenPage from "../pages/errors/ForbiddenPage";
import NotFoundPage from "../pages/errors/NotFoundPage";
import ServerErrorPage from "../pages/errors/ServerErrorPage";
import UnauthorizedPage from "../pages/errors/UnauthorizedPage";

import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import { ROUTES } from "../utils/routePaths";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public website */}

      <Route element={<LandingLayout />}>
        <Route
          path={ROUTES.HOME}
          element={<LandingPage />}
        />

        <Route
          path={ROUTES.FEATURES}
          element={<FeaturesPage />}
        />

        <Route
          path={ROUTES.SECURITY}
          element={<SecurityPage />}
        />

        <Route
          path={ROUTES.PRICING}
          element={<PricingPage />}
        />

        <Route
          path={ROUTES.ABOUT}
          element={<AboutPage />}
        />

        <Route
          path={ROUTES.CONTACT}
          element={<ContactPage />}
        />

        <Route
          path={ROUTES.PRIVACY}
          element={
            <LegalPage type="privacy" />
          }
        />

        <Route
          path={ROUTES.TERMS}
          element={
            <LegalPage type="terms" />
          }
        />

        <Route
          path={ROUTES.LEGAL}
          element={<LegalPage />}
        />
      </Route>

      {/* Logged-out authentication */}

      <Route element={<PublicRoute />}>
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage />}
        />

        <Route
          path={ROUTES.REGISTER}
          element={<RegisterPage />}
        />

        <Route
          path={ROUTES.VERIFY_EMAIL}
          element={<VerifyEmailPage />}
        />

        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />

        <Route
          path={ROUTES.RESET_PASSWORD}
          element={<ResetPasswordPage />}
        />
      </Route>

      {/* Protected user application */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={<DashboardPage />}
          />

          <Route
            path={ROUTES.DOCUMENTS}
            element={<DocumentsPage />}
          />

          <Route
            path={ROUTES.DOCUMENT_UPLOAD}
            element={<DocumentUploadPage />}
          />

          <Route
            path={ROUTES.DOCUMENT_DETAILS}
            element={<DocumentDetailsPage />}
          />

          <Route
            path={ROUTES.DOCUMENT_PREVIEW}
            element={<DocumentPreviewPage />}
          />

          <Route
            path={ROUTES.DOCUMENT_ANALYSIS}
            element={<DocumentAnalysisPage />}
          />

          <Route
            path={ROUTES.NOMINEES}
            element={<NomineesPage />}
          />

          <Route
            path={ROUTES.ADD_NOMINEE}
            element={<AddNomineePage />}
          />

          <Route
            path={ROUTES.NOMINEE_DETAILS}
            element={<NomineeDetailsPage />}
          />

          <Route
            path={ROUTES.NOMINEE_PERMISSIONS}
            element={<NomineePermissionsPage />}
          />

          <Route
            path={ROUTES.EMERGENCY}
            element={<EmergencyDashboardPage />}
          />

          <Route
            path={ROUTES.CREATE_EMERGENCY}
            element={<CreateEmergencyRequestPage />}
          />

          <Route
            path={ROUTES.EMERGENCY_DETAILS}
            element={<EmergencyDetailsPage />}
          />

          <Route
            path={ROUTES.EMERGENCY_VERIFY}
            element={<EmergencyVerifyPage />}
          />

          <Route
            path={ROUTES.NOTIFICATIONS}
            element={<NotificationsPage />}
          />

          <Route
            path={ROUTES.PROFILE}
            element={<ProfilePage />}
          />

          <Route
            path={ROUTES.SETTINGS}
            element={<AccountSettingsPage />}
          />

          <Route
            path={ROUTES.CHANGE_PASSWORD}
            element={<ChangePasswordPage />}
          />

          <Route
            path={ROUTES.SECURITY_CENTER}
            element={<SecurityCenterPage />}
          />

          <Route
            path={ROUTES.LOGIN_ACTIVITY}
            element={<LoginActivityPage />}
          />

          <Route
            path={ROUTES.ACTIVE_SESSIONS}
            element={<ActiveSessionsPage />}
          />
        </Route>
      </Route>

      {/* Public emergency access */}

      <Route
        path={ROUTES.EMERGENCY_ACCESS}
        element={<EmergencyPortalPage />}
      />

      {/* Admin routes */}

      <Route element={<AdminRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <div className="p-8">
                <h1 className="text-3xl font-black text-slate-950">
                  Admin Dashboard
                </h1>
              </div>
            }
          />

          <Route
            path={ROUTES.ADMIN_USERS}
            element={
              <div className="p-8">
                <h1 className="text-3xl font-black text-slate-950">
                  User Management
                </h1>
              </div>
            }
          />

          <Route
            path={ROUTES.ADMIN_AUDIT_LOGS}
            element={
              <div className="p-8">
                <h1 className="text-3xl font-black text-slate-950">
                  Audit Logs
                </h1>
              </div>
            }
          />

          <Route
            path={ROUTES.ADMIN_EMERGENCY_REVIEW}
            element={
              <div className="p-8">
                <h1 className="text-3xl font-black text-slate-950">
                  Emergency Reviews
                </h1>
              </div>
            }
          />
        </Route>
      </Route>

      {/* Error routes */}

      <Route
        path={ROUTES.UNAUTHORIZED}
        element={<UnauthorizedPage />}
      />

      <Route
        path={ROUTES.FORBIDDEN}
        element={<ForbiddenPage />}
      />

      <Route
        path={ROUTES.SERVER_ERROR}
        element={<ServerErrorPage />}
      />

      <Route
        path="/home"
        element={
          <Navigate
            to={ROUTES.HOME}
            replace
          />
        }
      />

      <Route
        path={ROUTES.NOT_FOUND}
        element={<NotFoundPage />}
      />
    </Routes>
  );
}