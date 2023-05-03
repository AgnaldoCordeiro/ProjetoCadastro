import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts";


interface IAuthColaboradorProps {
  children: React.ReactNode;
}


export const ProtectedRouteColaborador: React.FC<IAuthColaboradorProps>  = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
