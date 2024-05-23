import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  function isLoggedIn() {
    // 토근이 있고 유효하면 로그인됨
    let token = localStorage.getItem("token");
    const decode = jwtDecode(token);

    let expires = decode.exp;
  }

  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }

  function hasEmail(param) {
    return email === param;
  }

  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setEmail(payload.sub);
    setNickName(payload.nickName);
  }

  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setEmail("");
    setNickName("");
  }

  return (
    <LoginContext.Provider
      value={{
        email: email,
        nickName: nickName,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        hasEmail: hasEmail,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
