import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://192.168.0.112:3000";
export const api = axios.create({
  baseURL: API_URL,
});

const AUTH_TOKEN_KEY = "my-auth-token";

interface User {
  id: string;
  email: string;
  name: string;
}

interface Wallet {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  currency: string;
  isActive: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  wallet: Wallet | null;
  isAuthenticated: boolean;
}

interface AuthContextData {
  authState: AuthState;
  isLoading: boolean;
  register(userData: any): Promise<{ success: boolean; error?: string }>;
  login(credentials: any): Promise<{ success: boolean; error?: string }>;
  logout(): void;
  updateWallet(walletData: Partial<Wallet>): void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
    wallet: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const updateWallet = (walletData: Partial<Wallet>) => {
    setAuthState((prevState) => ({
      ...prevState,
      wallet: prevState.wallet ? { ...prevState.wallet, ...walletData } : null,
    }));
  };

  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const [userResponse, walletResponse] = await Promise.all([
            api.get<User>("/auth/profile"),
            api.get<Wallet>("/wallet"),
          ]);

          setAuthState({
            token,
            user: userResponse.data,
            isAuthenticated: true,
            wallet: walletResponse.data,
          });
        }
      } catch (error) {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        console.error("Erro ao carregar sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokenAndUser();
  }, []);

  const login = async (
    credentials: any
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { access_token } = response.data;

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      const [userResponse, walletResponse] = await Promise.all([
        api.get<User>("/auth/profile"),
        api.get<Wallet>("/wallet"),
      ]);

      setAuthState({
        token: access_token,
        user: userResponse.data,
        wallet: walletResponse.data,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message;
      console.error("Erro no login:", errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (
    userData: any
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await api.post("/auth/register", userData);

      return await login({
        email: userData.email,
        password: userData.password,
      });
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message;
      console.error("Erro no registro:", errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    delete api.defaults.headers.common["Authorization"];
    setAuthState({
      token: null,
      user: null,
      wallet: null,
      isAuthenticated: false,
    });
  };

  const value: AuthContextData = {
    authState,
    isLoading,
    register,
    login,
    logout,
    updateWallet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
