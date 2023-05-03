import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { TelaDeCadastro, TelaDeHome, TelaDeLoginCliente, TelaDeLoginColaborador } from "./pages";
import { AuthProvider, AuthProviderCliente, useAuthContext, useAuthContextCliente } from "./shared/contexts";
import { ProtectedRouteCliente } from "./shared/components/isAutenticate/ProtectedRouteCliente";
import { ProtectedRouteColaborador } from "./shared/components/isAutenticate/ProtectedRouteColaborador";






function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<TelaDeHome />} />
        <Route path="/cliente" element={<TelaDeLoginCliente />} />
        <Route path="/colaborador" element={<TelaDeLoginColaborador />} />
      </Routes>
      <AuthProviderCliente>
        <TelaDeLoginCliente>
          <Routes>
            <Route
              path="/cliente/cadastro"
              element={
                <ProtectedRouteCliente>
                  <TelaDeCadastro />
                </ProtectedRouteCliente>
              }
            />
          </Routes>
        </TelaDeLoginCliente>
      </AuthProviderCliente>
      <AuthProvider>
        <TelaDeLoginColaborador>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteColaborador>
                  <TelaDeCadastro />
                </ProtectedRouteColaborador>
              }
            />
          </Routes>

        </TelaDeLoginColaborador>
      </AuthProvider>


    </Router>


    /*   <Router>
        <Routes>
          <Route path="/" element={<TelaDeHome />} />
          <Route path="/login/cliente" element={<AuthProviderCliente>
            <TelaDeLoginCliente>
              <Route path="/cliente/*" element={<ProtectedClienteRoutes />} />
            </TelaDeLoginCliente>
          </AuthProviderCliente>} />
          <Route path="/login/colaborador" element={<AuthProvider>
            <TelaDeLoginColaborador>
              <Route path="/dashboard" element={<ProtectedColaboradorRoutes />} />
            </TelaDeLoginColaborador>
          </AuthProvider>} />
  
  
        </Routes>
      </Router> */
  );
}


export default App;
