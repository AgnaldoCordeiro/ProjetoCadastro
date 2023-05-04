import { BrowserRouter } from "react-router-dom";
import { AuthProvider,  DrawerProvider, } from "./shared/contexts";
import { Login } from "./shared/components/login/Login";
import { AppRoutes } from "./routes";






function App() {

  return (

    <AuthProvider>    
        <Login>

          <DrawerProvider>

            <BrowserRouter>             
                <AppRoutes />            
            </BrowserRouter>

          </DrawerProvider>

        </Login>     
    </AuthProvider>

   
  );
}


export default App;
