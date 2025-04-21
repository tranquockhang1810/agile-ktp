import { AuthenRepo } from "@/api/features/authenticate/AuthenRepo";
import { LoginRequestModel } from "@/api/features/authenticate/model/LoginModel";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomStatusCode } from "@/utils/helper/CustomStatus";

interface LoginObserver {
  onLoginStateChanged: (isLoading: boolean, error?: string) => void;
  onLoginSuccess: (data: any) => void;
}

const LoginViewModel = (repo: AuthenRepo) => {
  const { onLogin, localStrings } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [observers] = useState<LoginObserver[]>([]);

  const addObserver = (observer: LoginObserver) => observers.push(observer);
  const removeObserver = (observer: LoginObserver) => {
    const index = observers.indexOf(observer);
    if (index !== -1) observers.splice(index, 1);
  };

  const notifyLoading = (isLoading: boolean, error?: string) =>
    observers.forEach((observer) => observer.onLoginStateChanged(isLoading, error));
  const notifySuccess = (data: any) =>
    observers.forEach((observer) => observer.onLoginSuccess(data));

  const code = useMemo(() => searchParams.get("code"), [searchParams]);
  const error = useMemo(() => searchParams.get("error"), [searchParams]);

  const login = async (data: LoginRequestModel) => {
    try {
      setLoading(true);
      notifyLoading(true);
      const res = await repo.login(data);
  
      if (res?.data && typeof res.data.accessToken === "string") {
        try { 
          onLogin(res.data);
          notifyLoading(false);
          notifySuccess(res.data);
          setTimeout(() => router.replace("/home"), 100);
        } catch (navError) { 
          notifyLoading(false, localStrings.Login.LoginFailed);
        }
      } else { 
        if (res?.error?.code === CustomStatusCode.EmailOrPasswordIsWrong) {
          notifyLoading(false, localStrings.Login.LoginFailed);
        } else if (res?.error?.code === CustomStatusCode.AccountBlockedByAdmin) {
          notifyLoading(false, localStrings.Login.AccountLocked);
        } else {
          notifyLoading(false, localStrings.Login.LoginFailed);
        }
      }
    } catch (error: any) { 
      notifyLoading(false, localStrings.Login.LoginFailed);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      notifyLoading(false, localStrings.Login.LoginFailed);
    }
  }, [error, localStrings]);

  return { login, loading, googleLoading, addObserver, removeObserver };
};

export default LoginViewModel;