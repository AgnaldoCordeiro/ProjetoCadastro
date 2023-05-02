import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { TelaDeCadastro, TelaDeHome, TelaDeLoginCliente, TelaDeLoginColaborador } from "./pages";
import { AuthProvider, AuthProviderCliente, useAuthContext, useAuthContextCliente } from "./shared/contexts";


function App() {

  return (

    <Router>
       <Routes>
        <Route path="/" element={<TelaDeHome />} />
      </Routes>
    <AuthProviderCliente>
      <TelaDeLoginCliente>
        <Routes>
          <Route path="/cliente/cadastro" element={<TelaDeCadastro />} />
        </Routes>
      </TelaDeLoginCliente>
    </AuthProviderCliente>
    <AuthProvider>
      <TelaDeLoginColaborador>
    <Routes>
          <Route path="/dashboard" element={<h1>teste</h1>} />
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
