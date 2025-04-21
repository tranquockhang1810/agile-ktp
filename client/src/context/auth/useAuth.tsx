"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { AuthContextType } from "./authContextType";
import { VnLocalizedStrings } from "@/utils/localizedStrings/vietnam";
import { ENGLocalizedStrings } from "@/utils/localizedStrings/english";
import translateLanguage from "../../utils/i18n/translateLanguage";
import { useRouter } from "next/navigation";
import { UserModel, LoginResponseModel } from "../../api/features/authenticate/model/LoginModel";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface DecodedToken extends JwtPayload {
  // Add custom fields if needed, e.g., userId
}

class AuthManager {
  private static instance: AuthManager | null = null;
  private localStrings: any = VnLocalizedStrings;
  private language: "vi" | "en" = "vi";
  private user: UserModel | null = null;
  private isAuthenticated: boolean = false;
  private router: AppRouterInstance | null = null;
  private listeners: Set<() => void> = new Set();

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public setRouter(router: AppRouterInstance) {
    if (!this.router) {
      this.router = router;
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getLocalStrings() {
    return this.localStrings;
  }

  public getLanguage() {
    return this.language;
  }

  public getUser() {
    return this.user;
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }

  public checkLanguage() {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedLanguage = localStorage.getItem("language");
      const lang = storedLanguage === "vi" ? "vi" : "en";
      if (this.language !== lang) {
        this.language = lang;
        this.localStrings = lang === "vi" ? VnLocalizedStrings : ENGLocalizedStrings;
        this.notifyListeners();
      } else if (!this.localStrings) {
        this.localStrings = lang === "vi" ? VnLocalizedStrings : ENGLocalizedStrings;
        this.notifyListeners();
      }
    } else if (!this.localStrings) {
      this.localStrings = this.language === "vi" ? VnLocalizedStrings : ENGLocalizedStrings;
    }
  }

  public changeLanguage() {
    if (typeof window !== "undefined" && window.localStorage) {
      const lng = this.language === "vi" ? "en" : "vi";
      translateLanguage(lng)
        .then(() => {
          localStorage.setItem("language", lng);
          this.language = lng;
          this.localStrings = lng === "vi" ? VnLocalizedStrings : ENGLocalizedStrings;
          this.notifyListeners();
        })
        .catch((error) => {
          console.error("Error changing language:", error);
        });
    }
  }

  public onLogin(loginData: LoginResponseModel) {
    if (!loginData || !loginData.user || typeof loginData.accesstoken !== "string" || loginData.accesstoken.trim() === "") {
      console.error("Invalid login data");
      return;
    }

    const { user, accesstoken } = loginData;

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(accesstoken);
        const expiresAt = decodedToken.exp ? new Date(decodedToken.exp * 1000) : null;

        if (expiresAt && expiresAt < new Date()) {
          console.warn("Token expired");
          this.handleLogoutInternal();
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accesstoken", accesstoken);

        const cookieOptions = `path=/; ${
          window.location.protocol === "https:" ? "SameSite=None; Secure" : "SameSite=Lax"
        }${expiresAt ? `; expires=${expiresAt.toUTCString()}` : ""}`;

        document.cookie = `accesstoken=${accesstoken}; ${cookieOptions}`;

        this.isAuthenticated = true;
        this.user = user;
        console.log("User logged in:", this.user); // Debug log
        this.notifyListeners();
        this.router?.push("/home");
      } catch (error) {
        console.error("Error during login:", error);
        this.handleLogoutInternal();
      }
    } else {
      try {
        jwtDecode<DecodedToken>(accesstoken);
        this.isAuthenticated = true;
        this.user = user;
        this.notifyListeners();
      } catch (error) {
        console.error("Error decoding token:", error);
        this.isAuthenticated = false;
        this.user = null;
        this.notifyListeners();
      }
    }
  }

  public onUpdateProfile(updatedUser: UserModel) {
    if (!updatedUser) {
      return;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    this.user = updatedUser;
    this.notifyListeners();
  }

  private handleLogoutInternal() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("accesstoken");
      document.cookie = "accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
      document.cookie = "accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";
    }
    this.isAuthenticated = false;
    this.user = null;
    this.notifyListeners();
  }

  public async onLogout() {
    this.handleLogoutInternal();
    this.router?.push("/login");
  }

  public isLoginUser(userId: string): boolean {
    return !!this.user && this.user.id === userId;
  }

  public checkAuthStatus() {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedAccessToken = localStorage.getItem("accesstoken");
      const storedUser = localStorage.getItem("user");

      console.log("Stored Access Token:", storedAccessToken); // Debug log
      console.log("Stored User:", storedUser); // Debug log

      if (storedAccessToken && storedUser) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(storedAccessToken);
          const expiresAt = decodedToken.exp ? new Date(decodedToken.exp * 1000) : null;

          if (!expiresAt || expiresAt < new Date()) {
            console.warn("Token expired or invalid");
            this.handleLogoutInternal();
            return;
          }

          this.user = JSON.parse(storedUser) as UserModel;
          this.isAuthenticated = true;
          console.log("Auth status updated:", this.user); // Debug log
        } catch (error) {
          console.error("Error checking auth status:", error);
          this.handleLogoutInternal();
        }
      } else {
        console.warn("No token or user found in localStorage");
        this.handleLogoutInternal();
      }
    } else {
      this.isAuthenticated = false;
      this.user = null;
    }
    this.notifyListeners();
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const authManager = useMemo(() => AuthManager.getInstance(), []);
  const [isInitialising, setIsInitialising] = useState(true);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    authManager.setRouter(router);

    const unsubscribe = authManager.subscribe(() => {
      forceUpdate({});
    });

    // Check language and authentication status
    authManager.checkLanguage();
    authManager.checkAuthStatus();
    setIsInitialising(false); // Mark initialization complete

    return unsubscribe;
  }, [authManager, router]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      onLogin: (data) => authManager.onLogin(data),
      onLogout: () => authManager.onLogout(),
      localStrings: authManager.getLocalStrings(),
      changeLanguage: () => authManager.changeLanguage(),
      language: authManager.getLanguage(),
      setLanguage: () => {},
      isAuthenticated: authManager.getIsAuthenticated(),
      user: authManager.getUser(),
      onUpdateProfile: (user) => authManager.onUpdateProfile(user),
      isLoginUser: (id) => authManager.isLoginUser(id),
    }),
    [authManager]
  );

  // Show loading state while initializing
  if (isInitialising) {
    return <div>Đang tải...</div>;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};