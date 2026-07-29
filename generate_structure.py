from pathlib import Path
root = Path('d:/WS/Lastkey/frontend')

folders = [
    'public/images',
    'src/api',
    'src/assets/fonts',
    'src/assets/icons',
    'src/assets/illustrations',
    'src/assets/images',
    'src/components/ui',
    'src/components/branding',
    'src/components/layout',
    'src/components/landing',
    'src/components/auth',
    'src/components/dashboard',
    'src/components/documents',
    'src/components/nominees',
    'src/components/emergency',
    'src/components/notifications',
    'src/components/security',
    'src/components/profile',
    'src/components/shared',
    'src/context',
    'src/hooks',
    'src/pages/public',
    'src/pages/auth',
    'src/pages/dashboard',
    'src/pages/documents',
    'src/pages/nominees',
    'src/pages/emergency',
    'src/pages/notifications',
    'src/pages/security',
    'src/pages/profile',
    'src/pages/admin',
    'src/pages/errors',
    'src/routes',
    'src/schemas',
    'src/services',
    'src/store',
    'src/styles',
    'src/utils',
    'src/config',
]

files = {
    'public/lastkey-logo.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#0f172a"/><text x="50" y="55" fill="#fff" font-size="18" font-family="Arial" text-anchor="middle">LastKey</text></svg>',
    'public/robots.txt': 'User-agent: *\nDisallow:',
    'public/images/auth-security.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="#2563eb"/><text x="60" y="68" fill="#fff" font-size="12" font-family="Arial" text-anchor="middle">Auth</text></svg>',
    'public/images/empty-documents.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect x="20" y="20" width="80" height="80" fill="#e2e8f0"/><text x="60" y="68" fill="#475569" font-size="12" font-family="Arial" text-anchor="middle">Empty Docs</text></svg>',
    'public/images/emergency-access.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><path d="M60 20 L100 80 H20 Z" fill="#dc2626"/><text x="60" y="90" fill="#fff" font-size="12" font-family="Arial" text-anchor="middle">Emergency</text></svg>',
    'public/images/landing-hero.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="#10b981"/><text x="60" y="68" fill="#fff" font-size="12" font-family="Arial" text-anchor="middle">Landing</text></svg>',
    'public/images/secure-vault.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect x="25" y="35" width="70" height="55" fill="#0f172a"/><circle cx="60" cy="62" r="12" fill="#f8fafc"/></svg>',
    '.env': 'VITE_API_URL=http://localhost:4000/api\n',
    '.env.example': 'VITE_API_URL=https://api.example.com\n',
    'eslint.config.js': 'export default {\n  root: true,\n  extends: ["eslint:recommended", "plugin:react/recommended"],\n  parserOptions: {\n    ecmaVersion: 2020,\n    sourceType: "module",\n    ecmaFeatures: { jsx: true },\n  },\n  settings: { react: { version: "detect" } },\n  env: { browser: true, node: true, es2021: true },\n  rules: {},\n};\n',
    'vercel.json': '{\n  "version": 2,\n  "builds": [{ "src": "vite.config.js", "use": "@vercel/static-build" }],\n  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]\n}\n',
}

