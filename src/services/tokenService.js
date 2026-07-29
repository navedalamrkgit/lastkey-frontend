const ACCESS_TOKEN_KEY =
  "lastkey_access_token";

const REFRESH_TOKEN_KEY =
  "lastkey_refresh_token";

const USER_KEY =
  "lastkey_user";

function safeParse(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export const tokenService = {
  getAccessToken() {
    return localStorage.getItem(
      ACCESS_TOKEN_KEY,
    );
  },

  getRefreshToken() {
    return localStorage.getItem(
      REFRESH_TOKEN_KEY,
    );
  },

  setTokens({
    accessToken,
    refreshToken,
  }) {
    if (accessToken) {
      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        accessToken,
      );
    } else {
      localStorage.removeItem(
        ACCESS_TOKEN_KEY,
      );
    }

    if (refreshToken) {
      localStorage.setItem(
        REFRESH_TOKEN_KEY,
        refreshToken,
      );
    } else {
      localStorage.removeItem(
        REFRESH_TOKEN_KEY,
      );
    }
  },

  setAccessToken(accessToken) {
    if (!accessToken) {
      localStorage.removeItem(
        ACCESS_TOKEN_KEY,
      );

      return;
    }

    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      accessToken,
    );
  },

  setRefreshToken(refreshToken) {
    if (!refreshToken) {
      localStorage.removeItem(
        REFRESH_TOKEN_KEY,
      );

      return;
    }

    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      refreshToken,
    );
  },

  getUser() {
    return safeParse(
      localStorage.getItem(
        USER_KEY,
      ),
    );
  },

  setUser(user) {
    if (!user) {
      localStorage.removeItem(
        USER_KEY,
      );

      return;
    }

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user),
    );
  },

  /*
   * AuthContext currently calls saveUser().
   * Keep this alias so both saveUser() and setUser() work.
   */
  saveUser(user) {
    this.setUser(user);
  },

  saveSession(sessionData) {
    if (!sessionData) {
      return;
    }

    const {
      accessToken,
      refreshToken,
      user,
    } = sessionData;

    if (accessToken || refreshToken) {
      this.setTokens({
        accessToken,
        refreshToken,
      });
    }

    if (user) {
      this.setUser(user);
    }
  },

  clearTokens() {
    localStorage.removeItem(
      ACCESS_TOKEN_KEY,
    );

    localStorage.removeItem(
      REFRESH_TOKEN_KEY,
    );
  },

  clearUser() {
    localStorage.removeItem(
      USER_KEY,
    );
  },

  clearSession() {
    this.clearTokens();
    this.clearUser();
  },

  hasSession() {
    return Boolean(
      this.getAccessToken() ||
        this.getRefreshToken(),
    );
  },

  hasAccessToken() {
    return Boolean(
      this.getAccessToken(),
    );
  },
};