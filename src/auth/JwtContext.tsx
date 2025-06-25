/* AuthProvider.tsx */
import axios from '@/utils/axios';
import { isValidToken, setSession } from './utils';
import localStorageAvailable from './localStorageAvailable';
import { createContext, useReducer, useCallback, useMemo, useEffect, ReactNode, Reducer } from 'react';

// User yapısı projenizde hangi alanlar varsa ona göre genişletebilirsiniz
export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: any;
}

export interface IUsage {
  // usage endpoint’inden dönen veriye göre düzenleyebilirsiniz
  [key: string]: any;
}

export interface ITemplate {
  // template/findAll endpoint’inden dönen veriye göre düzenleyebilirsiniz
  [key: string]: any;
}

// Auth State
interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
}

// Olası Action tipleri
type AuthAction =
  | {
    type: 'INITIAL';
    payload: {
      isAuthenticated: boolean;
      user: IUser | null;
    };
  }
  | {
    type: 'LOGIN';
    payload: {
      user: IUser;
    };
  }
  | {
    type: 'REGISTER';
    payload: {
      user: IUser;
    };
  }
  | {
    type: 'LOGOUT';
  };

// Context'te sağlanacak metotların tipi
interface AuthContextValue extends AuthState {
  method: 'jwt';
  login: (username: string, password: string) => Promise<void>;
  register: (
    name: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

// Provider'a verilecek props
interface AuthProviderProps {
  children: ReactNode;
}


// 2) Başlangıç State’i
const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

// 3) Reducer
const reducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };

    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// 4) AuthContext oluşturma
export const AuthContext = createContext<AuthContextValue | null>(null);

// 5) AuthProvider Bileşeni
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();

  // initialize
  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const response = await axios.get('auth/me');
        console.log("User", response.data);

        const user: IUser = response.data;

        if (user) {
          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // login
  const login = useCallback(
    async (username: string, password: string) => {

      console.log("username", username);
      console.log("password", password);

      try {
        // Username password ve expiresInMins(Token geçerlilik süresi).  
        const response = await axios.post('/auth/login', {
          username,
          password,
          // Bir Haftalık ayarla
          expiresInMins: 10080
        });
        console.log("response", response);

        const { accessToken } = response.data as { accessToken: string; user: IUser; };

        const user = {
          email: response.data.email,
          firstName: response.data.firstName,
          gender: response.data.gender,
          id: response.data.id,
          image: response.data.image,
          lastName: response.data.lastName,
          username: response.data.username
        }

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          setSession(accessToken);

          dispatch({
            type: 'LOGIN',
            payload: { user }
          });
        } else {
          window.location.href = "/login"
        }
      } catch (error: any) {
        // Hata mesajını fırlatın
        throw new Error(error?.errorMessage || 'Login error');
      }
    }, []);

  // refresh (token geçerli ise user bilgilerini tazele)
  const refresh = useCallback(async () => {
    const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

    if (accessToken && isValidToken(accessToken)) {
      setSession(accessToken);
      const response = await axios.get('/auth/me');
      const user: IUser = response.data;

      localStorage.setItem('accessToken', accessToken);
      setSession(accessToken);

      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    }
  }, [storageAvailable]);


  // register
  const register = useCallback(
    async (name: string, lastname: string, username: string, password: string) => {
      const response = await axios.post('/user/create', {
        name,
        lastname,
        username,
        password,
      });

      const { accessToken, user } = response.data as { accessToken: string; user: IUser };

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        dispatch({
          type: 'REGISTER',
          payload: {
            user,
          },
        });
      } else {
        window.location.href = "/login";
      }
    }, []);


  // logout
  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  }, []);


  // 6) Context Value
  const memoizedValue: AuthContextValue = useMemo(() => ({
    isInitialized: state.isInitialized,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    method: 'jwt',
    login,
    register,
    logout,
    refresh,
  }), [state.isInitialized, state.isAuthenticated, state.user, login, register, logout, refresh]);

  // 7 Return
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}