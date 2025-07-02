import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://192.168.0.218:3000";
export const api = axios.create({
  baseURL: API_URL,
});

const AUTH_TOKEN_KEY = "my-auth-token"; // Chave para salvar o token no storage

// --- DEFINIÇÃO DAS INTERFACES (TYPESCRIPT) ---

// Representa os dados do usuário que vêm do endpoint /auth/profile
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

// Representa o estado completo da nossa autenticação
interface AuthState {
  token: string | null;
  user: User | null;
  wallet: Wallet | null;
  isAuthenticated: boolean;
}

// O que o nosso contexto vai fornecer para os componentes filhos
interface AuthContextData {
  authState: AuthState;
  isLoading: boolean;
  register(userData: any): Promise<{ success: boolean; error?: string }>;
  login(credentials: any): Promise<{ success: boolean; error?: string }>;
  logout(): void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// --- COMPONENTE PROVIDER ---
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

  // Efeito para carregar o token ao iniciar o app
  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

        if (token) {
          // Se encontramos um token, configuramos o header do axios para todas as futuras requisições
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Buscamos os dados do usuário com o token
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
        // Se o token for inválido ou a API falhar, limpamos tudo
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

      // Armazenar o token
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      // Buscar dados do usuário
      const [userResponse, walletResponse] = await Promise.all([
        api.get<User>("/auth/profile"),
        api.get<Wallet>("/wallet"),
      ]);

      // Atualizar o estado
      setAuthState({
        token: access_token,
        user: userResponse.data,
        wallet: walletResponse.data, // <-- Adicionado
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
      // 1. Tenta registrar o usuário
      await api.post("/auth/register", userData);

      // 2. Se o registro for bem-sucedido, faz o login automaticamente para obter o token
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
    // Limpar tudo
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
