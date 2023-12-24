import axios from "axios";
import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {useCookies} from "react-cookie";
interface AuthContextProps {

  setToken: (newToken: string) => void;
}
const AuthContext = createContext<AuthContextProps|string |null>(null);
const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const token=cookies.jwt;

    // State to hold the authentication token

    // Function to set the authentication token
    const setToken = (newToken: string) => {
        setCookie("jwt",newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["authorization"] = "Bearer " +cookies.jwt;
              setCookie("jwt",token);

        } else {
            delete axios.defaults.headers.common["authorization"];
            removeCookie("jwt");
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue = useMemo(() => ({
        token, setToken,
    }), [token]);

    // Provide the authentication context to the children components
    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};

export const useAuth = () => {
   const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthProvider;