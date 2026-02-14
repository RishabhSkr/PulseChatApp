import { Navigate, Outlet } from 'react-router-dom';
import { CommonLoader } from '../layout/loaders';

 const ProtectRoute = ({children, user, isLoading, redirect = "/login"}) => {
    if(isLoading) return <CommonLoader />;
    if(!user){
        return <Navigate to = {redirect} />
    }
  return children ? children : <Outlet />;
}

export default ProtectRoute;