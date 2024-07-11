
import { AuthProvider } from '../api/userContext';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from './Views/public/Login'
import Usuarios from './Views/admin/users/Usuarios'
import RutaProtegida from './Layout/RutaProtegida'
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/admin/*" element={<RutaProtegida/>}>
              <Route index element={<Navigate to="usuarios" />} />
              <Route path="usuarios" element={<Usuarios/>} />
            </Route>
            <Route path="/" element={<Login/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
  
}

export default App