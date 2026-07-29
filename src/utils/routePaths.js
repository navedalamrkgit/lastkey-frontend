export const ROUTES = {
  // Public website
  HOME: "/",
  FEATURES: "/features",
  SECURITY: "/security",
  PRICING: "/pricing",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  LEGAL: "/legal",

  // Authentication
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Documents
  DOCUMENTS: "/dashboard/documents",
  DOCUMENT_UPLOAD: "/dashboard/documents/upload",
  DOCUMENT_DETAILS:
    "/dashboard/documents/:documentId",
  DOCUMENT_PREVIEW:
    "/dashboard/documents/:documentId/preview",
  DOCUMENT_ANALYSIS:
    "/dashboard/documents/:documentId/analysis",

  // Nominees
  NOMINEES: "/dashboard/nominees",
  ADD_NOMINEE:
    "/dashboard/nominees/add",
  NOMINEE_DETAILS:
    "/dashboard/nominees/:nomineeId",
  NOMINEE_PERMISSIONS:
    "/dashboard/nominees/:nomineeId/permissions",

  // Emergency
  EMERGENCY:
    "/dashboard/emergency",
  CREATE_EMERGENCY:
    "/dashboard/emergency/create",
  EMERGENCY_DETAILS:
    "/dashboard/emergency/:requestId",
  EMERGENCY_VERIFY:
    "/dashboard/emergency/:requestId/verify",
  EMERGENCY_ACCESS:
    "/emergency-access/:token",

  // Notifications
  NOTIFICATIONS:
    "/dashboard/notifications",

  // Profile and settings
  PROFILE:
    "/dashboard/profile",
  SETTINGS:
    "/dashboard/settings",
  CHANGE_PASSWORD:
    "/dashboard/change-password",

  // Security center
  SECURITY_CENTER:
    "/dashboard/security",
  LOGIN_ACTIVITY:
    "/dashboard/security/login-activity",
  ACTIVE_SESSIONS:
    "/dashboard/security/active-sessions",

  // Admin
  ADMIN_DASHBOARD:
    "/admin/dashboard",
  ADMIN_USERS:
    "/admin/users",
  ADMIN_AUDIT_LOGS:
    "/admin/audit-logs",
  ADMIN_EMERGENCY_REVIEW:
    "/admin/emergency-review",

  // Errors
  UNAUTHORIZED:
    "/unauthorized",
  FORBIDDEN:
    "/forbidden",
  SERVER_ERROR:
    "/server-error",
  NOT_FOUND: "*",
};

export default ROUTES;