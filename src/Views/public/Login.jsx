import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../static/logo.png';
import video from '../../../static/ciquimed-corto.mp4';
import { useAuth } from '../../../api/userContext';
import { toast ,ToastContainer} from 'react-toastify';
import Spinner from '../../Components/Spinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login , isAuthenticated ,token,cargando} = useAuth();

  const Navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response)
  
      if( token !==response.token) {
        Navigate('/');
      }
      const message ="Bienvenido "+ response.first_name + " " + response.message + " a Ciquimed";
      toast.success(message);
      setTimeout(() => {
        Navigate('/admin/usuarios/');
      },"1000")
    } catch (error) {
      toast.error("contraseña o usuario incorrecto", error);
    }
  };

  return (
    <>

      <main className='grid grid-cols-2 bg-gray-100 h-max items-center'>
        <div>
          <video className="w-full h-screen object-cover" autoPlay loop muted>
            <source src={video} type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
        <div className="flex justify-center ">
          <div>
            {cargando?  <Spinner/> :
              <>
                <img src={logo} alt="Logo" className="w-54 h-52 mx-auto mb-10" />
                <h1 className="text-purple-700 font-black w-full text-center mb-5">Inicio de sesión</h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-4" method='POST'>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="username" id="floating_email" value={username} onChange={e => setUsername(e.target.value)} className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingrese su correo</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="floating_password" value={password} onChange={e => setPassword(e.target.value)} className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingrese su contraseña</label>
                  </div>
                  <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg  w-full px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 ">Entrar</button>
                </form>
              </>
            }
     
          </div>
        </div>
      </main>
     
    </>
  );
};

export default Login;