js_files = [
    'src/api/axiosClient.js','src/api/authApi.js','src/api/dashboardApi.js','src/api/documentApi.js','src/api/categoryApi.js','src/api/nomineeApi.js','src/api/emergencyApi.js','src/api/notificationApi.js','src/api/profileApi.js','src/api/securityApi.js','src/api/auditApi.js','src/api/aiApi.js',
    'src/context/AuthContext.jsx','src/context/SidebarContext.jsx','src/context/ThemeContext.jsx','src/context/NotificationContext.jsx',
    'src/routes/AppRoutes.jsx','src/routes/ProtectedRoute.jsx','src/routes/PublicRoute.jsx','src/routes/AdminRoute.jsx','src/routes/routeConfig.js',
    'src/schemas/authSchema.js','src/schemas/documentSchema.js','src/schemas/nomineeSchema.js','src/schemas/emergencySchema.js','src/schemas/profileSchema.js','src/schemas/passwordSchema.js',
    'src/services/tokenService.js','src/services/storageService.js','src/services/sessionService.js','src/services/fileService.js',
    'src/store/authStore.js','src/store/uiStore.js','src/store/notificationStore.js',
    'src/config/appConfig.js','src/config/navigationConfig.js','src/config/permissions.js','src/config/themeConfig.js',
    'src/hooks/useAuth.js','src/hooks/useAxiosPrivate.js','src/hooks/useDebounce.js','src/hooks/useDocumentUpload.js','src/hooks/useFilePreview.js','src/hooks/useLocalStorage.js','src/hooks/useMediaQuery.js','src/hooks/useNotifications.js','src/hooks/usePagination.js','src/hooks/useOutsideClick.js','src/hooks/useTheme.js',
    'src/styles/animations.css','src/styles/components.css','src/styles/globals.css','src/styles/variables.css',
    'src/utils/cn.js','src/utils/constants.js','src/utils/errorHandler.js','src/utils/fileUtils.js','src/utils/formatDate.js','src/utils/formatFileSize.js','src/utils/formatName.js','src/utils/getInitials.js','src/utils/queryKeys.js','src/utils/routePaths.js','src/utils/validators.js',
    'src/pages/public/LandingPage.jsx','src/pages/public/FeaturesPage.jsx','src/pages/public/SecurityPage.jsx','src/pages/public/PricingPage.jsx','src/pages/public/AboutPage.jsx','src/pages/public/PrivacyPage.jsx','src/pages/public/TermsPage.jsx',
    'src/pages/auth/LoginPage.jsx','src/pages/auth/RegisterPage.jsx','src/pages/auth/VerifyEmailPage.jsx','src/pages/auth/ForgotPasswordPage.jsx','src/pages/auth/ResetPasswordPage.jsx',
    'src/pages/dashboard/DashboardPage.jsx',
    'src/pages/documents/DocumentsPage.jsx','src/pages/documents/UploadDocumentPage.jsx','src/pages/documents/DocumentDetailsPage.jsx','src/pages/documents/DocumentPreviewPage.jsx','src/pages/documents/DocumentAnalysisPage.jsx',
    'src/pages/nominees/NomineesPage.jsx','src/pages/nominees/AddNomineePage.jsx','src/pages/nominees/NomineeDetailsPage.jsx','src/pages/nominees/NomineePermissionsPage.jsx',
    'src/pages/emergency/EmergencyPage.jsx','src/pages/emergency/CreateEmergencyPage.jsx','src/pages/emergency/EmergencyDetailsPage.jsx','src/pages/emergency/EmergencyVerificationPage.jsx','src/pages/emergency/EmergencyAccessPortalPage.jsx',
    'src/pages/notifications/NotificationsPage.jsx',
    'src/pages/security/SecurityCenterPage.jsx','src/pages/security/LoginActivityPage.jsx','src/pages/security/ActiveSessionsPage.jsx',
    'src/pages/profile/ProfilePage.jsx','src/pages/profile/AccountSettingsPage.jsx','src/pages/profile/ChangePasswordPage.jsx',
    'src/pages/admin/AdminDashboardPage.jsx','src/pages/admin/UsersPage.jsx','src/pages/admin/AuditLogsPage.jsx','src/pages/admin/EmergencyReviewPage.jsx',
    'src/pages/errors/NotFoundPage.jsx','src/pages/errors/UnauthorizedPage.jsx','src/pages/errors/ForbiddenPage.jsx','src/pages/errors/ServerErrorPage.jsx'
]

