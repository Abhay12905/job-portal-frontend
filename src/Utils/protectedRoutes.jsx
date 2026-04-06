import { useContext } from "react"
import { Authcontext } from "../Authcontext/Authcontext"
import { Navigate } from "react-router-dom";

function protectedRoutes({children,allowedRole}) {
 
 const {role,isauthorized}= useContext(Authcontext);

 if(!role || isauthorized ===false){
    return <Navigate to="/login"/>
 }

 if(!allowedRole.includes(role)){
    return <Navigate to={"/unauthorized"}/>
 }
    
 return children ;

}

export default protectedRoutes
