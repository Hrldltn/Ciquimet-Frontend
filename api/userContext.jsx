import React, { createContext, useContext, useState } from 'react';
import { ConnectAxios , authAxios} from './useAxios';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cargando , setCargando] = useState(false);
  const [token, setToken] = useState("")

  const login = async (data) => {
    setCargando(true);
    try {
      const res = await ConnectAxios.post('login/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsAuthenticated(true);
      setToken(res.data.token);

      document.cookie = "token=" + token + ";path=/;HttpOnly";

      localStorage.setItem('Ciquimet session', res.data.token);
      localStorage.setItem('Nombre', res.data.first_name);
      localStorage.setItem('Authenticated', res.data.authenticated);

      setCargando(false);
      
      return res.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setCargando(false);
      throw error; 
    }
  };
  

  const register = async (data) => {
    setCargando(true);
    
    const res = await authAxios.post('register/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('Ciquimet session')
      }
    });
    setCargando(false);
    return res.data;
  }



  const usersList = async () =>{
    setCargando(true);
    const res = await authAxios.get('users/', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('Ciquimet session')
      },
    });
    setCargando(false);
    return res.data;
  };



  const logout = () => {
    // Lógica de cierre de sesión
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider 
        value=
        {{ isAuthenticated, login,token,
             logout ,cargando,register,usersList
        }}>
      {children}
    </AuthContext.Provider>
  );
};

