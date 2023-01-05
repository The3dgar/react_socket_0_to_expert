import React, { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST');
    localStorage.setItem('token', resp.tkn);
    const { user } = resp;

    setAuth({
      uid: user.uid,
      checking: false,
      logged: true,
      name: user.name,
      email: user.email,
    });

    return resp.ok;
  };

  const register = async (name, email, password) => {
    const resp = await fetchSinToken(
      'auth/new',
      { name, email, password },
      'POST'
    );
    localStorage.setItem('token', resp.tkn);
    const { user } = resp;

    setAuth({
      uid: user.uid,
      checking: false,
      logged: true,
      name: user.name,
      email: user.email,
    });

    return true;
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    // Si token no existe
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await fetchConToken('auth/renew');
    if (Object.keys(resp).length) {
      localStorage.setItem('token', resp.tkn);
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');

    dispatch({
      type: types.SESSION_CLOSE,
    });

    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verificaToken,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
