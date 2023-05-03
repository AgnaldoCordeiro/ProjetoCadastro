import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContextCliente } from "../../contexts";

interface IAuthProps {
  children: React.ReactNode;
}


export const ProtectedRouteCliente: React.FC<IAuthProps>  = ({ children }) => {
  const { isAuthenticatedCliente } = useAuthContextCliente();
  const navigate = useNavigate()
  console.log(isAuthenticatedCliente)
  if (!isAuthenticatedCliente) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
