import { createContext, useState } from 'react'

export const AuthContext = createContext(); //Step 1

//Step 2A
export function AuthContextProvider({children}) {

  const [authDetails, setAuthDetails] = useState({
    isLoggedIn: false,
    token: null,
  });

  const login = (token) => {
    setAuthDetails({
      isLoggedIn: true,
      token: token,
    });
  };

  const logout = () => {
    setAuthDetails({
      isLoggedIn: false,
      token: null,
    });
  };

  return(
    <AuthContext.Provider value={{authDetails, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}