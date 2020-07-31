import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Forseti:token');
    const user = localStorage.getItem('@Forseti:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth/login', { email, password });

    const { access_token: token, user } = response.data;
    localStorage.setItem('@Forseti:token', token);
    localStorage.setItem('@Forseti:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signUp = useCallback(async ({ name, email, password, password_confirmation }) => {
    await api.post('auth/register', { name, email, password, password_confirmation });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Forseti:token');
    localStorage.removeItem('@Forseti:user');

    delete api.defaults.headers.authorization;

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Forseti:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be user within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