components = {
    'src/components/ui': ['Alert','Avatar','Badge','Button','Card','Checkbox','ConfirmDialog','Dropdown','EmptyState','ErrorState','FileDropzone','FormField','IconButton','Input','Loader','Modal','Pagination','PasswordInput','ProgressBar','SearchInput','Select','Skeleton','StatCard','Switch','Table','Tabs','Textarea','Tooltip'],
    'src/components/branding': ['Logo','BrandMark','BrandLoader'],
    'src/components/layout': ['AppLayout','AuthLayout','DashboardHeader','LandingLayout','MobileSidebar','PageContainer','PageHeader','Sidebar','SidebarItem','Topbar'],
    'src/components/landing': ['LandingNavbar','HeroSection','FeaturesSection','SecuritySection','HowItWorksSection','EmergencySection','TestimonialSection','PricingSection','CTASection','LandingFooter'],
    'src/components/auth': ['AuthHeader','AuthSidePanel','LoginForm','RegisterForm','ForgotPasswordForm','ResetPasswordForm','OTPInput','PasswordStrength','SecurityTrustBadge'],
    'src/components/dashboard': ['DashboardOverview','SecurityScoreCard','StorageUsageCard','RecentActivity','RecentDocuments','DashboardStats','EmergencyStatusCard','QuickActions','ExpiryReminderCard','VaultHealthCard'],
    'src/components/documents': ['DocumentCard','DocumentGrid','DocumentTable','DocumentFilters','DocumentSearch','DocumentPreview','DocumentDetails','DocumentUploadModal','DocumentUploadProgress','DocumentActions','DocumentCategoryBadge','DocumentExpiryBadge','AiDocumentSummary','AiDocumentAnalysis','VaultEmptyState'],
    'src/components/nominees': ['NomineeCard','NomineeList','AddNomineeModal','EditNomineeModal','NomineeDetails','NomineeVerificationBadge','NomineePermissions','AssignedDocuments','NomineeEmptyState'],
    'src/components/emergency': ['EmergencyOverview','EmergencyRequestCard','EmergencyTimeline','EmergencyStatusBadge','CreateEmergencyRequest','EmergencyOTPVerification','EmergencyEvidenceUpload','EmergencyAccessDetails','ReleasedDocuments'],
    'src/components/notifications': ['NotificationDropdown','NotificationItem','NotificationList','NotificationFilters','NotificationEmptyState'],
    'src/components/security': ['SecurityScore','LoginActivity','ActiveSessions','SecurityRecommendations','ChangePasswordCard','TwoFactorCard','DeviceCard','RiskAlertCard'],
    'src/components/profile': ['ProfileHeader','ProfileForm','ProfileImageUploader','PersonalInformationCard','AccountStatusCard','DeleteAccountCard'],
    'src/components/shared': ['DataTableToolbar','FilterDrawer','MobileBottomNav','SectionHeader','StatusIndicator']
}


def make_dirs():
    for folder in folders:
        p = root / folder
        p.mkdir(parents=True, exist_ok=True)
    print('dirs done')


def file_content(path):
    if path.name.endswith('.js'):
        if path.name == 'routeConfig.js':
            return 'export const routeConfig = []\n'
        return f'export const {path.stem} = {{}}\n'
    if path.name.endswith('.css'):
        return f'/* {path.name} */\n'
    return f'import React from "react"\n\nconst {path.stem} = () => (\n  <div>{path.stem}</div>\n)\n\nexport default {path.stem}\n'


def create_files():
    for rel, content in files.items():
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        if not path.exists():
            path.write_text(content, encoding='utf-8')
    for rel in js_files:
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        if not path.exists():
            path.write_text(file_content(path), encoding='utf-8')
    for folder, names in components.items():
        for name in names:
            path = root / f'{folder}/{name}.jsx'
            path.parent.mkdir(parents=True, exist_ok=True)
            if not path.exists():
                path.write_text(file_content(path), encoding='utf-8')
    print('files done')

if __name__ == '__main__':
    make_dirs()
    create_files()
