import { createContext } from "react";
import { data } from "react-router-dom";

export const Authcontext = createContext();

export const AuthContextProviderFun = ({children})=>{
  const role = "admin"
  const isauthorized = true

  return(
    <Authcontext.Provider value = {{role,isauthorized}}>
        {children}
    </Authcontext.Provider>
) 
}