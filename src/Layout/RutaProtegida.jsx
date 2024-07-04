import React from 'react';
import { Navigate ,Outlet} from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { Fade } from "react-awesome-reveal";

const RutaProtegida = () => {
  const token = localStorage.getItem('Ciquimet session');
  const Nombre = localStorage.getItem('Nombre');
  const Authenticated = localStorage.getItem('Authenticated');

  if (!token || !Nombre || !Authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gradient-to-r  from-pink-200 via-cyan-200 to-pink-300 Monaco antialiased min-h-screen">
      <div className="md:flex flex-row justify-end md:min-h-screen min-w-screen">
        <Sidebar />
          <main className=" transition-opacity ease-in duration-700 opacity-100 flex-1 p-10">
            <Fade triggerOnce>
                <Outlet />
            </Fade>
          </main>
        
      </div>
    </div>
  );
};

export default RutaProtegida;
