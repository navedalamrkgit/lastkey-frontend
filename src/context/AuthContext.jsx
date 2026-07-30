import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authApi } from "../api/authApi";
import {
  cancelAllRequests,
  isRequestCancelled,
} from "../api/axiosClient";
import {
  tokenService,
} from "../services/tokenService";
import { ROUTES } from "../utils/routePaths";

export const AuthContext =
  createContext(null);

function extractResponsePayload(response) {
  const responseBody =
    response?.data ?? response;

  return (
    responseBody?.data ??
    responseBody?.result ??
    responseBody
  );
}

function extractAuthenticatedUser(
  payload,
  credentials = {},
) {
  const responseUser =
    payload?.user ??
    payload?.userDetails ??
    payload?.profile ??
    payload?.authenticatedUser ??
    null;

  if (responseUser) {
    return responseUser;
  }

  const email =
    payload?.email ??
    payload?.userEmail ??
    credentials?.email ??
    null;

  const firstName =
    payload?.firstName ?? "";

  const lastName =
    payload?.lastName ?? "";

  const role =
    payload?.role ??
    payload?.roles ??
    null;

  if (
    email ||
    firstName ||
    lastName ||
    role
  ) {
    return {
      id:
        payload?.userId ??
        payload?.id ??
        null,

      email,
      firstName,
      lastName,
      role,
    };
  }

  return null;
}

function redirectToLogin() {
  const loginRoute =
    ROUTES.LOGIN || "/login";

  if (
    window.location.pathname !==
    loginRoute
  ) {
    window.location.replace(
      loginRoute,
    );
  }
}

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [
    isInitializing,
    setIsInitializing,
  ] = useState(true);

  const [
    isLoggingOut,
    setIsLoggingOut,
  ] = useState(false);

  useEffect(() => {
    function initializeAuthentication() {
      try {
        const storedUser =
          tokenService.getUser();

        const hasSession =
          tokenService.hasSession();

        if (
          storedUser &&
          hasSession
        ) {
          setUser(storedUser);
        } else {
          tokenService.clearSession();
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Authentication initialization failed:",
          error,
        );

        tokenService.clearSession();
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    }

    initializeAuthentication();
  }, []);

  const login = useCallback(
    async (credentials) => {
      const response =
        await authApi.login(
          credentials,
        );

      const payload =
        extractResponsePayload(
          response,
        );

      if (import.meta.env.DEV) {
        console.log(
          "Login API response:",
          response.data,
        );

        console.log(
          "Normalized login payload:",
          payload,
        );
      }

      const accessToken =
        payload?.accessToken ??
        payload?.access_token ??
        payload?.token ??
        payload?.jwtToken;

      const refreshToken =
        payload?.refreshToken ??
        payload?.refresh_token;

      if (!accessToken) {
        throw new Error(
          "Login succeeded, but the access token was not found in the server response.",
        );
      }

      const authenticatedUser =
        extractAuthenticatedUser(
          payload,
          credentials,
        );

      const normalizedSession = {
        ...payload,

        accessToken,

        refreshToken,

        user:
          authenticatedUser,
      };

      tokenService.saveSession(
        normalizedSession,
      );

      if (authenticatedUser) {
        tokenService.saveUser(
          authenticatedUser,
        );

        setUser(
          authenticatedUser,
        );
      } else {
        const savedUser =
          tokenService.getUser();

        if (savedUser) {
          setUser(savedUser);
        } else {
          throw new Error(
            "Login succeeded, but user information was not returned by the server.",
          );
        }
      }

      return normalizedSession;
    },
    [],
  );

  const register = useCallback(
    async (registrationData) => {
      const response =
        await authApi.register(
          registrationData,
        );

      return extractResponsePayload(
        response,
      );
    },
    [],
  );

  const verifyEmail = useCallback(
    async (verificationData) => {
      const response =
        await authApi.verifyEmail(
          verificationData,
        );

      return extractResponsePayload(
        response,
      );
    },
    [],
  );

  const resendVerificationOtp =
    useCallback(
      async (email) => {
        const response =
          await authApi
            .resendVerificationOtp(
              email,
            );

        return extractResponsePayload(
          response,
        );
      },
      [],
    );

  const forgotPassword =
    useCallback(
      async (email) => {
        const response =
          await authApi
            .forgotPassword(
              email,
            );

        return extractResponsePayload(
          response,
        );
      },
      [],
    );

  const resetPassword =
    useCallback(
      async (resetData) => {
        const response =
          await authApi
            .resetPassword(
              resetData,
            );

        return extractResponsePayload(
          response,
        );
      },
      [],
    );

  const logout = useCallback(
    async () => {
      if (isLoggingOut) {
        return;
      }

      setIsLoggingOut(true);

      const refreshToken =
        tokenService
          .getRefreshToken();

      /*
       * First cancel all dashboard/profile/
       * notification requests.
       */
      cancelAllRequests(
        "User logged out",
      );

      /*
       * Clear local authentication immediately.
       * UI does not wait for backend logout.
       */
      tokenService.clearSession();
      setUser(null);

      /*
       * Redirect immediately so protected
       * components are unmounted.
       */
      redirectToLogin();

      /*
       * Backend logout is best-effort.
       * A slow backend must not block UI logout.
       */
      if (refreshToken) {
        try {
          await authApi.logout(
            refreshToken,
          );
        } catch (error) {
          if (
            !isRequestCancelled(
              error,
            )
          ) {
            console.warn(
              "Backend logout could not be completed:",
              error?.response?.data
                ?.message ||
                error?.message,
            );
          }
        }
      }

      setIsLoggingOut(false);
    },
    [isLoggingOut],
  );

  const updateUser = useCallback(
    (updatedUserData) => {
      setUser((currentUser) => {
        if (!currentUser) {
          return currentUser;
        }

        const updatedUser = {
          ...currentUser,
          ...updatedUserData,
        };

        tokenService.saveUser(
          updatedUser,
        );

        return updatedUser;
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      user,

      isAuthenticated:
        Boolean(
          user &&
          tokenService.hasSession(),
        ),

      isInitializing,

      isLoggingOut,

      login,

      register,

      verifyEmail,

      resendVerificationOtp,

      forgotPassword,

      resetPassword,

      logout,

      updateUser,
    }),
    [
      user,
      isInitializing,
      isLoggingOut,
      login,
      register,
      verifyEmail,
      resendVerificationOtp,
      forgotPassword,
      resetPassword,
      logout,
      updateUser,
    ],
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}