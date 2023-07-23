import { Navigate, Outlet } from "react-router-dom";

const Protectedroute =({
canActivate,
redirectPath = '/'

})=>{
  if(!canActivate){
return <Navigate to={redirectPath} replace/>
  }
  return <Outlet/>
}

export default Protectedroute;